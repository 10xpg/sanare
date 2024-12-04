from dotenv import load_dotenv
import os


load_dotenv()
mongodb_uri = os.getenv("DB_CONNECTION_STRING")
