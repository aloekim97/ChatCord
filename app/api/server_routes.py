from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from ..models import db, Server, Channel
from ..forms import ServerForm, ChannelForm
from .auth_routes import validation_errors_to_error_messages


server_routes = Blueprint("servers", __name__)


# get all servers
@server_routes.route("")
@login_required
def all_servers():
    servers = Server.query.all()
    return {"servers": [server.to_dict() for server in servers]}, 200


# add new server
@server_routes.route('/new', methods=["POST"])
@login_required
def new_server():
    form = ServerForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        server = Server(
            owner_id = current_user.id,
            name = form.data['name'],
            server_img = form.data['server_img']
        )

        db.session.add(server)
        db.session.commit()

        return {"server": server.to_dict()}, 201

    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400


# Get / Edit / Delete server
@server_routes.route("/<int:id>", methods=["GET", "PUT", "DELETE"])
@login_required
def server_action(id):
    server = Server.query.get(id)

    if server:

        if request.method == "GET":
            server_dict = server.to_dict()
            server_dict['channel'] = [channel.to_dict() for channel in server.channel]
            server_dict['members'] = [member.to_dict() for member in server.members]
            server_dict['owner'] = server.owner.to_dict()
            return server_dict

        if request.method == "PUT":
            form = ServerForm()
            form['csrf_token'].data = request.cookies['csrf_token']
            if form.validate_on_submit():
                server.name = form.data['name']
                server.server_img = form.data['server_img']

                db.session.commit()
                return {"server": server.to_dict()}, 200
            else:
                return {'errors': validation_errors_to_error_messages(form.errors)}, 400

        if request.method == "DELETE":
            db.session.delete(server)
            db.session.commit()

            return jsonify({
                'message': "Server successfully deleted",
                'status_code': 200
            }), 200


    else:
        return {"errors": "Server not found"}, 404


@server_routes.route('/<int:id>', methods=["POST"])
def create_channel(id):
    form = ChannelForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        serv = Server().query.get(id)
        channel = Channel(
            name=form.data['name'],
            server=serv
        )
        print('this is channel',channel.server)
        # print('this is server', serv)
        db.session.add(channel)
        db.session.commit()
        return channel.to_dict() , 201
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400
