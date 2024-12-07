from fastapi import APIRouter, Depends
from user.schemas import UserBase, UserDisplay, UserUpdate, CreatedUserDisplay
from user.services import UserService
from database import get_db
from motor.motor_asyncio import AsyncIOMotorDatabase
from auth.jwt_utils import JWTUtils

user_router = APIRouter(
    prefix="/user",
    tags=["Doctors"],
)


@user_router.post(
    "/register", response_model=CreatedUserDisplay, tags=["Authentication"]
)
async def create_user(request: UserBase, db: AsyncIOMotorDatabase = Depends(get_db)):
    return await UserService(db).create_user(request)


@user_router.get("/", response_model=list[UserDisplay])
async def get_all_users(
    db: AsyncIOMotorDatabase = Depends(get_db),
    current_user: UserBase = Depends(JWTUtils.get_current_user),
):
    return await UserService(db).get_all_users()


@user_router.get(
    "/{_id}",
    response_model=UserDisplay,
)
async def get_user_by_ObjectId(
    _id: str,
    db: AsyncIOMotorDatabase = Depends(get_db),
    current_user: UserBase = Depends(JWTUtils.get_current_user),
):
    return await UserService(db).get_user_by_ObjectId(_id)


@user_router.put("/{user_id}", response_model=UserDisplay)
async def update_user(
    user_id: str,
    request: UserUpdate,
    db: AsyncIOMotorDatabase = Depends(get_db),
    current_user: UserBase = Depends(JWTUtils.get_current_user),
):
    return await UserService(db).update_user(user_id, request)


@user_router.delete("/{user_id}")
async def delete_user(
    user_id: str,
    db: AsyncIOMotorDatabase = Depends(get_db),
    current_user: UserBase = Depends(JWTUtils.get_current_user),
):
    return await UserService(db).delete_user(user_id)
