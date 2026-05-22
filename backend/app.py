import os
from flask import Flask, jsonify, request
from flask_cors import CORS
from dotenv import load_dotenv
from model import load_model, load_products, recommend_items
import api_keys

load_dotenv()

app = Flask(__name__)
CORS(app)

PRODUCTS = load_products()
MODEL = load_model()
VALID_USERS = {"customer": "grocery123"}


def get_api_key_from_header():
    auth_header = request.headers.get("Authorization", "")
    if not auth_header.startswith("Bearer "):
        return None
    return auth_header.split(" ", 1)[1].strip()


def require_api_key():
    key = get_api_key_from_header()
    if key != api_keys.GROCERY_API_KEY:
        return jsonify({"success": False, "message": "Invalid or missing API key"}), 401

@app.route("/api/health")
def health():
    return jsonify({"status": "ok"})

@app.route("/api/login", methods=["POST"])
def login():
    data = request.get_json() or {}
    username = data.get("username")
    password = data.get("password")
    if username in VALID_USERS and VALID_USERS[username] == password:
        return jsonify({"success": True, "user": {"username": username}})
    return jsonify({"success": False, "message": "Invalid login"}), 401

@app.route("/api/products", methods=["GET"])
def products():
    auth_error = require_api_key()
    if auth_error:
        return auth_error
    return jsonify(PRODUCTS)

@app.route("/api/cart/checkout", methods=["POST"])
def checkout():
    auth_error = require_api_key()
    if auth_error:
        return auth_error
    data = request.get_json() or {}
    cart = data.get("cart", [])
    total = sum(item.get("price", 0) * item.get("quantity", 1) for item in cart)
    return jsonify({"success": True, "total": round(total, 2), "message": "Checkout completed"})

@app.route("/api/recommendations", methods=["POST"])
def recommendations():
    auth_error = require_api_key()
    if auth_error:
        return auth_error
    data = request.get_json() or {}
    cart = data.get("cart", [])
    recommended = recommend_items(MODEL, PRODUCTS, cart)
    return jsonify({"success": True, "recommendations": recommended})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
