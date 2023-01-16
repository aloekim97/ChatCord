from dotenv import load_dotenv
load_dotenv()
from app import app
from app.models import db
from app.seeds.users import User
from app.seeds.servers import Server
from random import choice

with app.app_context():

    server_g1 = []
    for id in range(1,5):
        server = Server.query.get(id)
        server_g1.append(server)
    print("servers --------------------", server_g1)

    server_g2 = []
    for id in range(5,9):
        server = Server.query.get(id)
        server_g2.append(server)
    print("servers --------------------", server_g2)

    users = []
    for id in range(1,12):
        user = User.query.get(id)
        users.append(user)
    print("users --------------------", users)

    for user in users:
        server1 = choice(server_g1)
        server2 = choice(server_g2)
        user.servers.append(server1)
        user.servers.append(server2)
        db.session.add(user)
        print("user -----------------> server", user.servers)

    db.session.commit()
