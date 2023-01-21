from flask_socketio import SocketIO, emit
from app.models import db, DmContent, Message
import os
from datetime import datetime

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
    dm = DmContent.query.filter(DmContent.id == data['msg_id'], ).all()
    for o in dm:
        db.session.delete(o)
    db.session.commit()
    emit("delete", data, broadcast=True)
