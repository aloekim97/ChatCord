from app.models import db, DirectMessage, environment, SCHEMA, add_prefix_for_prod

def seed_dms():
    demo_chat=[
        DirectMessage(
            sender_Id=1,
            reciever_Id=2
        ),
        DirectMessage(
            sender_Id=2,
            reciever_Id=3
        ),
        DirectMessage(
            sender_Id=4,
            reciever_Id=5
        ),
        DirectMessage(
            sender_Id=5,
            reciever_Id=6
        ),
        DirectMessage(
            sender_Id=7,
            reciever_Id=8
        )
    ]
    for chat in demo_chat:
        db.session.add(chat)
    db.session.commit()

def undo_messages():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.dm RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM dm")

    db.session.commit()