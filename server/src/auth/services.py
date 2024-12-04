from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from auth.utils import Hash
from auth.jwt_utils import JWTUtils
from motor.motor_asyncio import AsyncIOMotorDatabase
from user.utils import ConvertId
from fastapi import HTTPException, status


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
