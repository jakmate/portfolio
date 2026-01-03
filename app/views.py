from flask import render_template, request, jsonify
from flask_mail import Message
from .form import Form
from app import app, mail
import threading


@app.route("/", methods=["GET", "POST"])
def home():
    form = Form()
    return render_template("home.html", title="Jakub Orzolek", form=form)


@app.route("/sendMessage", methods=["POST"])
def send_message():
    form = Form(request.form)
    if form.validate():
        email = form.email.data
        name = form.name.data
        message = form.message.data
        try:
            msg = Message(
                subject=f"Message from {name} {email}",
                body=message,
                sender=app.config["MAIL_USERNAME"],
                recipients=[app.config["MAIL_USERNAME"]],
            )
            thr = threading.Thread(target=send_async_email, args=[app, msg])
            thr.start()
            return jsonify({"message": "Sent"}), 200
        except Exception as e:
            return jsonify({"message": str(e)}), 500
    return jsonify({"message": "Failed to send"}), 400


def send_async_email(app, msg):
    with app.app_context():
        try:
            mail.send(msg)
        except Exception as e:
            app.logger.error(f"Email sending failed: {str(e)}")
