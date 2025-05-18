from motor.motor_asyncio import AsyncIOMotorDatabase
from user.utils import ConvertId
from fastapi import HTTPException, status
from typing import Any

regex = "$regex"
options = "$options"


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
                {"_id": {"$gt": ConvertId.to_object_id(last_id)}} if last_id else {}
            )
            .sort("_id", 1)
            .limit(limit)
            .to_list(length=limit)
        )
        for od in orthodox_drugs:
            od["_id"] = ConvertId.to_string_id(od["_id"])
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
        limit: int | Any,
    ):
        traditional_drugs = (
            await self.traditional_collection.find(
                # {"$text": {"$search": query}}
            )
            .sort("_id,1")
            .limit(limit)
            .to_list(length=limit)
        )

        for d in traditional_drugs:
            d["_id"] = ConvertId.to_string_id(d["_id"])

        return traditional_drugs

    async def get_orthodox_drug(self, object_id: str):
        od = await self.orthodox_collection.find_one(
            {"_id": ConvertId.to_object_id(object_id)}
        )
        if not od:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail={"detail": f"Orthodox drug with id '{object_id}' not found"},
            )

        od["_id"] = ConvertId.to_string_id(od["_id"])
        return od

    async def get_traditional_drug(self, object_id: str):
        td = await self.traditional_collection.find_one(
            {"_id": ConvertId.to_object_id(object_id)}
        )
        if not td:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail={"detail": f"Traditional drug with id '{object_id}' not found"},
            )

        td["_id"] = ConvertId.to_string_id(td["_id"])
        return td

    async def get_orthodox_drug_by_name(self, drug: str):
        orthodox_drug_res = await self.orthodox_collection.find_one(
            {
                "$or": [
                    {"name": {regex: drug, options: "i"}},
                    {"description": {regex: drug, options: "i"}},
                    {"synonyms.synonym.#text": {regex: drug, options: "i"}},
                ]
            }
        )
        if not orthodox_drug_res:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail={"detail": f"Orthodox drug with name '{drug}' not found"},
            )

        orthodox_drug_res["_id"] = ConvertId.to_string_id(orthodox_drug_res["_id"])
        return orthodox_drug_res

    async def get_traditional_drug_by_name(self, drug: str):
        traditional_drug_res = await self.traditional_collection.find_one(
            {"product_name": {regex: drug, options: "i"}}
        )
        if not traditional_drug_res:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail={"detail": f"Traditional drug with name '{drug}' not found"},
            )

        traditional_drug_res["_id"] = ConvertId.to_string_id(
            traditional_drug_res["_id"]
        )
        return traditional_drug_res
