from .db import db, environment, SCHEMA, add_prefix_for_prod

class DmContent(db.Model):
    __tablename__ = 'dm_contents'

    id = db.Column(db.Integer, primary_key = True)
    chat_id = db.Column(db.Integer, db.ForeignKey('direct_message.id'), nullable=False)
    sender_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    content = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False)

    userSender = db.relationship("User")
    direct_m = db.relationship("DirectMessage", back_populates='message')

    def to_dict(self):
        return {
            'id': self.id,
            'chat_id': self.chat_id,
            'sender_id': self.sender_id,
            'content': self.content,
            'created_at': self.created_at,
        }