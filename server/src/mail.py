from fastapi_mail import FastMail, MessageSchema, MessageType
from config import mail_config


mail = FastMail(config=mail_config)


def create_message(
    recipients: list[str],
    subject: str,
    body: str,
):
    message = MessageSchema(
        recipients=recipients,
        subject=subject,
        body=body,
        subtype=MessageType.html,
    )
    return message
