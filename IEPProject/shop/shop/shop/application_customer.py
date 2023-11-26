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

@application.route("/search", methods=["GET"])
@jwt_required()
def search():
    identity = get_jwt_identity()
    if not identity:
        return jsonify({"msg": "Missing Authorization Header"}), 401

    subject = get_jwt()
    if subject["roles"] != "customer":
        return jsonify({"msg": "Missing Authorization Header"}), 401

    name = request.args.get('name', "")
    category = request.args.get('category', "")

    allCategories = Category.query.filter(Category.nameCategory.like(f"%{category}%")).all()
    allProducts = Product.query.filter(Product.nameProduct.like(f"%{name}%")).all()

    categoriesList = []
    productsList = []
    for c in allCategories:
        for p in allProducts:
            categ = ProductCategory.query.filter(and_(ProductCategory.idC == c.id, ProductCategory.idP == p.id)).first()
            if categ:
                if c not in categoriesList:
                    categoriesList.append(c)
                if p not in productsList:
                    productsList.append(p)
    products = []
    categories = []
    for product in productsList:
        product_categories = Category.query.join(ProductCategory).join(Product).filter(Product.id == product.id).all()
        product_categories_names = []
        for pc in product_categories:
            product_categories_names.append(pc.nameCategory)
        products.append({
            "categories": product_categories_names,
            "id": product.id,
            "name": product.nameProduct,
            "price": product.price
        })
    for cat in categoriesList:
        categories.append(cat.nameCategory)
    result = {
        "categories": categories,
        "products": products
    }
    return jsonify(result), 200

@application.route("/order", methods=["POST"])
@jwt_required()
def order():
    identity = get_jwt_identity()
    if not identity:
        return jsonify({"msg": "Missing Authorization Header"}), 401

    subject = get_jwt()
    if subject["roles"] != "customer":
        return jsonify({"msg": "Missing Authorization Header"}), 401

    requests = request.json.get("requests", None)

    if not requests:
        return jsonify({"message": "Field requests is missing."}), 400

    productorder = []

    for i in range(len(requests)):
        id = requests[i].get("id", None)
        if not id:
            return jsonify({"message": f"Product id is missing for request number {i}."}), 400

        quantity = requests[i].get("quantity", None)
        if not quantity:
            return jsonify({"message": f"Product quantity is missing for request number {i}."}), 400

        if not isinstance(requests[i].get("id"), int) or requests[i].get("id") <= 0:
            return jsonify({"message": f"Invalid product id for request number {i}."}), 400

        if not isinstance(requests[i].get("quantity"), int) or requests[i].get("quantity") <= 0:
            return jsonify({"message": f"Invalid product quantity for request number {i}."}), 400

        product = Product.query.filter(Product.id == requests[i].get("id")).first()
        if not product:
            return jsonify({"message": f"Invalid product for request number {i}."}), 400
        productorder.append([requests[i].get("id"), requests[i].get("quantity")])

    idC = int(subject["id"])
    emailC = identity
    timestamp = datetime.datetime.utcnow()
    status = "CREATED"
    order = Order(idC=idC, emailC=emailC, status=status, timestamp=timestamp)
    database.session.add(order)
    database.session.commit()

    for item in productorder:
        po = ProductOrder(idP=item[0], idO=order.id, quantity=item[1])
        database.session.add(po)
        database.session.commit()

    return jsonify({"id": order.id}), 200

@application.route("/status", methods=["GET"])
@jwt_required()
def status():
    identity = get_jwt_identity()
    if not identity:
        return jsonify({"msg": "Missing Authorization Header"}), 401

    subject = get_jwt()

    if subject["roles"] != "customer":
        return jsonify({"msg": "Missing Authorization Header"}), 401

    customersOrders = Order.query.filter(Order.idC == get_jwt()["id"]).all()

    orders = []

    for item in customersOrders:
        timestamp = item.timestamp
        order = {
            "products": [],
            "price": 0,
            "status": item.status,
            "timestamp": timestamp
        }
        products = ProductOrder.query.filter(ProductOrder.idO == item.id).all()
        priceOfOrder = 0

        for pro in products:
            product = {
                "categories": [],
                "name": "",
                "price": 0,
                "quantity": pro.quantity
            }
            p = Product.query.filter(Product.id == pro.idP).first()
            product["name"] = p.nameProduct
            product["price"] = p.price
            categories = Category.query.join(ProductCategory).filter(ProductCategory.idP == pro.idP).all()
            for category in categories:
                product["categories"].append(category.nameCategory)
            priceOfOrder +=pro.quantity * p.price
            order["products"].append(product)
        order["price"] = priceOfOrder
        orders.append(order)

    return jsonify({"orders": orders}), 200

@application.route("/delivered", methods=["POST"])
@jwt_required()
def delivered():
    identity = get_jwt_identity()
    if not identity:
        return jsonify({"msg": "Missing Authorization Header"}), 401

    subject = get_jwt()
    if subject["roles"] != "customer":
        return jsonify({"msg": "Missing Authorization Header"}), 401

    idO = request.json.get("id", None)
    if not idO:
        return jsonify({"message": "Missing order id."}), 400
    if not isinstance(idO, int) or idO <= 0:
        return jsonify({"message": "Invalid order id."}), 400

    order = Order.query.filter(and_(Order.id == idO, Order.status == "PENDING")).first()
    if not order:
        return jsonify({"message": "Invalid order id."}), 400
    order.status = "COMPLETE"
    database.session.commit()

    return jsonify({}), 200

@application.route("/", methods=["GET"])
def index():
    return "Hello world"

if __name__ == "__main__":
    database.init_app(application)
    application.run(debug=True, host="0.0.0.0", port=5002)

