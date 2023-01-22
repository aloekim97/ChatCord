from flask_socketio import SocketIO, emit
from app.models import db, DmContent, Message, Server
import os
from datetime import datetime
from flask_login import current_user

# create your SocketIO instance
if os.environ.get("FLASK_ENV") == "production":
    origins = [
        "http://disclone-irt9.onrender.com/",
        "https://disclone-irt9.onrender.com/"
    ]
else:
    origins = "*"

# create your SocketIO instance
socketio = SocketIO(cors_allowed_origins=origins)


# handle chat messages
@socketio.on("chat")
def handle_chat(data):
    dm = DmContent(
        chat_id = data['chat_id'],
        sender_id = data['sender_id'],
        content = data['content'],
        created_at = datetime.now()
    )
    db.session.add(dm)
    db.session.commit()
    emit("chat", data, broadcast=True)

@socketio.on("delete")
def handle_delete(data):
    print(data)
    dm = DmContent.query.filter(DmContent.id == data['msg_id'])
    for o in dm:
        db.session.delete(o)
        db.session.commit()
    emit("delete", data, broadcast=True)

@socketio.on("channelMsg")
def handle_channel(data):
    dm = Message(
        user_id = current_user.id,
        channel_id = data['channel_id'],
        message = data['message'],
        created_at = datetime.now(),
        # id = Server.query.filter(Server.id == data['server'])
        # FROM servers, members_list 
        # WHERE ? = members_list.user_id AND servers.id = members_list.server_id
    )
    # ser = Server.query.filter(Server.id == data['server'])
    db.session.add(dm)
    # for o in ser:
    #     db.session.add(o)
    db.session.commit()
    print(dm)
    emit("channelMsg", data, broadcast=True)


@socketio.on("del")
def handle_del(data):
    print(data)
    dm = Message.query.filter(Message.id == data['messageId'])
    for o in dm:
        db.session.delete(o)
        db.session.commit()
    emit("del", data, broadcast=True)