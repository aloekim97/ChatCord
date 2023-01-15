from app.models import db, Server, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_servers():
    demo_servers = [
        Server(
            name='App Academy', owner_id=1, server_img="https://assets-global.website-files.com/5dcc7f8c449e597ed83356b8/603820afd31232aab368ea6f_New%20Red-logo-emblem.webp"
            ),
        Server(
            name='Gamer Zone', owner_id=2, server_img="https://www.clipartmax.com/png/middle/64-648900_icon-of-a-video-game-controller-game-circle-icon.png"
            ),
        Server(
            name='Anime x World', owner_id=3, server_img="https://e1.pngegg.com/pngimages/435/457/png-clipart-noragami-023-circle-icon-noragami-023-anime-character-wearing-black-jacket.png"
            ),
        Server(
            name='Happy Travellers', owner_id=4, server_img="https://png.pngtree.com/png-vector/20200921/ourlarge/pngtree-illustration-of-mountains-and-clouds-in-a-circle-png-image_2347849.jpg"
            ),
        Server(
            name='The Boys', owner_id=5, server_img="https://ih1.redbubble.net/image.1648673953.7861/ur,pin_large_front,square,600x600.jpg"
            ),
        Server(
            name='Keycult', owner_id=6, server_img="https://pbs.twimg.com/profile_images/1087389281872576518/9GfUjYzu_400x400.jpg"
            ),
        Server(
            name='Lofi Beats', owner_id=7, server_img="https://i1.sndcdn.com/avatars-IWAQUb2WuP9Z5hAv-03A2tA-t500x500.jpg"
            ),
    ]

    for server in demo_servers:
        db.session.add(server)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE or DELETE the servers table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.


def undo_servers():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.servers RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM servers")

    db.session.commit()
