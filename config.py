import os

MAIL_SERVER = os.getenv("MAIL_SERVER")
MAIL_PORT = int(os.getenv("MAIL_PORT", 465))
MAIL_USERNAME = os.getenv("MAIL_USERNAME")
MAIL_PASSWORD = os.getenv("MAIL_PASSWORD")
MAIL_USE_TLS = os.getenv("MAIL_USE_TLS", "False") == "True"
MAIL_USE_SSL = os.getenv("MAIL_USE_SSL", "True") == "True"
WTF_CSRF_ENABLED = os.getenv("WTF_CSRF_ENABLED", "True") == "True"
SECRET_KEY = os.getenv("SECRET_KEY", "default_secret_key")
