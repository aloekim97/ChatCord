from flask import Blueprint 
from flask_login import login_required, current_user
from app.models import db, DirectMessage


dm_routes = Blueprint('dm', __name__, url_prefix='/@me')


# all messages
@dm_routes('')
@login_required
def index():
    chats = [chat.to_dict() for chat in DirectMessage.query.filter(current_user.id == DirectMessage.sender_id)]
    return 

# specific dm
@dm_routes('/<')