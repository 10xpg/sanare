from fastapi import FastAPI
from user.routers import user_router
from auth.routers import auth_router
from contextlib import asynccontextmanager
from database import ping_mongodb_server, get_db


@asynccontextmanager
async def lifespan(app: FastAPI):
    await ping_mongodb_server()
    yield


app = FastAPI()
app.include_router(user_router)
app.include_router(auth_router)


@app.get("/")
async def welcome():
    return {"msg": "Hello, world"}
