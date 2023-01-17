from app.models import db, DirectMessage, environment, SCHEMA

def seed_dms():
    demo_chat=[
        DirectMessage(
            sender_id=1,
            reciever_id=2
        ),
        DirectMessage(
            sender_id=2,
            reciever_id=3
        ),
        DirectMessage(
            sender_id=4,
            reciever_id=5
        ),
        DirectMessage(
            sender_id=5,
            reciever_id=6
        ),
        DirectMessage(
            sender_id=7,
            reciever_id=8
        )
    ]
    for chat in demo_chat:
        db.session.add(chat)
    db.session.commit()

def undo_dms():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.direct_message RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM direct_message")

    db.session.commit()