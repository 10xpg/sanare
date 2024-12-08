from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from motor.motor_asyncio import AsyncIOMotorDatabase
from database import get_db
from auth.services import AuthService, AuthMailService
from auth.schemas import (
    TokenDisplay,
    VerificationDisplay,
    PasswordResetBase,
    PasswordResetConfirmBase,
)
from auth.models import EmailModel
from pydantic import EmailStr


auth_router = APIRouter(prefix="/auth", tags=["Authentication"])


@auth_router.post("/login", response_model=TokenDisplay)
async def login(
    request: OAuth2PasswordRequestForm = Depends(),
    db: AsyncIOMotorDatabase = Depends(get_db),
):
    return await AuthService(db).get_token(request)


@auth_router.post("/send_mail")
async def send_mail(request: EmailModel):
    return await AuthMailService.send_mail(request)


@auth_router.get("/verify/{token}", response_model=VerificationDisplay)
async def verify_user(token: str, db: AsyncIOMotorDatabase = Depends(get_db)):
    return await AuthService(db).verify_user(token)


@auth_router.post("/password-reset")
async def password_reset_request(
    request: PasswordResetBase, db: AsyncIOMotorDatabase = Depends(get_db)
):
    return await AuthService(db).reset_password_request(request)


@auth_router.post("/password-reset-confirm/{token}", response_model=VerificationDisplay)
async def password_reset_confirm(
    token: str,
    request: PasswordResetConfirmBase,
    db: AsyncIOMotorDatabase = Depends(get_db),
):
    return await AuthService(db).reset_password(token, request)
