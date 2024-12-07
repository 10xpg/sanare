from pydantic import BaseModel, EmailStr, Field
from typing import Annotated


# DTO for User Creation
class UserBase(BaseModel):
    username: Annotated[str, Field(min_length=5, max_length=10)]
    first_name: Annotated[str, Field(min_length=1, max_length=100)]
    last_name: Annotated[str, Field(min_length=1, max_length=100)]
    email: EmailStr
    phone: Annotated[str, Field(pattern="^\+?\d{3}-?\d{2,3}-?\d{3}-?\d{4}$|^\d{10}$")]
    password: str


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
