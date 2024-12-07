from pydantic import BaseModel
from user.schemas import UserDisplay


class TokenDisplay(BaseModel):
    access_token: str
    token_type: str
    object_id: str
    user_id: str


class TokenData(BaseModel):
    user_id: str | None


class EmailVerificationDisplay(BaseModel):
    message: str
    user_status: UserDisplay
