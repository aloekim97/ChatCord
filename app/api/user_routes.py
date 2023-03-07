from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from ..models import db, Server, Channel
from app.models import User
from ..forms import UpdateForm
from .auth_routes import validation_errors_to_error_messages

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()

@user_routes.route('/servers/current')
# @login_required
def get_user_channels(userId):
    user = User.query.get(current_user.id)
    print('this is the user', user.servers)
    servers = user.servers
    return {"Servers": [server.to_dict() for server in servers]}

@user_routes.route('/<int:id>', methods=["PUT"])
def update_user(id):
    user = User.query.get(id)
    form = UpdateForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        user.email = form.data['email']
        user.username = form.data['username']
        user.profile_img = form.data['profile_img']
        db.session.commit()
        return user.to_dict()
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400
