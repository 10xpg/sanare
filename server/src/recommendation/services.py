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
    PredictedDrugDisplay,
)
from fastapi import HTTPException, status
from user.utils import ConvertId
from pymongo import ReturnDocument
import re
import getpass
import os
from langchain.chat_models import init_chat_model
import json
from langchain_core.output_parsers import JsonOutputParser
from langchain_core.prompts import PromptTemplate
from datetime import datetime, timedelta


if not os.environ.get("GOOGLE_API_KEY"):
    os.environ["GOOGLE_API_KEY"] = getpass.getpass("Enter API key for Google Gemini: ")

TEMPLATE = """
You are a drug recommendation tool called “sanare”.
 Given a patient's condition and age, return a JSON object with an orthodox_drugs array consisitng of multiple suitable drugs.
 \n\n{format_instructions}\n\n Condition: {condition}, Age: {age}. 
 Ensure recommendations are age-appropriate and medically sound.
 sample Response:
```
{{
  "orthodox_drugs": [
    {{
      "drug_name": "Omeprazole",
      "dosage": "10-20 mg once daily before meals for 4-8 weeks",
      "composition": "Omeprazole magnesium",
      "instructions": "Take on an empty stomach, preferably 30 minutes before breakfast. Do not crush or chew the capsules. Complete the full course as prescribed.",
      "category": "Proton pump inhibitor (PPI)",
      "effectiveness": "Highly effective for reducing gastric acid and treating ulcers or gastritis",
      "side_effects": ["Headache", "Nausea", "Abdominal pain", "Diarrhea"]
    }},
  ]
}}
```
 """


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
        created_patient["_id"] = ConvertId.to_string_id(created_patient["_id"])
        if not created_patient:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail={"detail": "Failed to create patient"},
            )
        return created_patient

    async def get_all_patients(self):
        patients = await self.collection.find().to_list(None)
        for patient in patients:
            patient["_id"] = ConvertId.to_string_id(patient["_id"])
        return patients

    async def get_patient_by_object_id(self, object_id: str):
        patient = await self.collection.find_one(
            {"_id": ConvertId.to_object_id(object_id)}
        )
        patient["_id"] = ConvertId.to_string_id(patient["_id"])
        if not patient:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail={"detail": f"Patient with ObjectId '{object_id}' not found"},
            )
        return patient

    async def update_patient(self, object_id: str, request: PatientBase):
        patient = await self.collection.find_one_and_update(
            {"_id": ConvertId.to_object_id(object_id)},
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
            {"_id": ConvertId.to_object_id(object_id)}
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

    async def patient_count(self):
        count = await self.collection.count_documents({})
        return {"patients": count}


class VitalsService:
    def __init__(self, database: AsyncIOMotorDatabase):
        self.collection = database.vitals

    async def create_vitals(self, patient_id: str, request: VitalsBase):
        vitals_base = request.model_dump()
        vitals_base["patient"] = ConvertId.to_object_id(patient_id)
        db_vitals_create = DbVitals(**vitals_base)
        db_vitals = db_vitals_create.model_dump(by_alias=True)
        new_vitals = await self.collection.insert_one(db_vitals)
        created_vitals = await self.collection.find_one({"_id": new_vitals.inserted_id})
        created_vitals["_id"] = ConvertId.to_string_id(created_vitals["_id"])
        if not created_vitals:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail={"detail": "Failed to create vitals"},
            )
        created_vitals["patient"] = patient_id
        return created_vitals

    async def get_vitals_by_object_id(self, object_id: str):
        vitals = await self.collection.find_one(
            {"_id": ConvertId.to_object_id(object_id)}
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
        diagnosis_base["patient"] = ConvertId.to_object_id(patient_id)
        diagnosis_base["doctor"] = ConvertId.to_object_id(doctor_id)
        diagnosis_base["vitals"] = ConvertId.to_object_id(vitals_id)
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
        created_diagnosis["_id"] = str(created_diagnosis["_id"])
        created_diagnosis["patient"] = patient_id
        created_diagnosis["doctor"] = doctor_id
        created_diagnosis["vitals"] = vitals_id
        return created_diagnosis

    async def get_diagnosis_by_object_id(self, object_id: str):
        diagnosis = await self.collection.find_one(
            {"_id": ConvertId.to_object_id(object_id)}
        )
        if not diagnosis:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail={"detail": f"Diagnosis with ObjectId '{object_id}' not found"},
            )
        diagnosis["_id"] = str(diagnosis["_id"])
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
        report_base["patient"] = ConvertId.to_object_id(patient_id)
        report_base["doctor"] = ConvertId.to_object_id(doctor_id)
        report_base["diagnosis"] = ConvertId.to_object_id(diagnosis_id)
        db_report_create = DbReport(**report_base)
        db_report = db_report_create.model_dump(by_alias=True)
        new_report = await self.collection.insert_one(db_report)
        created_report = await self.collection.find_one({"_id": new_report.inserted_id})
        if not created_report:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail={"detail": "Failed to create report"},
            )
        created_report["_id"] = str(created_report["_id"])
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

    async def count_last_seen(self, doctor_id: str):
        today = datetime.now()
        seven_days_ago = today - timedelta(days=7)
        count = await self.collection.count_documents(
            {
                "created_at": {"$gte": seven_days_ago, "$lte": today},
                "doctor": ConvertId.to_object_id(doctor_id),
            }
        )
        return {"last_seen": count}

    async def get_report_by_object_id(self, object_id: str):
        report = await self.collection.find_one(
            {"_id": ConvertId.to_object_id(object_id)}
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
        self.model = init_chat_model("gemini-2.0-flash", model_provider="google_genai")
        self.parser = JsonOutputParser(pydantic_object=PredictedDrugDisplay)
        self.prompt = PromptTemplate(
            template=TEMPLATE,
            input_variables=["condition", "age"],
            partial_variables={
                "format_instructions": self.parser.get_format_instructions()
            },
        )

    async def create_recommendation(
        self,
        patient_id: str,
        doctor_id: str,
        vitals_id: str,
        diagnosis_id: str,
        request: RecommendationBase,
    ):
        recommendation_base = request.model_dump()
        recommendation_base["patient"] = ConvertId.to_object_id(patient_id)
        recommendation_base["doctor"] = ConvertId.to_object_id(doctor_id)
        recommendation_base["vitals"] = ConvertId.to_object_id(vitals_id)
        recommendation_base["diagnosis"] = ConvertId.to_object_id(diagnosis_id)
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

    async def recommendation_count(self, doctor_id: str):
        count = await self.collection.count_documents(
            {"doctor": ConvertId.to_object_id(doctor_id)}
        )
        return {"recommendations": count}

    async def get_recommendation_by_object_id(self, object_id: str):
        recommendation = await self.collection.find_one(
            {"_id": ConvertId.to_object_id(object_id)}
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
        for td in recommendations:
            td["_id"] = ConvertId.to_string_id(td["_id"])
        return recommendations

    # recommender model
    async def diagnose(self, condition: str, age: int | str):
        prompt = self.prompt.invoke({"age": age, "condition": condition})
        response = self.model.invoke(prompt)
        return json.loads(str(response.content).replace("`", "").replace("json", ""))

    async def get_orthodox_recommendations(self, condition: str, age: int | str):
        prediction = await self.diagnose(condition, age)
        recommendations = [p for p in prediction["orthodox_drugs"]]
        return recommendations
