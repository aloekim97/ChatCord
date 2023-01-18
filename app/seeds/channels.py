from app.models import db, Channel, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_channels():
    demo_channels = [
        Channel(
            name='Coding-Debug', server_id=1),
        Channel(
            name='Gamer-Lounge', server_id=2),
        Channel(
            name='Must-Watch', server_id=3),
        Channel(
            name='Best-Hike-Trails', server_id=4),
        Channel(
            name='Discussion', server_id=5),
        Channel(
            name='build-support', server_id=6),
        Channel(
            name='Chill-Zone', server_id=7),
    ]

    for channel in demo_channels:
        db.session.add(channel)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE or DELETE the channels table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.


def undo_channels():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.channels RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM channels")

    db.session.commit()
