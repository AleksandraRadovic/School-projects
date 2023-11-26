from flask import Flask
from configuration import Configuration
from flask_migrate import Migrate, init, migrate, upgrade
from models import database
from sqlalchemy_utils import create_database, database_exists

applicaiton = Flask(__name__)
applicaiton.config.from_object(Configuration)

migrateObject = Migrate(applicaiton, database)

if not database_exists(applicaiton.config["SQLALCHEMY_DATABASE_URI"]):
    create_database(applicaiton.config["SQLALCHEMY_DATABASE_URI"])

database.init_app(applicaiton)

with applicaiton.app_context() as context:
    init()
    migrate(message="Production application")
    upgrade()

    database.session.commit()
