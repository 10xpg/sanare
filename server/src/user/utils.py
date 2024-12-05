from bson import ObjectId
from fastapi import HTTPException, status
from typing import Any
from pydantic_core import core_schema


# Converts ObjectId to string and vise versa
class ConvertId:
    def to_ObjectId(id: str):
        try:
            return ObjectId(id)
        except Exception:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail={"detail": f"User with ObjectId '{id}' does not exist"},
            )

    def to_StringId(id: ObjectId):
        return str(id)


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
