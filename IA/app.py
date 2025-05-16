from fastapi import FastAPI
from pydantic import BaseModel
import numpy as np
import joblib
from tensorflow.keras.models import load_model
from tensorflow.keras import losses

# Cargar modelo con custom_objects para mse
modelo = load_model("model.h5", custom_objects={"mse": losses.mse})

# Cargar scaler
scaler = joblib.load("scaler.pkl")

app = FastAPI()

class Entrada(BaseModel):
    peso: float
    genero: int
    tiempo_en_gym: float
    edad: int
    altura: float
    tipo_ejercicio: int
    nombre_ejercicio: int

@app.post("/predecir")
def predecir(data: Entrada):
    # Extraer las 6 características que el scaler y modelo esperan
    entrada = np.array([[data.peso, data.genero, data.tiempo_en_gym, data.edad, data.altura, data.tipo_ejercicio]])

    # Escalar entrada
    entrada_escalada = scaler.transform(entrada)

    # Predecir series y repeticiones
    prediccion = modelo.predict(entrada_escalada)[0]

    series = int(round(prediccion[0]))
    repeticiones = int(round(prediccion[1]))

    return {
        "series": series,
        "repeticiones": repeticiones
    }

print(scaler.n_features_in_)
