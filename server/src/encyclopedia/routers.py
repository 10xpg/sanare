from fastapi import APIRouter, Depends
from encyclopedia.models import DbOtrhodoxDrugs, DbTraditionalDrugs
from encyclopedia.services import EncyclopediaService
from motor.motor_asyncio import AsyncIOMotorDatabase
from database import get_db


encyclopedia_router = APIRouter(
    prefix="/encyclopedia",
    tags=["Encyclopedia"],
)


@encyclopedia_router.get("/orthodox/all")
async def get_all_orthodox_drugs(
    query: str,
    db: AsyncIOMotorDatabase = Depends(get_db),
):
    return await EncyclopediaService(db).get_orthodox_drugs(query)


@encyclopedia_router.get("/traditional/all")
async def get_all_traditional_drugs(
    query: str,
    db: AsyncIOMotorDatabase = Depends(get_db),
):
    return await EncyclopediaService(db).get_traditional_drugs(query)
