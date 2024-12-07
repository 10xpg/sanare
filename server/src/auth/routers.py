from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from motor.motor_asyncio import AsyncIOMotorDatabase
from database import get_db
from auth.services import AuthService, AuthMailService
from auth.schemas import TokenDisplay, EmailVerificationDisplay
from auth.models import EmailModel


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


@auth_router.get("/verify/{token}", response_model=EmailVerificationDisplay)
async def verify_user(token: str, db: AsyncIOMotorDatabase = Depends(get_db)):
    # token_data = EmailVerification.decode_url_safe_token(token)
    # user_email = token_data.get("email")
    # if not user_email:
    #     raise HTTPException(
    #         status_code=status.HTTP_404_NOT_FOUND,
    #         detail={
    #             "detail": f"An error occurred! No email address '{user_email}' exists!"
    #         },
    #     )
    # user = UserService(db).get_user_by_email(user_email)
    return await AuthService(db).verify_user(token)
