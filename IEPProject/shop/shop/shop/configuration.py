from datetime import timedelta
import os

databaseUrl = os.environ["DATABASE_SHOP_URL"]

class Configuration():
    SQLALCHEMY_DATABASE_URI = f"mysql+pymysql://root:root@{databaseUrl}/shopDatabase"
    JWT_SECRET_KEY = "JWT_SECRET_DEV_KEY";
