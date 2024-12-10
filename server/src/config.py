from dotenv import load_dotenv
import os
from fastapi_mail import ConnectionConfig
from pathlib import Path


load_dotenv()
mongodb_uri = os.getenv("DB_CONNECTION_STRING")
broker_url = os.getenv("REDIS_URL")
result_backend = os.getenv("REDIS_URL")
broker_connection_retry_on_startup = True


BASE_DIR = Path(__file__).resolve().parent


mail_config = ConnectionConfig(
    MAIL_USERNAME=os.getenv("MAIL_USERNAME"),
    MAIL_PASSWORD=os.getenv("MAIL_PASSWORD"),
    MAIL_FROM=os.getenv("MAIL_FROM"),
    MAIL_PORT=os.getenv("MAIL_PORT"),
    MAIL_SERVER=os.getenv("MAIL_SERVER"),
    MAIL_FROM_NAME=os.getenv("MAIL_FROM_NAME"),
    MAIL_STARTTLS=False,
    MAIL_SSL_TLS=True,
    USE_CREDENTIALS=True,
    VALIDATE_CERTS=True,
    TEMPLATE_FOLDER=Path(BASE_DIR, "templates"),
)
