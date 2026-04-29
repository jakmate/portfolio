import threading
from typing import Literal

from flask import Flask, Response, jsonify, render_template, request
from flask_mail import Message

from app import app, mail

from .form import Form


@app.route("/", methods=["GET", "POST"])
def home() -> str:
    form = Form()
    return render_template("home.html", title="Jakub Orzolek", form=form)


@app.route("/sendMessage", methods=["POST"])
def send_message() -> (
    tuple[Response, Literal[200]]
    | tuple[Response, Literal[500]]
    | tuple[Response, Literal[400]]
):
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
        except KeyError:
            app.logger.exception("Missing mail configuration")
            return jsonify({"message": "Server misconfiguration"}), 500

        except (TypeError, ValueError):
            app.logger.exception("Invalid email data")
            return jsonify({"message": "Invalid email data"}), 400

        except RuntimeError:
            app.logger.exception("Threading error")
            return jsonify({"message": "Internal server error"}), 500
    return jsonify({"message": "Failed to send"}), 400


def send_async_email(app: Flask, msg: Message) -> None:
    with app.app_context():
        try:
            mail.send(msg)
        except Exception:
            app.logger.exception("Email sending failed")
