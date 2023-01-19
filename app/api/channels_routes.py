from flask import Blueprint, jsonify, session, request
from app.models import User, db, Channel, Server
from flask_login import login_required
from app.forms import ChannelForm
from .auth_routes import validation_errors_to_error_messages

channel_routes = Blueprint('channel', __name__)

@channel_routes.route('/')
@login_required
def get_all_channels():
    channels = Channel.query.all()
    mw = [chan.to_dict() for chan in channels]
    # print('this is the server',ch.server)
    return {"channels": [chan.to_dict() for chan in channels]}, 200

@channel_routes.route('/<int:id>')
@login_required
def get_single_channel(id):
    channel = Channel.query.get(id)
    return channel.to_dict() , 200

@channel_routes.route('/<int:channelId>', methods=["PUT"])
@login_required
def edit_channel(channelId):
    channel = Channel.query.get(channelId)
    print('this is the chan', channel)
    form=ChannelForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        channel.name=form.data['name']

        db.session.commit()
        return channel.to_dict() , 201
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400



@channel_routes.route('/<int:id>', methods=["DELETE"])
@login_required
def delete_channel(id):
    channel = Channel.query.get(id)
    if channel:
        db.session.delete(channel)
        db.session.commit()
        return { "message": "Deleted"}, 200
    else:
        return {"message":'Channel couldn\'t be found'} , 404
