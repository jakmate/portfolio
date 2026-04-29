from flask_wtf import FlaskForm
from wtforms import EmailField, StringField
from wtforms.validators import Email, InputRequired


class Form(FlaskForm):
    email = EmailField("Email", validators=[InputRequired(), Email()])
    name = StringField("Name", validators=[InputRequired()])
    message = StringField("Message", validators=[InputRequired()])
