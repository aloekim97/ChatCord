from flask_wtf import FlaskForm
from wtforms import IntegerField
from wtforms.validators import DataRequired


class DmForm(FlaskForm):
    sender_id = IntegerField('sender_id', validators=[DataRequired()])
    receiver_id = IntegerField('receiver_id', validators=[DataRequired()])