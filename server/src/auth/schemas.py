from pydantic import BaseModel


class TokenDisplay(BaseModel):
    access_token: str
    token_type: str
    object_id: str
    user_id: str


class TokenData(BaseModel):
    user_id: str | None
