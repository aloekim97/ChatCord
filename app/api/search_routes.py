from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from ..models import db, Server, Channel, Message, DirectMessage
from ..forms import SearchForm
from .auth_routes import validation_errors_to_error_messages
from sqlalchemy import or_

search_routes = Blueprint('search', __name__)


@search_routes.route("messages/<int:channelId>", methods=["POST"])
# @login_required
def search_channel(channelId):
    form = SearchForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    print(form.data['search'])
    print(form.data)
    if form.validate_on_submit():
        search = form.data['search']
        channel_messages = Message.query.filter(Message.message.ilike(f"%{search}%")).filter(Message.channel_id == channelId).all()
        print('theses are the messages', channel_messages)
        # return 'hi'
        return jsonify([message.to_dict() for message in channel_messages])
    return 'bad data', 400

@search_routes.route("dms/<int:channelId>", methods=["POST", "GET"])
# @login_required
def search_dm():
    form = SearchForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        search = form.data['search']
        direct_messages = DirectMessage.query.filter(or_(current_user.id == DirectMessage.receiver_id, current_user.id == DirectMessage.sender_id)).filter(Message.message.ilike(f"%{search}%")).all()
        print('theses are the messages', direct_messages)
        # return 'hi'
        return jsonify([message.to_dict() for message in direct_messages])
    return 'bad data'
