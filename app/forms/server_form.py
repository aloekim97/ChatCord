from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired


class ServerForm(FlaskForm):
    name = StringField("Name", validators=[DataRequired()])
    server_img = StringField("Image", validators=[DataRequired()])
    submit = SubmitField("Create Server")
