from pydantic import BaseModel, EmailStr


class EmailModel(BaseModel):
    addresses: list[EmailStr]
