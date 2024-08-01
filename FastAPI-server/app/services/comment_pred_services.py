import joblib
from app.utils.preprocess import preprocess_text

# Load the model and vectorizer
model = joblib.load('data/toxic_comment_model.pkl')
vectorizer = joblib.load('data/vectorizer.pkl')

def make_prediction(comment: str):
    processed_text = preprocess_text(comment)
    features = vectorizer.transform([processed_text])
    prediction = model.predict(features)
    return prediction[0]