from pydantic import BaseModel, Field, EmailStr
from recommendation.models import Sex, EmergencyContact, PulseRhythm, PulseStrength
from datetime import datetime
from typing import Any, Annotated


class PatientBase(BaseModel):
    first_name: Annotated[str, Field(min_length=1)]
    last_name: Annotated[str, Field(min_length=1)]
    sex: Sex
    dob: datetime
    phone: Annotated[str, Field(pattern="^\+?\d{3}-?\d{2,3}-?\d{3}-?\d{4}$|^\d{10}$")]
    email: EmailStr
    address: str
    emergency_contacts: list[EmergencyContact]


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


class ReportBase(BaseModel):
    patient: str
    doctor: str
    diagnosis: str
    selected_orthodox_drug: list[str] = []
    selected_traditional_drug: list[str] = []
