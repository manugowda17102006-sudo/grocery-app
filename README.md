# Grocery App

A simple grocery shopping project with:
- Frontend: React + Vite interface with login, product catalog, cart, and recommendations.
- Backend: Python Flask API with product data, cart checkout, authentication, and an ML recommendation model.
- Dataset: `backend/data/products.csv` with grocery product attributes.
- ML model: `backend/model.py` trains a simple item recommender using product categories and keywords.

## Project Structure

- `backend/` - Flask API, ML model code, dataset, and training script.
- `frontend/` - React UI powered by Vite.

## Setup

### Backend

1. Create a Python environment:
   ```bash
   cd "c:\Users\manug\Desktop\grocery app\backend"
   python -m venv venv
   .\venv\Scripts\activate
   pip install -r requirements.txt
   ```

2. Copy environment variables:
   ```bash
   copy .env.example .env
   ```

3. Open `.env` and set `GROCERY_APP_API_KEY` to your preferred token.
   When calling protected backend endpoints, include the header:
   ```http
   Authorization: Bearer <GROCERY_APP_API_KEY>
   ```

4. Train the recommendation model:
   ```bash
   python train_model.py
   ```

4. Run the API:
   ```bash
   python app.py
   ```

### Frontend

1. Create or edit the frontend env file in `frontend/.env` with:
   ```text
   VITE_API_TOKEN=demo_grocery_key
   ```

2. Install dependencies:
   ```bash
   cd "c:\Users\manug\Desktop\grocery app\frontend"
   npm install
   ```

3. Run the app:
   ```bash
   npm run dev
   ```

4. Open the browser at the address shown by Vite.

## Default Login

Use the sample account to test the app:
- Username: `customer`
- Password: `grocery123`

## Notes

- The backend uses a bearer token API key loaded from `.env` for protected endpoints.
- The ML training script uses the grocery dataset to build a simple recommendation model.
- The frontend calls the backend API to fetch products, authenticate users, and request recommendations.

  vercel link: https://grocery-app-eta-plum.vercel.app/
