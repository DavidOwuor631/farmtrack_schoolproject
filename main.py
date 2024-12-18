from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from joblib import load
import numpy as np
import os
from pydantic import BaseModel

# Custom loader to handle deserialization errors
def custom_load(file_path):
    try:
        return load(file_path)
    except AttributeError as e:
        if "_passthrough_scorer" in str(e):
            import sklearn.metrics._scorer
            sklearn.metrics._scorer._passthrough_scorer = None
            return load(file_path)
        raise

# Check and load model
model_path = "C:/Users/840 g3 i7/Videos/Farmtrack/crop_type_recommendation.joblib"
if not os.path.exists(model_path):
    raise FileNotFoundError(f"Model file not found at {model_path}")
model = custom_load(model_path)

# Initialize FastAPI
app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4200"],  # Allows all origins (you can restrict this to a specific origin for security)
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods (GET, POST, etc.)
    allow_headers=["*"],  # Allows all headers
)

# Input schema
class CropRecommendationRequest(BaseModel):
    nitrogen: float
    phosphorus: float
    potassium: float
    temperature: float
    humidity: float
    ph: float
    rainfall: float

labels=[
"rice",           
"maize",         
"jute",          
"cotton",        
"papaya",         
"orange",         
"apple",          
"muskmelon",     
"watermelon" ,    
"grapes",         
"mango" ,         
"banana",         
"pomegranate",   
"lentil" ,        
"blackgram" ,     
"mungbean",       
"mothbeans",      
"pigeonpeas",    
"kidneybeans" ,   
"chickpea",       
"coffee ",        
"coconut"       
]


# Endpoint for crop recommendation
@app.post("/recommend-crop/")
def recommend_crop(request: CropRecommendationRequest):
    try:
        # Prepare input for the model
        features = np.array([[request.nitrogen, request.phosphorus, request.potassium,
                              request.temperature, request.humidity, request.ph, request.rainfall]])
        
        # Make prediction
        crop_prediction = model.predict(features)[0]
        
        crop_prediction = crop_prediction.item()
        actual_prediction_label=labels[crop_prediction] 
        
        return {"recommended_crop": actual_prediction_label}
    except ValueError as e:
        raise HTTPException(status_code=400, detail=f"Invalid input: {str(e)}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error making prediction: {str(e)}")
