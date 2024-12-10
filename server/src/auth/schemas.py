from pydantic import BaseModel, EmailStr
from user.models import Roles
from user.schemas import UserDisplay


class TokenDisplay(BaseModel):
    access_token: str
    token_type: str
    object_id: str
    user_id: str
    role: Roles
    is_verified: bool


class TokenData(BaseModel):
    user_id: str | None


class VerificationDisplay(BaseModel):
    message: str
    user_status: UserDisplay


class PasswordResetBase(BaseModel):
    email: EmailStr


class PasswordResetConfirmBase(BaseModel):
    new_password: str
    confirm_new_password: str
