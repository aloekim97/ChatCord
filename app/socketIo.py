from flask_socketio import SocketIO, emit
import os
from app.models import db, DmContent

# create your SocketIO instance
if os.environ.get("FLASK_ENV") == "production":
    origins = [
        "https://disclone-irt9.onrender.com/",
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
        created_at = date
    )
    db.session.add(dm)
    db.session.commit()
    emit("chat", data, broadcast=True)