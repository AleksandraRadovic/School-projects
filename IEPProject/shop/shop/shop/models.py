from flask_sqlalchemy import SQLAlchemy

database = SQLAlchemy()

class ProductCategory(database.Model):
    __tablename__ = "productcategory"

    id = database.Column(database.Integer, primary_key=True)
    idP = database.Column(database.Integer, database.ForeignKey("products.id"), nullable=False)
    idC = database.Column(database.Integer, database.ForeignKey("categories.id"), nullable=False)

class ProductOrder(database.Model):
    __tablename__ = "productorder"

    id = database.Column(database.Integer, primary_key=True)
    idP = database.Column(database.Integer, database.ForeignKey("products.id"), nullable=False)
    idO = database.Column(database.Integer, database.ForeignKey("orders.id"),  nullable=False)
    quantity = database.Column(database.Integer, nullable=False)

class Product(database.Model):
    __tablename__ = "products"

    id = database.Column(database.Integer, primary_key=True)
    nameProduct = database.Column(database.String(256), nullable=False)
    price = database.Column(database.Float, nullable=False)

    categories = database.relationship("Category", secondary=ProductCategory.__table__, back_populates="products")
    orders = database.relationship("Order", secondary=ProductOrder.__table__, back_populates="products")

class Category(database.Model):
    __tablename__ = "categories"

    id = database.Column(database.Integer, primary_key=True)
    nameCategory = database.Column(database.String(256), nullable=False)

    products = database.relationship("Product", secondary=ProductCategory.__table__, back_populates="categories")

class Order(database.Model):
    __tablename__ = "orders"

    id = database.Column(database.Integer, primary_key=True)
    idC = database.Column(database.Integer, nullable=False)
    emailC = database.Column(database.String(256), nullable=False)
    status = database.Column(database.String(256), nullable=False)
    timestamp = database.Column(database.DateTime, nullable=False)

    products = database.relationship("Product", secondary=ProductOrder.__table__, back_populates="orders")