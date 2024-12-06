from fastapi import APIRouter, Depends, Query
from encyclopedia.schemas import OrthodoxDrugsDisplay, TraditionalDrugsDisplay
from encyclopedia.services import EncyclopediaService
from motor.motor_asyncio import AsyncIOMotorDatabase
from database import get_db
from typing import Annotated


encyclopedia_router = APIRouter(
    prefix="/encyclopedia",
    tags=["Encyclopedia"],
)


@encyclopedia_router.get("/orthodox/all", response_model=OrthodoxDrugsDisplay)
async def get_all_orthodox_drugs(
    limit: Annotated[int, Query(ge=1, le=20)] = 5,
    last_id: str | None = None,
    db: AsyncIOMotorDatabase = Depends(get_db),
):
    return await EncyclopediaService(db).get_orthodox_drugs(limit, last_id)


@encyclopedia_router.get(
    "/traditional/all", response_model=list[TraditionalDrugsDisplay]
)
async def get_all_traditional_drugs(
    # query: str | None = None,
    db: AsyncIOMotorDatabase = Depends(get_db),
):
    return await EncyclopediaService(db).get_traditional_drugs()
