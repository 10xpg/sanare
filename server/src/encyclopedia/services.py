from motor.motor_asyncio import AsyncIOMotorDatabase
from user.utils import ConvertId
from fastapi import HTTPException, status


class EncyclopediaService:
    def __init__(self, database: AsyncIOMotorDatabase):
        self.orthodox_collection = database.orthodox_drugs
        self.traditional_collection = database.traditional_drugs

    async def get_orthodox_drugs(
        self,
        limit: int,
        last_id: str | None,
    ):
        orthodox_drugs = (
            await self.orthodox_collection.find(
                {"_id": {"$gt": ConvertId.to_ObjectId(last_id)}} if last_id else {}
            )
            .sort("_id", 1)
            .limit(limit)
            .to_list(length=limit)
        )
        for od in orthodox_drugs:
            od["_id"] = ConvertId.to_StringId(od["_id"])
        if orthodox_drugs:
            next_last_id = str(orthodox_drugs[-1]["_id"])
        else:
            next_last_id = None
        return {
            "data": orthodox_drugs,
            "has_more": bool(next_last_id),
            "next_last_id": next_last_id,
        }

    async def get_traditional_drugs(
        self,
        # query: str,
    ):
        traditional_drugs = await self.traditional_collection.find(
            # {"$text": {"$search": query}}
        ).to_list(None)

        for d in traditional_drugs:
            d["_id"] = ConvertId.to_StringId(d["_id"])
            print(d)

        return traditional_drugs

    async def get_orthodox_drug(self, drug: str):
        orthodox_drug = await self.orthodox_collection.find_one(
            {
                "$or": [
                    {"name": {"$regex": drug, "$options": "i"}},
                    {"description": {"$regex": drug, "$options": "i"}},
                ]
            }
        )
        if not orthodox_drug:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail={"detail": f"Orthodox drug with name '{drug}' not found"},
            )
        orthodox_drug["_id"] = ConvertId.to_StringId(orthodox_drug["_id"])
        return orthodox_drug

    async def get_traditional_drug(self, drug: str):
        traditional_drug = await self.traditional_collection.find_one(
            {"product_name": {"$regex": drug, "$options": "i"}}
        )
        if not traditional_drug:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail={"detail": f"Traditional drug with name '{drug}' not found"},
            )
        traditional_drug["_id"] = ConvertId.to_StringId(traditional_drug["_id"])
        return traditional_drug
