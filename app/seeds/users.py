from app.models import db, User, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password')
    marnie = User(
        username='marnie', email='marnie@aa.io', password='password')
    bobbie = User(
        username='bobbie', email='bobbie@aa.io', password='password')
    Martin = User(
        username='Martin', email='Martin@aa.io', password='password')
    Remi = User(
        username='Remi', email='Remi@aa.io', password='password')
    Alex = User(
        username='Alex', email='Alex@aa.io', password='password')
    Brad = User(
        username='Brad', email='Brad@aa.io', password='password')
    Levi = User(
        username='Levi', email='Levi@aa.io', password='password')
    Sasuke = User(
        username='Sasuke', email='Sasuke@aa.io', password='password')
    Naruto = User(
        username='Naruto', email='Naruto@aa.io', password='password')
    Goku = User(
        username='Goku', email='Goku@aa.io', password='password')


    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(Martin)
    db.session.add(Remi)
    db.session.add(Alex)
    db.session.add(Brad)
    db.session.add(Levi)
    db.session.add(Sasuke)
    db.session.add(Naruto)
    db.session.add(Goku)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM users")

    db.session.commit()
