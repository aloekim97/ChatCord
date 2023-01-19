from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from ..models import db, Message
from ..forms import MessageForm
from .auth_routes import validation_errors_to_error_messages
from datetime import datetime

chmsg = Blueprint('chmsg', __name__)

#get ch msg
@chmsg.route('/<int:channel_id>/msg')
@login_required
def get_ch_msg(channel_id):
    get_messages = Message.query.filter(Message.channel_id == channel_id).order_by(Message.created_at).all()
    message = [message.to_dict() for message in get_messages]
    return {"messages": message}


#send ch msg
@chmsg.route('/<int:channel_id>/msg', methods=['POST'])
@login_required
def send_chmsg(channel_id):
    form = MessageForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        message = Message(
            user_id = current_user.id,
            channel_id = channel_id,
            message = form.data['content'],
            created_at = datetime.now()
        )
    db.session.add(message)
    db.session.commit()

    return{"message": message.to_dict()}
    
    # else:
    #     return {'errors': validation_errors_to_error_messages(form.errors)}, 400

#edit ch msg
@chmsg.route('/<int:channel_id>/msg/<int:message_id>', methods=["PUT"])
@login_required
def edit_msg(channel_id, message_id):
    form = MessageForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        message = Message.query.filter(Message.channel_id == channel_id, Message.id == message_id).first()

        if current_user.id == message.user.id:
            message.message = form.data['content']
        db.session.commit()
        return {"message": message.to_dict()}
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400


@chmsg.route('/<int:channel_id>/msg/<int:message_id>', methods=["DELETE"])
@login_required
def del_msg(channel_id, message_id):
    message = Message.query.filter(Message.channel_id == channel_id, Message.id == message_id).first()

    if current_user.id == message.user.id:
        db.session.delete(message)
        db.session.commit()
    
    return {"message": "Message was deleted"}

