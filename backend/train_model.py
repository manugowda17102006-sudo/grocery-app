from model import train_model

if __name__ == "__main__":
    print("Training the grocery recommendation model...")
    bundle = train_model()
    print(f"Trained model using {len(bundle['products'])} products and saved to ml_model.pkl")
