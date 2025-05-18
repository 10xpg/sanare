from fastapi import APIRouter, Depends, Query
from encyclopedia.schemas import (
    OrthodoxDrugsDisplay,
    TraditionalDrugsDisplay,
    OrthodoxDrugs,
)
from encyclopedia.services import EncyclopediaService
from motor.motor_asyncio import AsyncIOMotorDatabase
from database import get_db
from typing import Annotated
from auth.jwt_utils import is_verified


encyclopedia_router = APIRouter(
    prefix="/encyclopedia",
    tags=["Encyclopedia"],
    # dependencies=[Depends(is_verified)],
)


@encyclopedia_router.get("/orthodox/all", response_model=OrthodoxDrugsDisplay)
async def get_all_orthodox_drugs(
    limit: Annotated[int, Query(ge=1, le=20)] = 5,
    last_id: str | None = None,
    db: AsyncIOMotorDatabase = Depends(get_db),
):
    return await EncyclopediaService(db).get_orthodox_drugs(limit, last_id)


@encyclopedia_router.get("/orthodox/name/{drug_name}", response_model=OrthodoxDrugs)
async def get_orthodox_drug_by_name(
    drug_name: str, db: AsyncIOMotorDatabase = Depends(get_db)
):
    return await EncyclopediaService(db).get_orthodox_drug_by_name(drug_name)


@encyclopedia_router.get("/orthodox/{_id}", response_model=OrthodoxDrugs)
async def get_orthodox_drug_by_object_id(
    _id: str, db: AsyncIOMotorDatabase = Depends(get_db)
):
    return await EncyclopediaService(db).get_orthodox_drug(_id)


@encyclopedia_router.get(
    "/traditional/all", response_model=list[TraditionalDrugsDisplay]
)
async def get_all_traditional_drugs(
    # query: str | None = None,
    db: AsyncIOMotorDatabase = Depends(get_db),
    limit: Annotated[int, Query()] = 0,
):
    if limit == 0 or limit == None:
        return await EncyclopediaService(db).get_traditional_drugs(limit=955)

    return await EncyclopediaService(db).get_traditional_drugs(limit)


@encyclopedia_router.get(
    "/traditional/name/{drug_name}", response_model=TraditionalDrugsDisplay
)
async def get_traditional_drug_by_name(
    drug_name: str, db: AsyncIOMotorDatabase = Depends(get_db)
):
    return await EncyclopediaService(db).get_traditional_drug_by_name(drug_name)


@encyclopedia_router.get("/traditional/{_id}", response_model=TraditionalDrugsDisplay)
async def get_traditional_drug_by_object_id(
    _id: str, db: AsyncIOMotorDatabase = Depends(get_db)
):
    return await EncyclopediaService(db).get_traditional_drug(_id)
