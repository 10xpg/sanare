from pydantic import BaseModel, Field, EmailStr
from datetime import datetime
from enum import Enum
from bson import ObjectId
from typing import Any
from pydantic_core import core_schema


# PyObjectId implementation from Stack Overflow
class PyObjectId(ObjectId):
    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, value: Any) -> ObjectId:
        """Validates if the provided value is a valid ObjectId."""
        if isinstance(value, ObjectId):
            return value
        if isinstance(value, str) and ObjectId.is_valid(value):
            return ObjectId(value)
        raise ValueError("Invalid ObjectId")

    @classmethod
    def __get_pydantic_core_schema__(
        cls, _source_type: Any, _handler: Any
    ) -> core_schema.CoreSchema:
        """
        Defines the core schema for FastAPI documentation.
        Creates a JSON schema representation compatible with Pydantic's requirements.
        """
        return core_schema.json_or_python_schema(
            json_schema=core_schema.str_schema(),
            python_schema=core_schema.is_instance_schema(ObjectId),
        )


class Roles(str, Enum):
    admin = "admin"
    regular = "regular"


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
    verification_token: str | None = None
    joined_at: datetime = Field(default_factory=datetime.now)
    last_login: datetime | None = None
    is_active: bool | None = False
    is_admin: bool | None = False

    class Config:
        populate_by_name = True
        json_encoders = {ObjectId: str}
