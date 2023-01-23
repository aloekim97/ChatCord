from app.models import db, Message, User, environment, SCHEMA, Channel
from datetime import datetime
from random import choice
from .sample_messages import gaming

# Adds a demo user, you can add other users here if you want
def seed_messages():
    demo_messages = [
        Message(
            user_id=1,
            channel_id=1,
            message="hey is anyone able to look at my code? I just can't get it to run",
            created_at=datetime.now(),
            ),
        Message(
            user_id=2,
            channel_id=2,
            message="yoo who wants to rank flex right now?",
            created_at=datetime.now(),
            ),
        Message(
            user_id=3,
            channel_id=3,
            message="hey did anyone watch the new Avatar movie? Is it worth watching?",
            created_at=datetime.now(),
            ),
        Message(
            user_id=4,
            channel_id=4,
            message="Anyone free this weekend to hike around Crystal Springs?",
            created_at=datetime.now(),
            ),
        Message(
            user_id=5,
            channel_id=5,
            message="omg supes are crazy! I can't wait for the next season.",
            created_at=datetime.now(),
            ),
        Message(
            user_id=6,
            channel_id=6,
            message="What's the best switches for a deeper low pitched sound signature?",
            created_at=datetime.now(),
            ),
        Message(
            user_id=7,
            channel_id=7,
            message="I have a test tmr at 8 AM wish me luck.",
            created_at=datetime.now(),
            ),
    ]

    users = [user.id for user in User.query.all()]
    channels = [channel.id for channel in Channel.query.all()]


    for i in range(0,101):
        message = Message(
            user_id=choice(users),
            channel_id=choice(channels),
            message=choice(gaming),
            created_at=datetime.now(),
        )
        demo_messages.append(message)

    for message in demo_messages:
        db.session.add(message)
    db.session.commit()

# Uses a raw SQL query to TRUNCATE or DELETE the messages table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.


def undo_messages():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.messages RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM messages")

    db.session.commit()
