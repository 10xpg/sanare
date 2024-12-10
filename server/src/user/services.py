from motor.motor_asyncio import AsyncIOMotorDatabase
from user.schemas import UserBase, UserUpdate
from user.models import DbUser
from fastapi import HTTPException, status
from auth.utils import Hash
from user.utils import ConvertId
from pymongo import ReturnDocument
from dotenv import load_dotenv
import os
from auth.utils import EmailVerification
from tasks import send_email
from datetime import datetime


load_dotenv()
DOMAIN = os.getenv("DOMAIN")


class UserService:
    def __init__(self, database: AsyncIOMotorDatabase):
        self.collection = database.users

    async def create_user(self, request: UserBase):
        exisiting_user = await self.collection.find_one(
            {"$or": [{"email": request.email}, {"username": request.username}]}
        )
        if exisiting_user:
            raise HTTPException(
                status_code=status.HTTP_406_NOT_ACCEPTABLE,
                detail={"detail": "User with this username or email already exists"},
            )

        # convert request to dictionary for mongodb compatibility
        user_base = request.model_dump()
        user_base["hashed_password"] = Hash.bcrypt(user_base["password"])
        # offload the request data into DbUser model
        db_user_create = DbUser(**user_base)
        # convert DbUser to dictionary for mongodb compatibility
        db_user = db_user_create.model_dump(by_alias=True)
        new_user = await self.collection.insert_one(db_user)
        # new_user is an insertOneResult which is just the objectid of the new user
        # we use that id to find and return the new user
        created_user = await self.collection.find_one({"_id": new_user.inserted_id})

        ################################################################################################
        # Email Verification
        token = EmailVerification.create_url_safe_token({"email": user_base["email"]})
        link = f"http://{DOMAIN}/auth/verify/{token}"

        recipients = [user_base["email"]]
        subject = "Verify your email account"
        html_message = f""""
        <h1>Verify your Email</h1>
        <p>Please click this <a href="{link}">link</a> to verify your email</p>
        """

        send_email.delay(recipients, subject, html_message)
        # ################################################################################################

        if not created_user:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail={"detail": "Failed to create user"},
            )
        res = {
            "message": "Account Created Successfully!!!, Please check your mailbox to verify your account",
            "user": created_user,
        }
        return res

    async def get_all_users(self):
        users = await self.collection.find().to_list(None)
        return users

    async def get_user_by_ObjectId(self, object_id: str):
        user = await self.collection.find_one({"_id": ConvertId.to_ObjectId(object_id)})
        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail={"detail": f"User with _id '{object_id}' not found"},
            )
        return user

    async def get_user_by_UserId(self, user_id: str):
        user = await self.collection.find_one({"_id": user_id})
        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail={"detail": f"User with user_id '{user_id}' not found"},
            )
        return user

    async def get_user_by_email(self, user_email: str):
        user = await self.collection.find_one({"email": user_email})
        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail={"detail": f"User with user_email '{user_email}' not found"},
            )
        return user

    async def update_user(self, username: str, request: UserUpdate):
        user = await self.collection.find_one_and_update(
            {"username": username},
            {
                "$set": {
                    "email": request.email,
                    "phone": request.phone,
                    "updated_at": datetime.now(),
                }
            },
            return_document=ReturnDocument.AFTER,
        )
        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail={"detail": "User not found"},
            )
        return user

    async def delete_user(self, username: str):
        user = await self.collection.find_one_and_delete({"username": username})
        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail={"detail": f"User '{username}' not found"},
            )
        return HTTPException(
            status_code=status.HTTP_200_OK,
            detail={"detail": f"User '{username}' successfully deleted"},
        )
