from motor.motor_asyncio import AsyncIOMotorDatabase
from recommendation.models import (
    DbDiagnosis,
    DbPatient,
    DbReport,
    DbVitals,
    DbRecommendation,
)
from recommendation.schemas import (
    PatientBase,
    DiagnosisBase,
    ReportBase,
    VitalsBase,
    RecommendationBase,
)
from fastapi import HTTPException, status
from user.utils import ConvertId
from pymongo import ReturnDocument
import re


class PatientService:
    def __init__(self, database: AsyncIOMotorDatabase):
        self.collection = database.patients

    async def create_patient(self, request: PatientBase):
        exisiting_patient = await self.collection.find_one({"email": request.email})
        if exisiting_patient:
            raise HTTPException(
                status_code=status.HTTP_406_NOT_ACCEPTABLE,
                detail={"detail": "Patient already exists"},
            )
        patient_base = request.model_dump()

        db_patient_create = DbPatient(**patient_base)
        db_patient = db_patient_create.model_dump(by_alias=True)
        new_patient = await self.collection.insert_one(db_patient)
        created_patient = await self.collection.find_one(
            {"_id": new_patient.inserted_id}
        )
        created_patient["_id"] = ConvertId.to_StringId(created_patient["_id"])
        if not created_patient:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail={"detail": "Failed to create patient"},
            )
        return created_patient

    async def get_all_patients(self):
        patients = await self.collection.find().to_list(None)
        return patients

    async def get_patient_by_ObjectId(self, object_id: str):
        patient = await self.collection.find_one(
            {"_id": ConvertId.to_ObjectId(object_id)}
        )
        if not patient:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail={"detail": f"Patient with ObjectId '{object_id}' not found"},
            )
        return patient

    async def update_patient(self, object_id: str, request: PatientBase):
        patient = await self.collection.find_one_and_update(
            {"_id": ConvertId.to_ObjectId(object_id)},
            {"$set": request.model_dump(exclude_unset=True)},
            return_document=ReturnDocument.AFTER,
        )
        if not patient:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail={"detail": f"Patient with ObjectId '{object_id}' not found"},
            )
        return patient

    async def delete_patient(self, object_id: str):
        patient = await self.collection.find_one_and_delete(
            {"_id": ConvertId.to_ObjectId(object_id)}
        )
        if not patient:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail={"detail": f"Patient with ObjectId '{object_id}' not found"},
            )
        return HTTPException(
            status_code=status.HTTP_200_OK,
            detail={
                "detail": f"Patient with ObjectId '{object_id}' successfully deleted"
            },
        )


class VitalsService:
    def __init__(self, database: AsyncIOMotorDatabase):
        self.collection = database.vitals

    async def create_vitals(self, patient_id: str, request: VitalsBase):
        vitals_base = request.model_dump()
        vitals_base["patient"] = ConvertId.to_ObjectId(patient_id)
        db_vitals_create = DbVitals(**vitals_base)
        db_vitals = db_vitals_create.model_dump(by_alias=True)
        new_vitals = await self.collection.insert_one(db_vitals)
        created_vitals = await self.collection.find_one({"_id": new_vitals.inserted_id})
        created_vitals["_id"] = ConvertId.to_StringId(created_vitals["_id"])
        if not created_vitals:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail={"detail": "Failed to create vitals"},
            )
        created_vitals["patient"] = patient_id
        return created_vitals

    async def get_vitals_by_ObjectId(self, object_id: str):
        vitals = await self.collection.find_one(
            {"_id": ConvertId.to_ObjectId(object_id)}
        )
        if not vitals:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail={"detail": f"Vitals with ObjectId '{object_id}' not found"},
            )
        vitals["patient"] = str(vitals["patient"])
        return vitals


class DiagnosisService:
    def __init__(self, database: AsyncIOMotorDatabase):
        self.collection = database.conditions

    async def create_diagnosis(
        self, patient_id: str, doctor_id: str, vitals_id: str, request: DiagnosisBase
    ):
        diagnosis_base = request.model_dump()
        diagnosis_base["patient"] = ConvertId.to_ObjectId(patient_id)
        diagnosis_base["doctor"] = ConvertId.to_ObjectId(doctor_id)
        diagnosis_base["vitals"] = ConvertId.to_ObjectId(vitals_id)
        db_diagnosis_create = DbDiagnosis(**diagnosis_base)
        db_diagnosis = db_diagnosis_create.model_dump(by_alias=True)

        new_diagnosis = await self.collection.insert_one(db_diagnosis)
        created_diagnosis = await self.collection.find_one(
            {"_id": new_diagnosis.inserted_id}
        )
        if not created_diagnosis:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail={"detail": "Failed to create diagnosis"},
            )
        created_diagnosis["patient"] = patient_id
        created_diagnosis["doctor"] = doctor_id
        created_diagnosis["vitals"] = vitals_id
        return created_diagnosis

    async def get_diagnosis_by_ObjectId(self, object_id: str):
        diagnosis = await self.collection.find_one(
            {"_id": ConvertId.to_ObjectId(object_id)}
        )
        if not diagnosis:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail={"detail": f"Diagnosis with ObjectId '{object_id}' not found"},
            )
        diagnosis["patient"] = str(diagnosis["patient"])
        diagnosis["doctor"] = str(diagnosis["doctor"])
        diagnosis["vitals"] = str(diagnosis["vitals"])

        return diagnosis


class ReportService:
    def __init__(self, database: AsyncIOMotorDatabase):
        self.collection = database.reports

    async def create_report(
        self,
        patient_id: str,
        doctor_id: str,
        diagnosis_id: str,
        request: ReportBase,
    ):
        report_base = request.model_dump()
        report_base["patient"] = ConvertId.to_ObjectId(patient_id)
        report_base["doctor"] = ConvertId.to_ObjectId(doctor_id)
        report_base["diagnosis"] = ConvertId.to_ObjectId(diagnosis_id)
        db_report_create = DbReport(**report_base)
        db_report = db_report_create.model_dump(by_alias=True)
        new_report = await self.collection.insert_one(db_report)
        created_report = await self.collection.find_one({"_id": new_report.inserted_id})
        if not created_report:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail={"detail": "Failed to create report"},
            )

        created_report["patient"] = patient_id
        created_report["doctor"] = doctor_id
        created_report["diagnosis"] = diagnosis_id

        return created_report

    async def get_all_reports(self):
        reports = await self.collection.find().to_list(None)
        for report in reports:
            report["_id"] = str(report["_id"])
            report["patient"] = str(report["patient"])
            report["doctor"] = str(report["doctor"])
            report["diagnosis"] = str(report["diagnosis"])
            report["created_at"] = str(report["created_at"])

        return reports

    async def get_report_by_ObjectId(self, object_id: str):
        report = await self.collection.find_one(
            {"_id": ConvertId.to_ObjectId(object_id)}
        )
        if not report:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail={"detail": f"Report with ObjectId '{object_id}' not found"},
            )
        report["_id"] = str(report["_id"])
        report["created_at"] = str(report["created_at"])
        report["patient"] = str(report["patient"])
        report["doctor"] = str(report["doctor"])
        report["diagnosis"] = str(report["diagnosis"])
        return report


class RecommendationService:
    def __init__(self, database: AsyncIOMotorDatabase):
        self.collection = database.recommendations
        self.traditionaldrugs = database.traditional_drugs
        self.orthodoxdrugs = database.orthodox_drugs
        self.predicteddrugs = database.predicted_drugs

    async def create_recommendation(
        self,
        patient_id: str,
        doctor_id: str,
        vitals_id: str,
        diagnosis_id: str,
        request: RecommendationBase,
    ):
        recommendation_base = request.model_dump()
        recommendation_base["patient"] = ConvertId.to_ObjectId(patient_id)
        recommendation_base["doctor"] = ConvertId.to_ObjectId(doctor_id)
        recommendation_base["vitals"] = ConvertId.to_ObjectId(vitals_id)
        recommendation_base["diagnosis"] = ConvertId.to_ObjectId(diagnosis_id)
        db_recommendation_create = DbRecommendation(**recommendation_base)
        db_recommendation = db_recommendation_create.model_dump(by_alias=True)
        new_recommendation = await self.collection.insert_one(db_recommendation)
        created_recommendation = await self.collection.find_one(
            {"_id": new_recommendation.inserted_id}
        )
        if not created_recommendation:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail={"detail": "Failed to create recommendation object."},
            )
        created_recommendation["patient"] = patient_id
        created_recommendation["doctor"] = doctor_id
        created_recommendation["vitals"] = vitals_id
        created_recommendation["diagnosis"] = diagnosis_id
        return created_recommendation

    async def get_recommendation_by_ObjectId(self, object_id: str):
        recommendation = await self.collection.find_one(
            {"_id": ConvertId.to_ObjectId(object_id)}
        )
        if not recommendation:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail={
                    "detail": f"Recommendation with ObjectId '{object_id}' not found"
                },
            )
        recommendation["patient"] = str(recommendation["patient"])
        recommendation["doctor"] = str(recommendation["doctor"])
        recommendation["vitals"] = str(recommendation["vitals"])
        recommendation["diagnosis"] = str(recommendation["diagnosis"])
        return recommendation

    async def get_traditional_recommendations(self, condition: str):
        pattern = re.escape(condition) + "s?"
        recommendations = await self.traditionaldrugs.find(
            {"disease_indications": {"$regex": pattern, "$options": "i"}}
        ).to_list(None)

        return recommendations

    async def get_orthodox_recommendations(self, condition: str, age: int):
        pass
