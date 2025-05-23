from fastapi import APIRouter, Depends, UploadFile, File, status
from recommendation.schemas import (
    PatientBase,
    PatientRes,
    PatientCount,
    DiagnosisBase,
    DiagnosisRes,
    VitalsBase,
    VitalsRes,
    ReportBase,
    ReportRes,
    LastSeenCount,
    RecommendationBase,
    RecommendationCount,
    TraditionalDrugDisplay,
    PredictedDrugDisplay,
)
from recommendation.services import (
    PatientService,
    VitalsService,
    DiagnosisService,
    ReportService,
    RecommendationService,
)
from database import get_db
from motor.motor_asyncio import AsyncIOMotorDatabase
from auth.jwt_utils import JWTUtils, is_verified
import shutil
import os


patient_router = APIRouter(
    prefix="/patient",
    tags=["Patients"],
    # dependencies=[Depends(JWTUtils.get_current_user), Depends(is_verified)],
)


@patient_router.post(
    "/", response_model=PatientRes, status_code=status.HTTP_201_CREATED
)
async def create_patient(
    request: PatientBase, db: AsyncIOMotorDatabase = Depends(get_db)
):
    return await PatientService(db).create_patient(request)


@patient_router.get("/all", response_model=list[PatientRes])
async def get_all_patients(db: AsyncIOMotorDatabase = Depends(get_db)):
    return await PatientService(db).get_all_patients()


@patient_router.get("/count", response_model=PatientCount)
async def count_patients(db: AsyncIOMotorDatabase = Depends(get_db)):
    return await PatientService(db).patient_count()


@patient_router.get("/{patient_id}", response_model=PatientBase)
async def get_patient_by_object_id(
    patient_id: str, db: AsyncIOMotorDatabase = Depends(get_db)
):
    return await PatientService(db).get_patient_by_object_id(patient_id)


@patient_router.put(
    "/{patient_id}", response_model=PatientBase, status_code=status.HTTP_202_ACCEPTED
)
async def update_patient(
    patient_id: str,
    request: PatientBase,
    db: AsyncIOMotorDatabase = Depends(get_db),
):
    return await PatientService(db).update_patient(patient_id, request)


vitals_router = APIRouter(
    prefix="/vitals",
    tags=["Vitals"],
    # dependencies=[Depends(JWTUtils.get_current_user), Depends(is_verified)],
)


@vitals_router.post("/", response_model=VitalsRes, status_code=status.HTTP_201_CREATED)
async def create_vitals(
    patient_id: str,
    request: VitalsBase,
    db: AsyncIOMotorDatabase = Depends(get_db),
):
    return await VitalsService(db).create_vitals(patient_id, request)


@vitals_router.get("/{vitals_id}", response_model=VitalsBase)
async def get_vitals_by_object_id(
    vitals_id: str,
    db: AsyncIOMotorDatabase = Depends(get_db),
):
    return await VitalsService(db).get_vitals_by_object_id(vitals_id)


diagnosis_router = APIRouter(
    prefix="/diagnosis",
    tags=["Diagnosis"],
    # dependencies=[Depends(JWTUtils.get_current_user), Depends(is_verified)],
)


@diagnosis_router.post(
    "/", response_model=DiagnosisRes, status_code=status.HTTP_201_CREATED
)
async def create_diagnosis(
    patient_id: str,
    doctor_id: str,
    vitals_id: str,
    request: DiagnosisBase,
    db: AsyncIOMotorDatabase = Depends(get_db),
):
    return await DiagnosisService(db).create_diagnosis(
        patient_id, doctor_id, vitals_id, request
    )


@diagnosis_router.post(
    "/files",
)
def get_files(files: list[UploadFile] = File(...)):
    file_info = []
    for file in files:
        path = f"../files/{file.filename}"
        os.makedirs(os.path.dirname(path), exist_ok=True)
        with open(path, "w+b") as buffer:
            shutil.copyfileobj(file.file, buffer)
        file_info.append({"filename": file.filename, "type": file.content_type})
        file.file.close()
    return file_info


@diagnosis_router.get("/{diagnosis_id}", response_model=DiagnosisBase)
async def get_diagnosis_by_object_id(
    diagnosis_id: str,
    db: AsyncIOMotorDatabase = Depends(get_db),
):
    return await DiagnosisService(db).get_diagnosis_by_object_id(diagnosis_id)


report_router = APIRouter(
    prefix="/report",
    tags=["Reports"],
    # dependencies=[Depends(JWTUtils.get_current_user), Depends(is_verified)],
)


@report_router.post("/", response_model=ReportRes, status_code=status.HTTP_201_CREATED)
async def create_report(
    patient_id: str,
    doctor_id: str,
    diagnosis_id: str,
    request: ReportBase,
    db: AsyncIOMotorDatabase = Depends(get_db),
):
    return await ReportService(db).create_report(
        patient_id, doctor_id, diagnosis_id, request
    )


@report_router.get("/all", response_model=list[ReportRes])
async def get_all_reports(
    db: AsyncIOMotorDatabase = Depends(get_db),
):
    return await ReportService(db).get_all_reports()


@report_router.get("/last-seen", response_model=LastSeenCount)
async def seen_within_last_week(
    doctor_id: str, db: AsyncIOMotorDatabase = Depends(get_db)
):
    return await ReportService(db).count_last_seen(doctor_id)


@report_router.get("/{report_id}", response_model=ReportRes)
async def get_report_by_object_id(
    report_id: str,
    db: AsyncIOMotorDatabase = Depends(get_db),
):
    return await ReportService(db).get_report_by_object_id(report_id)


recommendation_router = APIRouter(
    prefix="/recommendation",
    tags=["Recommendation"],
    # dependencies=[Depends(JWTUtils.get_current_user)],
)


@recommendation_router.post("/", response_model=RecommendationBase)
async def recommend_drugs(
    patient_id: str,
    doctor_id: str,
    vitals_id: str,
    diagnosis_id: str,
    request: RecommendationBase,
    db: AsyncIOMotorDatabase = Depends(get_db),
):
    return await RecommendationService(db).create_recommendation(
        patient_id,
        doctor_id,
        vitals_id,
        diagnosis_id,
        request,
    )


@recommendation_router.get("/count", response_model=RecommendationCount)
async def count_recommendations(
    doctor_id: str, db: AsyncIOMotorDatabase = Depends(get_db)
):
    return await RecommendationService(db).recommendation_count(doctor_id)


@recommendation_router.get("/{recommendation_id}", response_model=RecommendationBase)
async def get_recommendation_by_object_id(
    recommendation_id: str,
    db: AsyncIOMotorDatabase = Depends(get_db),
):
    return await RecommendationService(db).get_recommendation_by_object_id(
        recommendation_id
    )


@recommendation_router.get(
    "/traditional-drugs/{condition}",
    response_model=list[TraditionalDrugDisplay],
)
async def get_traditional_drugs(
    condition: str,
    db: AsyncIOMotorDatabase = Depends(get_db),
):
    return await RecommendationService(db).get_traditional_recommendations(condition)


@recommendation_router.get(
    "/orthodox-drugs/{condition}", response_model=list[PredictedDrugDisplay]
)
async def get_orthodox_drugs(
    condition: str,
    age: int,
    db: AsyncIOMotorDatabase = Depends(get_db),
):
    return await RecommendationService(db).get_orthodox_recommendations(condition, age)
