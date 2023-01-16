from flask import Blueprint, jsonify, session, request
from app.models import User, db, Channel


channel_routes = Blueprint('channel', __name__)

@channel_routes.route('/')
def get_all_channels():
    channels = Channel.query.all()
    mw = [chan.to_dict() for chan in channels]
    # print('this is the server',ch.server)
    return jsonify(mw)

@channel_routes.route('/<int:id>')
def get_single_channel(id):
    pass

@channel_routes.route('/<int:userId>')
def get_user_channels(user_id):
    pass

@channel_routes.route('/', methods=["POST"])
def create_channel():
    pass

@channel_routes.route('/<int:id>', methods=["PUT"])
def edit_channel(id):
    pass

@channel_routes.route('/<int:id>', methods=["DELETE"])
def delete_channel(id):
    pass
