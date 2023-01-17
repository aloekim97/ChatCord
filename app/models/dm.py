from .db import db, environment, SCHEMA, add_prefix_for_prod


class DirectMessage(db.Model):
    __tablename__ = 'direct_message'
    __table_args__ = (db.UniqueConstraint('sender_id', 'reciever_id'),)

    id = db.Column(db.Integer, primary_key=True)
    sender_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    reciever_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    sendUser = db.relationship("User", back_populates='dmSender', foreign_keys=[sender_id])
    recieveUser = db.relationship("User", back_populates='dmReciever', foreign_keys=[reciever_id])

    def to_dict(self):
        return {
            'id': self.id,
            'sender_id': self.sender_id,
            'reciever_id': self.reciever_id
        }