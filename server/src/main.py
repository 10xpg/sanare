from fastapi import FastAPI
from user.routers import user_router
from auth.routers import auth_router
from encyclopedia.routers import encyclopedia_router
from recommendation.routers import (
    patient_router,
    vitals_router,
    diagnosis_router,
    report_router,
    recommendation_router,
)
from contextlib import asynccontextmanager
from database import ping_mongodb_server, get_db
from fastapi.middleware.cors import CORSMiddleware


origins = [
    "http://localhost:5173",
    "http://localhost:5174",
]


@asynccontextmanager
async def lifespan(app: FastAPI):
    await ping_mongodb_server()
    yield


app = FastAPI(
    title="SANARE",
    summary="API for integrating traditional medicine into mainstream healthcare in Ghana.",
    version="1.0.0",
    contact={
        "Developer": "pdg",
        "email": "gbezehp@gmail.com",
        "phone": "+233 543002078",
    },
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/", tags=["Welcome"])
async def welcome():
    return {"msg": "Hello, Welcome to Sanare API"}


app.include_router(auth_router)
app.include_router(user_router)
app.include_router(patient_router)
app.include_router(vitals_router)
app.include_router(diagnosis_router)
app.include_router(recommendation_router)
app.include_router(report_router)
app.include_router(encyclopedia_router)
