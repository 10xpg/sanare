import logging
from motor.motor_asyncio import AsyncIOMotorClient
from config import mongodb_uri


# MongoDB connection config
client: AsyncIOMotorClient = AsyncIOMotorClient(mongodb_uri)
logger = logging.getLogger("uvicorn.error")


# Utility function to check connection to MongoDB
async def ping_mongodb_server():
    try:
        await client.admin.command("ping")
        logger.info("Succesfully connected to MongoDB: Huraay!!!🎉🎊")
    except Exception as e:
        logger.error(f"Error connecting to MongoDB: {e}")
        raise e


# Database initialization : connects to the "Sanare" database
database = client.sanare


# Dependency function to provide database access
async def get_db():
    return database
