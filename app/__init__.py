from dotenv import load_dotenv
from flask import Flask
from flask_mail import Mail
from flask_wtf.csrf import CSRFProtect

load_dotenv()

app = Flask(__name__)
app.config.from_object("config")
mail = Mail(app)
csrf = CSRFProtect(app)

app.app_context().push()

from app import views as views  # noqa: E402
