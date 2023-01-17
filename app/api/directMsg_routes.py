from flask import Blueprint 
from flask_login import login_required, current_user
from ..models import db, DirectMessage, User



dm_routes = Blueprint("dm", __name__)


# all messages
@dm_routes.route("/")
    # @login_required
def index():
    user = User.query.get(1)
    chats = [chat.to_dict() for chat in DirectMessage.query.filter(user.id == 1)]
    print(chats)
    # return {"chats": chats}

# specific dm
# @dm_routes('/<')