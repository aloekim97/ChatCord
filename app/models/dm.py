from .db import db, environment, SCHEMA, add_prefix_for_prod


class DirectMessage(db.Model):
    __tablename__ = 'direct_message'
    __table_args__ = (db.UniqueConstraint('sender_id', 'receiver_id'),)

    id = db.Column(db.Integer, primary_key=True)
    sender_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    receiver_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    sendUser = db.relationship("User", back_populates='dmSender', foreign_keys=[sender_id])
    receiveUser = db.relationship("User", back_populates='dmReceiver', foreign_keys=[receiver_id])
    message = db.relationship('DmContent', cascade='all, delete')

    def to_dict(self):
        return {
            'id': self.id,
            'sender_id': self.sender_id,
            'receiver_id': self.receiver_id
        }