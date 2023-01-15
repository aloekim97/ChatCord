from .db import db, environment, SCHEMA, add_prefix_for_prod


class Message(db.Model):
    __tablename__ = 'messages'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    channel_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("channels.id")), nullable=False)
    message = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False)

    user = db.relationship("User", back_populates="message")
    channel = db.relationship("Channel", back_populates="message")

    def to_dict(self):
        return {
            'id': self.id,
            'user': self.user,
            'channel': self.channel,
            'message': self.message,
            'createdAt': self.created_at
        }
