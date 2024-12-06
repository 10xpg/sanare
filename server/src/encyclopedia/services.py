from encyclopedia.models import DbOtrhodoxDrugs, DbTraditionalDrugs
from motor.motor_asyncio import AsyncIOMotorDatabase
from user.utils import ConvertId


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
        return traditional_drugs
