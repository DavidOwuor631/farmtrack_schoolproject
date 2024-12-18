from flask import Flask, request, jsonify
from joblib import load

import numpy as np

app = Flask(__name__)

# Load the model
model = load('crop_type_recommendation.joblib')

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json  # Expecting JSON input
    try:
        # Example: Convert input to NumPy array (adjust keys based on your model's requirements)
        input_features = np.array([data['feature1'], data['feature2'], data['feature3']]).reshape(1, -1)
        prediction = model.predict(input_features)
        return jsonify({'prediction': prediction.tolist()})
    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(port=5000, debug=True)
