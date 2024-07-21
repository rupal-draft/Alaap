from fastapi import FastAPI, Query
from pydantic import BaseModel
import joblib
import re
import string
from nltk.corpus import stopwords
from nltk.stem.wordnet import WordNetLemmatizer
import nltk
nltk.download('stopwords')
nltk.download('wordnet')
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os

load_dotenv()

app = FastAPI()

cors_origins = os.getenv('SITE_URL', '*')

app.add_middleware(
    CORSMiddleware,
    allow_origins=[cors_origins],
    expose_headers=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load the model and vectorizer
model = joblib.load('toxic_comment_model.pkl')
vectorizer = joblib.load('vectorizer.pkl')

class Comment(BaseModel):
    text: str

def preprocess_text(text):
    text = text.lower()
    text = re.sub(f'[{string.punctuation}]', '', text)
    words = text.split()
    stop_words = set(stopwords.words('english'))
    words = [word for word in words if word not in stop_words]
    lemmatizer = WordNetLemmatizer()
    words = [lemmatizer.lemmatize(word) for word in words]
    return ' '.join(words)

@app.get('/')
async def root():
    return {"message": "Welcome to the Toxic Comment Classification API"}

@app.get('/predict')
async def predict(comment: str = Query(..., title="Comment Text")):
    processed_text = preprocess_text(comment)
    features = vectorizer.transform([processed_text])
    prediction = model.predict(features)
    return {'toxic': bool(prediction[0])}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)