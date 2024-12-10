from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from auth.utils import Hash, EmailVerification
from auth.jwt_utils import JWTUtils
from motor.motor_asyncio import AsyncIOMotorDatabase
from user.utils import ConvertId
from fastapi import HTTPException, status
from auth.models import EmailModel
from auth.schemas import PasswordResetBase, PasswordResetConfirmBase, TokenDisplay
from mail import create_message, mail
from pymongo import ReturnDocument
from datetime import datetime
import os
from dotenv import load_dotenv
from fastapi.responses import JSONResponse
from tasks import send_email
from user.models import Roles


load_dotenv()
DOMAIN = os.getenv("DOMAIN")


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")
ACCESS_TOKEN_EXPIRES_MINUTES = 30


class AuthService:
    def __init__(self, database: AsyncIOMotorDatabase):
        self.collection = database.users

    async def get_token(self, credentials: OAuth2PasswordRequestForm):
        user = await self.collection.find_one({"username": credentials.username})
        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail={"detail": "Invalid credentials"},
            )
        if not Hash.verify(credentials.password, user.get("hashed_password", "")):
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail={"detail": "Incorrect password"},
            )

        access_token = JWTUtils.create_access_token(
            data={
                "sub": user["username"],
                "role": user["role"],
                "is_verified": user["is_email_verified"],
            }
        )
        await self.collection.update_one(
            {"username": credentials.username},
            {"$set": {"last_login": datetime.now(), "is_active": True}},
        )

        return {
            "access_token": access_token,
            "token_type": "bearer",
            "object_id": ConvertId.to_StringId(user["_id"]),
            "user_id": user["username"],
            "role": user["role"],
            "is_verified": user["is_email_verified"],
        }

    async def verify_user(self, token: str):
        token_data = EmailVerification.decode_url_safe_token(token)
        user_email = token_data.get("email")
        if not user_email:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail={
                    "detail": f"An error occurred! No email address '{user_email}' exists! Email Verification Failed"
                },
            )
        user = await self.collection.find_one_and_update(
            {"email": user_email},
            {
                "$set": {
                    "is_email_verified": True,
                }
            },
            return_document=ReturnDocument.AFTER,
        )
        return {
            "message": "Email Verification Successful ✅",
            "user_status": user,
        }

    async def reset_password_request(self, request: PasswordResetBase):
        email_address = request.email
        token = EmailVerification.create_url_safe_token({"email": email_address})

        link = f"http://{DOMAIN}/auth/password-reset-confirm/{token}"
        html_message = f""""
        <h1>Reset your Password</h1>
        <p>Please click this <a href="{link}">link</a> to reset your password</p>
        """

        recipients = [email_address]
        subject = "Reset your password"
        body = html_message

        send_email.delay(recipients, subject, body)
        return JSONResponse(
            status_code=status.HTTP_200_OK,
            content={
                "message": "Please check your mailbox for instructions to reset your password"
            },
        )

    async def reset_password(self, token: str, request: PasswordResetConfirmBase):
        new_password = request.new_password
        confirm_password = request.confirm_new_password
        if new_password != confirm_password:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail={"detail": "Passwords do not match"},
            )

        token_data = EmailVerification.decode_url_safe_token(token)
        user_email = token_data.get("email")
        if not user_email:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail={
                    "detail": f"An error occurred! No email address '{user_email}' exists! Aborting Password Reset..."
                },
            )
        user = await self.collection.find_one_and_update(
            {"email": user_email},
            {
                "$set": {
                    "hashed_password": Hash.bcrypt(new_password),
                }
            },
            return_document=ReturnDocument.AFTER,
        )
        return {
            "message": "Password Reset Successful ✅",
            "user_status": user,
        }


class AuthMailService:
    def __init__(self):
        pass

    @staticmethod
    async def send_mail(request: EmailModel):
        emails = request.addresses
        subject = "Welcome to Sanare"
        html = "<h1>Welcome to Sanare</h1>"

        message = create_message(
            recipients=emails,
            subject=subject,
            body=html,
        )

        send_email.delay(emails, subject, html)
        return {
            "message": "Email sent successfully",
        }
