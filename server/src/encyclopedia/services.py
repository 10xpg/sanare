from encyclopedia.models import DbOtrhodoxDrugs, DbTraditionalDrugs
from motor.motor_asyncio import AsyncIOMotorDatabase


class EncyclopediaService:
    def __init__(self, database: AsyncIOMotorDatabase):
        self.orthodox_collection = database.orthodox_drugs
        self.traditional_collection = database.traditional_drugs

    async def get_orthodox_drugs(self, query: str):
        orthodox_drugs = await self.orthodox_collection.find(
            {"$text": {"$search": query}}
        ).to_list(None)
        return orthodox_drugs

    async def get_traditional_drugs(self, query: str):
        traditional_drugs = await self.traditional_collection.find(
            {"$text": {"$search": query}}
        ).to_list(None)
        return traditional_drugs
