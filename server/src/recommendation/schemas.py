from pydantic import BaseModel, Field, EmailStr
from recommendation.models import Sex, EmergencyContact, PulseRhythm, PulseStrength
from datetime import datetime
from typing import Annotated, Any


class PatientBase(BaseModel):
    first_name: Annotated[str, Field(min_length=1)]
    last_name: Annotated[str, Field(min_length=1)]
    sex: Sex
    dob: datetime
    phone: Annotated[str, Field(pattern="^\+?\d{3}-?\d{2,3}-?\d{3}-?\d{4}$|^\d{10}$")]
    email: EmailStr
    address: str
    emergency_contacts: list[EmergencyContact]


class PatientRes(PatientBase):
    id: str = Field(alias="_id")


class VitalsBase(BaseModel):
    patient: str
    weight: Annotated[float, Field(ge=0, le=610)]
    temperature: Annotated[float, Field(ge=20, le=50)]
    systolic_bp: Annotated[float, Field(ge=50, le=300)]
    diastolic_bp: Annotated[float, Field(ge=20, le=200)]
    heart_rate: Annotated[int, Field(ge=30, le=250)]
    pulse_rhythm: PulseRhythm
    pulse_strength: PulseStrength
    respiratory_rate: Annotated[int, Field(ge=0, le=70)]
    breathing_difficulty: bool
    oxygen_saturation: Annotated[float, Field(ge=50, le=120)]


class VitalsRes(VitalsBase):
    id: str = Field(alias="_id")


class DiagnosisBase(BaseModel):
    patient: str
    doctor: str
    vitals: str
    medical_history: str
    allergies: str
    symptoms: str
    current_medications: str
    notes: str
    condition: list[str]


class DiagnosisRes(DiagnosisBase):
    id: str = Field(alias="_id")


class ReportBase(BaseModel):
    patient: str
    doctor: str
    diagnosis: str
    selected_orthodox_drug: list[Any] = []
    selected_traditional_drug: list[Any] = []
    recommended_by_doctor: list[str]


class ReportRes(ReportBase):
    id: str = Field(alias="_id")
    created_at: datetime


class RecommendationBase(BaseModel):
    doctor: str
    patient: str
    vitals: str
    diagnosis: str
    recommended_orthodox_drug: list[Any]
    recommended_by_doctor: list[str]
    recommended_traditional_drug: list[Any]


class TraditionalDrugDisplay(BaseModel):
    id: str = Field(alias="_id")
    product_name: str
    active_ingredient: str | None
    disease_indications: str | None
    adverse_effects: str | None


class PredictedDrugBase(BaseModel):
    age: int | str
    condition: str


class PredictedDrugDisplay(BaseModel):
    id: str = Field(alias="_id")
    drug_name: str | None = Field(
        description="The name of the recommended orthodox drug, e.g., 'Omeprazole'. Leave null if no drug is recommended."
    )
    category: str | None = Field(
        description="The pharmacological category of the drug, such as 'Analgesic', 'Antibiotic', or 'Proton pump inhibitor'."
    )
    effectiveness: str | None = Field(
        description="A short explanation of how effective this drug is for the given condition, especially for the specified age group."
    )
    side_effect: list[str] = Field(
        description="A list of common or notable side effects caused by the drug, e.g., ['Nausea', 'Drowsiness']."
    )
    composition: str = Field(
        description="The active pharmaceutical ingredient(s) in the drug, such as 'Omeprazole magnesium'."
    )
    dosage: str = Field(
        description="The correct dosage for the patient's age, including frequency and duration. For example: '10 mg once daily for 4 weeks'."
    )
    instructions: str = Field(
        description="Instructions on how to take the drug, including timing, food considerations, and other guidelines."
    )
