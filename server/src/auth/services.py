from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from auth.utils import Hash, EmailVerification
from auth.jwt_utils import JWTUtils
from motor.motor_asyncio import AsyncIOMotorDatabase
from user.utils import ConvertId
from fastapi import HTTPException, status
from auth.models import EmailModel
from mail import create_message, mail
from auth.models import EmailModel
from pymongo import ReturnDocument


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

        access_token = JWTUtils.create_access_token(data={"sub": user["username"]})
        return {
            "access_token": access_token,
            "token_type": "bearer",
            "object_id": ConvertId.to_StringId(user["_id"]),
            "user_id": user["username"],
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


class AuthMailService:
    def __init__(self):
        pass

    async def send_mail(request: EmailModel):
        emails = request.addresses
        html = "<h1>Welcome to Sanare</h1>"
        message = create_message(
            recipients=emails,
            subject="Welcome",
            body=html,
        )

        await mail.send_message(message)
        return {
            "detail": "Email sent successfully",
        }
