from pydantic import BaseModel, EmailStr


# DTO for User Creation
class UserBase(BaseModel):
    username: str
    first_name: str
    last_name: str
    email: EmailStr
    phone: str
    password: str


# DTO for User Display
class UserDisplay(BaseModel):
    username: str
    first_name: str
    last_name: str
    email: EmailStr
    phone: str


# DTO for User Update
class UserUpdate(BaseModel):
    email: EmailStr
    phone: str
