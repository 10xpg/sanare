from pydantic import BaseModel, EmailStr, Field
from user.utils import PyObjectId
from typing import Annotated, Any
from uuid import UUID, uuid4
from enum import Enum
from datetime import datetime
from bson import ObjectId


class Sex(str, Enum):
    male = "male"
    female = "female"


class EmergencyContact(BaseModel):
    name: str
    relationship: str
    phone: str


class DbPatient(BaseModel):
    id: PyObjectId | None = Field(
        default_factory=PyObjectId, alias="_id", title="patient_pk"
    )
    patient_id: UUID = uuid4()
    first_name: str
    last_name: str
    sex: Sex
    dob: datetime
    phone: str
    email: EmailStr
    address: str
    emergency_contacts: list[EmergencyContact]
    updated_at: Annotated[datetime, Field(default_factory=datetime.now)]
    created_at: Annotated[datetime, Field(default_factory=datetime.now)]

    class Config:
        json_encoders = {ObjectId: str}


class PulseRhythm(str, Enum):
    regular = "regular"
    irregular = "irregular"


class PulseStrength(str, Enum):
    weak = "weak"
    moderate = "moderate"
    strong = "strong"


class DbVitals(BaseModel):
    id: PyObjectId | None = Field(
        default_factory=PyObjectId, alias="_id", title="vitals_pk"
    )
    patient: PyObjectId
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
    recorded_at: Annotated[datetime, Field(default_factory=datetime.now)]

    class Config:
        json_encoders = {ObjectId: str}


class DbDiagnosis(BaseModel):
    id: PyObjectId | None = Field(
        default_factory=PyObjectId, alias="_id", title="diagnosis_pk"
    )
    diagnosis_id: UUID = uuid4()
    patient: PyObjectId
    doctor: PyObjectId
    vitals: PyObjectId
    medical_history: str
    allergies: str
    symptoms: str
    current_medications: str
    notes: str
    condition: list[str]
    created_at: Annotated[datetime, Field(default_factory=datetime.now)]

    class Config:
        json_encoders = {ObjectId: str}


class DbReport(BaseModel):
    id: PyObjectId | None = Field(
        default_factory=PyObjectId, alias="_id", title="report_pk"
    )
    report_id: UUID = uuid4()
    patient: PyObjectId
    doctor: PyObjectId
    diagnosis: PyObjectId
    selected_orthodox_drug: list[Any] = []
    recommended_by_doctor: list[str] = []
    selected_traditional_drug: list[Any] = []
    created_at: Annotated[datetime, Field(default_factory=datetime.now)]

    class Config:
        json_encoders = {ObjectId: str}


class DbRecommendation(BaseModel):
    id: PyObjectId | None = Field(
        default_factory=PyObjectId, alias="_id", title="recommendation_pk"
    )
    doctor: PyObjectId
    patient: PyObjectId
    vitals: PyObjectId
    diagnosis: PyObjectId
    recommended_orthodox_drug: list[Any] = []
    recommended_by_doctor: list[str] = []
    recommended_traditional_drug: list[Any] = []
    created_at: Annotated[datetime, Field(default_factory=datetime.now)]

    class Config:
        json_encoders = {ObjectId: str}


class DbPredictedDrug(BaseModel):
    id: PyObjectId | None = Field(
        default_factory=PyObjectId, alias="_id", title="predicted_drug_pk"
    )
    patient: PyObjectId
    doctor: PyObjectId
    diagnosis: PyObjectId
    drug: str
    category: str
    effectiveness: str
    side_effect: str
    created_at: Annotated[datetime, Field(default_factory=datetime.now)]

    class Config:
        json_encoders = {ObjectId: str}
