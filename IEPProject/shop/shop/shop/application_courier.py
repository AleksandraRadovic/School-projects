from flask import Flask, jsonify, request, Response
from configuration import Configuration
from models import database, Category, ProductCategory, Product, Order,ProductOrder
from flask_jwt_extended import JWTManager, jwt_required, get_jwt_identity, get_jwt
from sqlalchemy import and_
import re
import datetime

application = Flask(__name__)
application.config.from_object(Configuration)
jwt = JWTManager(application)

@application.route("/orders_to_deliver", methods=["GET"])
@jwt_required()
def orders_to_deliver():
    identity = get_jwt_identity()
    if not identity:
        return jsonify({"msg": "Missing Authorization Header"}), 401

    subject = get_jwt()
    if subject["roles"] != "courier":
        return jsonify({"msg": "Missing Authorization Header"}), 401

    ordersNotDeliverd = Order.query.filter(Order.status == "CREATED").all()
    orders = []
    for order in ordersNotDeliverd:
        order = {
            "id": order.id,
            "email": order.emailC
        }
        orders.append(order)
    return jsonify({"orders": orders}), 200

@application.route("/pick_up_order", methods=["POST"])
@jwt_required()
def pick_up_order():
    identity = get_jwt_identity()
    if not identity:
        return jsonify({"msg": "Missing Authorization Header"}), 401

    subject = get_jwt()
    if subject["roles"] != "courier":
        return jsonify({"msg": "Missing Authorization Header"}), 401

    idO = request.json.get("id", None)
    if not idO:
        return jsonify({"message": "Missing order id."}), 400
    if not isinstance(idO, int) or idO <= 0:
        return jsonify({"message": "Invalid order id."}), 400

    order = Order.query.filter(and_(Order.id == idO, Order.status == "CREATED")).first()
    if not order:
        return jsonify({"message": "Invalid order id."}), 400
    order.status ="PENDING"
    database.session.commit()

    return jsonify({}), 200

@application.route("/", methods=["GET"])
def index():
    return "Hello world"

if __name__ == "__main__":
    database.init_app(application)
    application.run(debug=True, host="0.0.0.0", port=5002)