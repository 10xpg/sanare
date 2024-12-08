from pydantic import BaseModel, EmailStr, Field, field_validator
from typing import Annotated
import re


# DTO for User Creation
class UserBase(BaseModel):
    username: Annotated[str, Field(min_length=5, max_length=10)]
    first_name: Annotated[str, Field(min_length=1, max_length=100)]
    last_name: Annotated[str, Field(min_length=1, max_length=100)]
    email: EmailStr
    phone: Annotated[str, Field(pattern="^\+?\d{3}-?\d{2,3}-?\d{3}-?\d{4}$|^\d{10}$")]
    password: str

    @field_validator("password")
    def validate_password(cls, v: str):
        if not re.match(
            r"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$", v
        ):
            raise ValueError(
                "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character."
            )
        return v


# DTO for User Display
class UserDisplay(BaseModel):
    username: str
    first_name: str
    last_name: str
    email: EmailStr
    phone: str
    is_email_verified: bool


# DTO for Created User Display
class CreatedUserDisplay(BaseModel):
    message: str
    user: UserDisplay


# DTO for User Update
class UserUpdate(BaseModel):
    email: EmailStr
    phone: Annotated[str, Field(pattern="^\+?\d{3}-?\d{2,3}-?\d{3}-?\d{4}$|^\d{10}$")]
