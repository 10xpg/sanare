from celery import Celery
from asgiref.sync import async_to_sync
from mail import create_message, mail
from config import broker_url

app = Celery("tasks", broker=broker_url)

app.config_from_object("config")


@app.task
def send_email(recipients: list[str], subject: str, body: str):
    message = create_message(
        recipients=recipients,
        subject=subject,
        body=body,
    )
    async_to_sync(mail.send_message)(message)
