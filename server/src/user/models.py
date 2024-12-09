from pydantic import BaseModel, Field, EmailStr
from datetime import datetime
from enum import Enum
from bson import ObjectId
from user.utils import PyObjectId


class Roles(str, Enum):
    admin = "admin"
    regular = "regular"
    superuser = "superuser"


# User model
class DbUser(BaseModel):
    id: PyObjectId | None = Field(
        default_factory=PyObjectId, alias="_id", title="user_pk"
    )
    username: str
    first_name: str
    last_name: str
    email: EmailStr
    phone: str
    hashed_password: str
    role: Roles = Roles.regular
    is_email_verified: bool | None = False
    joined_at: datetime = Field(default_factory=datetime.now)
    last_login: datetime | None = None
    is_active: bool | None = False
    is_admin: bool | None = False
    updated_at: datetime | None = None

    class Config:
        populate_by_name = True
        json_encoders = {ObjectId: str}
