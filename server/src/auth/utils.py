from passlib.context import CryptContext
from itsdangerous import URLSafeTimedSerializer
import os
from dotenv import load_dotenv
import logging

load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY")
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
serializer = URLSafeTimedSerializer(secret_key=SECRET_KEY, salt="email-verification")


class Hash:
    def bcrypt(plain_password: str):
        return pwd_context.hash(plain_password)

    def verify(plain_password: str, hash_password: str):
        return pwd_context.verify(plain_password, hash_password)


class EmailVerification:
    @staticmethod
    def create_url_safe_token(data: dict):
        token = serializer.dumps(data)
        return token

    @staticmethod
    def decode_url_safe_token(token: str):
        try:
            token_data = serializer.loads(token)
            return token_data
        except Exception as e:
            logging.error(f"Failed to decode token: {e}")
