from flask import Blueprint, jsonify, session, request
from app.models import User, db, Channel, Server
from flask_login import login_required
from app.forms import ChannelForm

channel_routes = Blueprint('channel', __name__)

@channel_routes.route('/')
@login_required
def get_all_channels():
    channels = Channel.query.all()
    mw = [chan.to_dict() for chan in channels]
    # print('this is the server',ch.server)
    return jsonify(mw)

@channel_routes.route('/<int:id>')
# @login_required
def get_single_channel(id):
    channel = Channel.query.get(id)
    return channel.to_dict()


@channel_routes.route('/<int:id>/help', methods=["GET","POST"])
def create_channel(id):
    form = ChannelForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        serv = Server().query.get(id)
        channel = Channel(
            name=form.data['name'],
            server=serv
        )
        print('this is channel',channel.server)
        # print('this is server', serv)
        db.session.add(channel)
        db.session.commit()
        return channel.to_dict()
    print('not in if')
    return 'hi2'


@channel_routes.route('/help/<int:channelId>', methods=["PUT"])
def edit_channel(channelId):
    channel = Channel.query.get(channelId)
    print('this is the chan', channel)
    form=ChannelForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        channel.name=form.data['name']

        db.session.commit()
        return channel.to_dict()
    return 'bad data'


@channel_routes.route('/help/<int:id>', methods=["DELETE"])
def delete_channel(id):
    channel = Channel.query.get(id)
    if channel:
        db.session.delete(channel)
        db.session.commit()
        return {
            "message": "Deleted"
        }
    else:
        return 'no channel'
