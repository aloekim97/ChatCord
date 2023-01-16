from .db import db, environment, SCHEMA, add_prefix_for_prod


member_list = db.Table(
    "members_list",
    db.Column("user_id", db.Integer, db.ForeignKey("users.id"), primary_key=True),
    db.Column("server_id", db.Integer, db.ForeignKey("servers.id"), primary_key=True),
)

class Server(db.Model):
    __tablename__ = 'servers'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(25), nullable=False)
    owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    server_img = db.Column(db.String(2000), nullable=False)

    owner = db.relationship("User", back_populates="server")
    channel = db.relationship("Channel", back_populates="server")
    members = db.relationship("User", secondary=member_list, back_populates="servers")

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'owner': self.owner,
            'serverImg': self.server_img,
            'channels': [channel.to_dict() for channel in self.channel]
        }
