from dotenv import load_dotenv
import os
from datetime import timedelta, datetime, timezone
from jose import jwt, JWTError
from motor.motor_asyncio import AsyncIOMotorDatabase
from database import get_db
from fastapi import Depends, HTTPException, status
from user.services import UserService
from fastapi.security import OAuth2PasswordBearer

load_dotenv()
SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")


class JWTUtils:

    @staticmethod
    def create_access_token(data: dict, expires_delta: timedelta | None = None):
        to_encode = data.copy()
        if expires_delta:
            expire = datetime.now(timezone.utc) + expires_delta
        else:
            expire = datetime.now(timezone.utc) + timedelta(minutes=15)
        to_encode.update({"exp": expire})
        encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
        return encoded_jwt

    @staticmethod
    def get_current_user(
        token: str = Depends(oauth2_scheme), db: AsyncIOMotorDatabase = Depends(get_db)
    ):
        credentials_exception = HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail={"detail": "Could not validate credentials"},
            headers={"WWW-Authenticate": "Bearer"},
        )

        try:
            payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
            user_id: str = payload.get("sub")  # retrieve username from token
            if user_id is None:
                raise credentials_exception

        except JWTError:
            raise credentials_exception

        user = UserService(db).get_user_by_user_id(user_id)
        if user is None:
            raise credentials_exception
        return user


def admin_required(token: str = Depends(oauth2_scheme)):
    payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
    if payload.get("role") != "admin" and payload.get("role") != "superuser":
        raise HTTPException(
            status_code=403,
            detail={"Access Denied": "Admin privileges required for this action!"},
        )
    return payload


def is_verified(token: str = Depends(oauth2_scheme)):
    payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])

    if payload.get("role") == "superuser":
        return payload

    if payload.get("is_verified") is False:
        raise HTTPException(
            status_code=403,
            detail={"Access Denied": "Verify your email to activate your account"},
        )
    return payload
