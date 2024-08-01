import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, f1_score
import joblib
from app.utils.preprocess import preprocess_text

def train_and_save_model():
    # Load data
    data = pd.read_csv('data/train.csv')
    data['cleaned_comment'] = data['comment_text'].apply(preprocess_text)

    # Feature Extraction
    vectorizer = TfidfVectorizer(max_features=5000)
    X = vectorizer.fit_transform(data['cleaned_comment'])
    y = data['toxic']

    # Model Training
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    model = LogisticRegression()
    model.fit(X_train, y_train)

    # Model Evaluation
    y_pred = model.predict(X_test)
    accuracy = accuracy_score(y_test, y_pred)
    f1 = f1_score(y_test, y_pred)
    print(f'Accuracy: {accuracy}, F1 Score: {f1}')

    # Save the Model and Vectorizer
    joblib.dump(model, 'data/toxic_comment_model.pkl')
    joblib.dump(vectorizer, 'data/vectorizer.pkl')

if __name__ == "__main__":
    train_and_save_model()
