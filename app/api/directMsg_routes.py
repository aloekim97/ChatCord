from flask import Blueprint, request 
from flask_login import login_required, current_user
from ..models import db, DirectMessage, User, DmContent
from ..forms import MessageForm, DmForm
from datetime import datetime
from .auth_routes import validation_errors_to_error_messages
from sqlalchemy import or_



dm_routes = Blueprint("dm", __name__)


# all messages
@dm_routes.route("/")
@login_required
def index():
    chats = [chat.to_dict() for chat in DirectMessage.query.filter(or_(current_user.id == DirectMessage.receiver_id, current_user.id == DirectMessage.sender_id)).all()]
    # chats = DirectMessage.query.all()

    return {"chats": chats}

# specific dm
@dm_routes.route('/<int:chat_id>')
@login_required
def get_one_chat(chat_id):
    chat = DirectMessage.query.get(chat_id)
    return {"chat_id": chat.to_dict()}


#see all message in dm chat
@dm_routes.route('/<int:chat_id>/msg')
@login_required
def get_dm_content(chat_id):
    content = DmContent.query.filter(DmContent.chat_id == chat_id).order_by(DmContent.created_at).all()
    msgs = [msg.to_dict() for msg in content]
    return {"messages": msgs}
    

#send dm
@dm_routes.route('/<int:chat_id>', methods=['POST'])
@login_required
def send_dm(chat_id):
    form = MessageForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        data = DmContent(
            chat_id = chat_id,
            sender_id = current_user.id,
            content = form.data['content'],
            created_at = datetime.now()
        )
        db.session.add(data)
        db.session.commit()
        return {"data": data.to_dict()}

    else: 
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400

#edit dm
@dm_routes.route('/<int:chat_id>/msg/<int:msg_id>', methods=["PUT"])
@login_required
def edit_dm(chat_id, msg_id):
    message = DmContent.query.filter(DmContent.id == msg_id, DmContent.chat_id == chat_id).first()

    form = MessageForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        message.content = form.data['content']
        
        
        db.session.commit()
        return {'data': message.to_dict()}

    else: 
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400

#delete dm
@dm_routes.route('/<int:chat_id>/msg/<int:msg_id>', methods=["DELETE"])
@login_required
def delete_dm(chat_id, msg_id):
    message = DmContent.query.filter(DmContent.id == msg_id, DmContent.chat_id == chat_id).first()

    # if form.validate_on_submit():
    db.session.delete(message)
    db.session.commit()
        
        
    return {'message': 'Message was deleted'}

#new dm
@dm_routes.route('/', methods=["POST"])
@login_required
def start_dm():
    form = DmForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    
    if form.validate_on_submit():
        newChat = DirectMessage(
            sender_id = current_user.id,
            receiver_id = form.data['receiver_id']
        )
        db.session.add(newChat)
        db.session.commit()
        return {"newChat": newChat.to_dict()}
    else: 
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400
       


