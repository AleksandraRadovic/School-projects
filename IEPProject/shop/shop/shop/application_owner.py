from flask import Flask, jsonify, request
from configuration import Configuration
from models import database, Category, ProductCategory, Product
from flask_jwt_extended import JWTManager, jwt_required, get_jwt_identity, get_jwt
import requests
import io
import csv


application = Flask(__name__)
application.config.from_object(Configuration)
jwt = JWTManager(application)

def isFloat(str):
    try:
        float(str)
    except ValueError:
        return False
    return float(str) > 0

def isInt(str):
    try:
        int(str)
    except ValueError:
        return False
    return int(str) > 0

@application.route("/update", methods=["POST"])
@jwt_required()
def update():
    identity = get_jwt_identity()
    if not identity:
        return jsonify({"msg": "Missing Authorization Header"}), 401

    subject = get_jwt()
    if subject["roles"] != "owner":
        return jsonify({"msg": "Missing Authorization Header"}), 401

    if "file" not in request.files:
        return jsonify({"message": "Field file is missing."}), 400

    content = request.files["file"].stream.read().decode("utf-8")
    stream = io.StringIO(content)
    reader = csv.reader(stream)
    cnt = 0

    products = []
    categoriesOfProduct = []

    for row in reader:
        if len(row) < 3:
            return jsonify({"message": f"Incorrect number of values on line {cnt}."}), 400
        if not isFloat(row[2]):
            return jsonify({"message": f"Incorrect price on line {cnt}."}), 400
        cnt += 1

        p = Product.query.filter(Product.nameProduct == row[1]).first()
        if p:
            return jsonify({"message": f"Product {p.nameProduct} already exists."}), 400

        categories = row[0].split("|")
        product = [row[1], float(row[2])]
        products.append(product)
        for c in categories:
            category = [row[1], c]
            categoriesOfProduct.append(category)
    for p in products:
        newProduct = Product(nameProduct=p[0], price=p[1])
        database.session.add(newProduct)
        database.session.commit()
    for cat in categoriesOfProduct:
        c = Category.query.filter(Category.nameCategory == cat[1]).first()
        if not c:
            newCategory = Category(nameCategory=cat[1])
            database.session.add(newCategory)
            database.session.commit()
            idP = Product.query.filter(Product.nameProduct == cat[0]).first()
            pc = ProductCategory(idP=idP.id, idC=newCategory.id)
        else:
            idP = Product.query.filter(Product.nameProduct == cat[0]).first()
            pc = ProductCategory(idP=idP.id, idC=c.id)
        database.session.add(pc)
        database.session.commit()

    return jsonify({}), 200

@application.route("/product_statistics", methods=["GET"])
@jwt_required()
def product_statistics():
    identity = get_jwt_identity()
    if not identity:
        return jsonify({"msg": "Missing Authorization Header"}), 401

    subject = get_jwt()
    if subject["roles"] != "owner":
        return jsonify({"msg": "Missing Authorization Header"}), 401


@application.route("/category_statistics", methods=["GET"])
@jwt_required()
def category_statistics():
    identity = get_jwt_identity()
    if not identity:
        return jsonify({"msg": "Missing Authorization Header"}), 401

    subject = get_jwt()
    if subject["roles"] != "owner":
        return jsonify({"msg": "Missing Authorization Header"}), 401


@application.route("/", methods=["GET"])
def index():
    return "Hello world"

if __name__ == "__main__":
    database.init_app(application)
    application.run(debug=True, host="0.0.0.0", port=5002)