from pydantic import BaseModel, Field, EmailStr
from recommendation.models import Sex, EmergencyContact, PulseRhythm, PulseStrength
from user.utils import PyObjectId
from datetime import date, datetime
from typing import Any
from bson import ObjectId


class PatientBase(BaseModel):
    first_name: str
    last_name: str
    sex: Sex
    dob: datetime
    phone: str
    email: EmailStr
    address: str
    emergency_contacts: list[EmergencyContact]


class VitalsBase(BaseModel):
    patient: str
    weight: float
    temperature: float
    systolic_bp: float
    diastolic_bp: float
    heart_rate: int
    pulse_rhythm: PulseRhythm
    pulse_strength: PulseStrength
    respiratory_rate: int
    breathing_difficulty: bool
    oxygen_saturation: float


class DiagnosisBase(BaseModel):
    patient: str
    doctor: str
    vitals: str
    medical_history: str
    allergies: str
    symptoms: str
    file_upload: Any
    current_medications: str
    notes: str
    condition: list[str]


class ReportBase(BaseModel):
    patient: str
    doctor: str
    diagnosis: str
    selected_orthodox_drug: list[str] = []
    selected_traditional_drug: list[str] = []
