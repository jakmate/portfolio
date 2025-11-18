from flask import Flask
from flask_mail import Mail
from flask_wtf.csrf import CSRFProtect
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
app.config.from_object("config")
mail = Mail(app)
csrf = CSRFProtect(app)

app.app_context().push()

from app import views  # noqa: F401 E402
