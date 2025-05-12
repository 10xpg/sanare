from fastapi import APIRouter, Depends, status
from user.schemas import UserBase, UserDisplay, UserUpdate, CreatedUserDisplay
from user.services import UserService
from database import get_db
from motor.motor_asyncio import AsyncIOMotorDatabase
from auth.jwt_utils import JWTUtils, admin_required, is_verified

user_router = APIRouter(
    prefix="/user",
    tags=["Doctors"],
    dependencies=[],
)


@user_router.post(
    "/register",
    response_model=CreatedUserDisplay,
    tags=["Authentication"],
    status_code=status.HTTP_201_CREATED,
)
async def create_user(request: UserBase, db: AsyncIOMotorDatabase = Depends(get_db)):
    return await UserService(db).create_user(request)


@user_router.get(
    "/",
    response_model=list[UserDisplay],
)
async def get_all_users(
    db: AsyncIOMotorDatabase = Depends(get_db),
    # current_user: UserBase = Depends(JWTUtils.get_current_user),
    # payload: dict = Depends(admin_required),
    # is_verified_only: bool = Depends(is_verified),
):
    return await UserService(db).get_all_users()


@user_router.get(
    "/{user_id}",
    response_model=UserDisplay,
)
async def get_user_by_UserId(
    user_id: str,
    db: AsyncIOMotorDatabase = Depends(get_db),
    # current_user: UserBase = Depends(JWTUtils.get_current_user),
    # is_verified_only: bool = Depends(is_verified),
):
    return await UserService(db).get_user_by_UserId(user_id)


@user_router.get(
    "/{_id}",
    response_model=UserDisplay,
)
async def get_user_by_ObjectId(
    _id: str,
    db: AsyncIOMotorDatabase = Depends(get_db),
    # current_user: UserBase = Depends(JWTUtils.get_current_user),
    # is_verified_only: bool = Depends(is_verified),
):
    return await UserService(db).get_user_by_ObjectId(_id)


@user_router.put(
    "/{user_id}", response_model=UserDisplay, status_code=status.HTTP_202_ACCEPTED
)
async def update_user(
    user_id: str,
    request: UserUpdate,
    db: AsyncIOMotorDatabase = Depends(get_db),
    # current_user: UserBase = Depends(JWTUtils.get_current_user),
    # is_verified_only: bool = Depends(is_verified),
):
    return await UserService(db).update_user(user_id, request)


@user_router.delete("/{user_id}")
async def delete_user(
    user_id: str,
    db: AsyncIOMotorDatabase = Depends(get_db),
    # current_user: UserBase = Depends(JWTUtils.get_current_user),
    # is_verified_only: bool = Depends(is_verified),
):
    return await UserService(db).delete_user(user_id)
