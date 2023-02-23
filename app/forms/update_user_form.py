from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from werkzeug.security import generate_password_hash, check_password_hash
from app.models import User
from flask_login import login_required, current_user

def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user and not email == current_user.email:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user and not username == current_user.username:
        raise ValidationError('Username is already in use.')
def check_password(form, field):
    password = field.data
    if not current_user.check_password(password):
        raise ValidationError('The password input was incorrect')

class UpdateForm(FlaskForm):
    username = StringField('username', validators=[DataRequired(), username_exists])
    email = StringField('email', validators=[DataRequired(), user_exists])
    password = StringField('password', validators=[DataRequired(), check_password])
