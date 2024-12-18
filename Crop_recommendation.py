#import joblib

# Specify the path to your pickle file
#with open(r'C:\Users\840 g3 i7\Farmtrack\Farmtrack1.0\crop-recommendation-dataset.pickle', 'rb') as file:
    #model = joblib.load(file)

#print(model)
import pickle

with open('crop-recommendation-dataset.pickle', 'rb') as file:
    model = pickle.load(file)
print(model)
