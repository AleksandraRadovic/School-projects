from flask import Flask, request, jsonify, Response
from configuration import Configuration
from models import database, User
from email.utils import parseaddr
from sqlalchemy import and_
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
import json
import re

application = Flask(__name__)
application.config.from_object(Configuration)

patternEmail = r'^[\w\.-]+@[\w\.-]+\.[a-zA-Z]{2,}$'



@application.route("/register_customer", methods=["POST"])
def register_customer():
    email = request.json.get("email", "")
    password = request.json.get("password", "")
    forename = request.json.get("forename", "")
    surname = request.json.get("surname", "")

    if len(forename) == 0:
        return jsonify({"message": "Field forename is missing."}), 400

    if len(surname) == 0:
        return jsonify({"message": "Field surname is missing."}), 400

    if len(email) == 0:
        return jsonify({"message": "Field email is missing."}), 400

    if len(password) == 0:
        return jsonify({"message": "Field password is missing."}), 400

    if not re.match(patternEmail, email):
        return jsonify({"message": "Invalid email."}), 400

    if len(password) < 8:
        return jsonify({"message": "Invalid password."}), 400

    user = User.query.filter(User.email == email).first()

    if user:
        return jsonify({"message": "Email already exists."}), 400

    roles = "customer"
    user = User(forename=forename, surname=surname, email=email, password=password, roles=roles)
    database.session.add(user)
    database.session.commit()

    return jsonify({}), 200

@application.route("/register_courier", methods=["POST"])
def register_courier():
    email = request.json.get("email", "")
    password = request.json.get("password", "")
    forename = request.json.get("forename", "")
    surname = request.json.get("surname", "")

    if len(forename) == 0:
        return jsonify({"message": "Field forename is missing."}), 400

    if len(surname) == 0:
        return jsonify({"message": "Field surname is missing."}), 400

    if len(email) == 0:
        return jsonify({"message": "Field email is missing."}), 400

    if len(password) == 0:
        return jsonify({"message": "Field password is missing."}), 400

    if not re.match(patternEmail, email):
        return jsonify({"message": "Invalid email."}), 400

    if len(password) < 8:
        return jsonify({"message": "Invalid password."}), 400

    user = User.query.filter(User.email == email).first()

    if user:
        return jsonify({"message": "Email already exists."}), 400

    roles = "courier"
    user = User(forename=forename, surname=surname, email=email, password=password, roles=roles)
    database.session.add(user)
    database.session.commit()

    return jsonify({}), 200

jwt = JWTManager(application)

@application.route("/login", methods=["POST"])
def login():
    email = request.json.get("email", "")
    password = request.json.get("password", "")

    if len(email) == 0:
        return jsonify({"message": "Field email is missing."}), 400

    if len(password) == 0:
        return jsonify({"message": "Field password is missing."}), 400

    if not re.match(patternEmail, email):
        return jsonify({"message": "Invalid email."}), 400

    user = User.query.filter(and_(User.email == email, User.password == password)).first()
    if not user:
        return jsonify({"message": "Invalid credentials."}), 400

    additionalClaims={
        "forename": user.forename,
        "id": str(user.id),
        "surname": user.surname,
        "roles": user.roles
    }

    accessToken = create_access_token(identity=user.email, additional_claims=additionalClaims)

    return jsonify(accessToken=accessToken), 200


@application.route("/delete", methods=["POST"])
@jwt_required()
def delete():
    identity = get_jwt_identity()
    if not identity:
        return jsonify({"msg": "Missing Autohorization Header"}), 401

    user = User.query.filter(User.email == identity).first()
    if not user:
        return jsonify({"message": "Unknown user."}), 400

    database.session.delete(user)
    database.session.commit()

    return jsonify({}), 200


@application.route("/", methods=["GET"])
def index():
    return "Hello world"

if __name__ == "__main__":
    database.init_app(application)
    application.run(debug=True, host="0.0.0.0", port=5002)