from bson import ObjectId
from fastapi import HTTPException, status


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
