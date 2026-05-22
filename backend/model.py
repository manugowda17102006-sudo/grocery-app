import csv
import os
import pickle

MODEL_PATH = os.path.join(os.path.dirname(__file__), "ml_model.pkl")
DATA_PATH = os.path.join(os.path.dirname(__file__), "data", "products.csv")

CATEGORY_WEIGHT = 2
BRAND_WEIGHT = 1


def load_products():
    products = []
    with open(DATA_PATH, newline='', encoding='utf-8') as fp:
        reader = csv.DictReader(fp)
        for row in reader:
            products.append({
                "id": int(row["id"]),
                "name": row["name"],
                "category": row["category"],
                "brand": row["brand"],
                "price": float(row["price"]),
                "description": row["description"],
                "image_url": row.get("image_url", ""),
            })
    return products


def train_model():
    products = load_products()
    bundle = {
        "products": products,
    }
    with open(MODEL_PATH, "wb") as fp:
        pickle.dump(bundle, fp)
    return bundle


def load_model():
    if os.path.exists(MODEL_PATH):
        with open(MODEL_PATH, "rb") as fp:
            return pickle.load(fp)
    return train_model()


def score_product(candidate, cart_item):
    score = 0
    if candidate["category"] == cart_item["category"]:
        score += CATEGORY_WEIGHT
    if candidate["brand"] == cart_item["brand"]:
        score += BRAND_WEIGHT
    return score


def recommend_items(model_bundle, products, cart_items):
    if not cart_items:
        return product_fallback(products)

    selected_ids = {item["id"] for item in cart_items}
    candidate_scores = {}

    for cart_item in cart_items:
        for candidate in model_bundle["products"]:
            if candidate["id"] in selected_ids:
                continue
            candidate_scores[candidate["id"]] = candidate_scores.get(candidate["id"], 0) + score_product(candidate, cart_item)

    if not candidate_scores:
        return product_fallback(products)

    ranked_ids = sorted(candidate_scores, key=lambda pid: (-candidate_scores[pid], pid))[:5]
    return [product for product in products if product["id"] in ranked_ids]


def product_fallback(products):
    return products[:5]
