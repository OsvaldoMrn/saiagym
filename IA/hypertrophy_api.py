from fastapi import FastAPI
from pydantic import BaseModel
from typing import Optional
import pandas as pd
import joblib

app = FastAPI()

# Carga del modelo entrenado
model = joblib.load(r"C:\moviles\saiagym\IA\hypertrophy_model.pkl")

# Modelo de entrada con valores por defecto opcionales
class InputData(BaseModel):
    weight: float
    reps: int

    id: Optional[int] = 1
    exercise_type: Optional[str] = "compuesto"
    rpe: Optional[float] = 7.5
    experience_level: Optional[str] = "principiante"
    estimated_1rm: Optional[float] = None
    next_weight: Optional[float] = 0
    next_reps: Optional[int] = 0
    next_rpe: Optional[float] = 0

@app.post("/predict")
def predict(data: InputData):
    input_dict = data.dict()

    # Calcular estimated_1rm si no se envió
    if input_dict["estimated_1rm"] is None:
        input_dict["estimated_1rm"] = input_dict["weight"] * (1 + 0.0333 * input_dict["reps"])

    # Crear DataFrame
    df = pd.DataFrame([input_dict])

    # One-hot encoding manual para exercise_type
    exercise_types = ['compuesto', 'pull', 'push']
    for et in exercise_types:
        df[f"exercise_type_{et}"] = (df['exercise_type'] == et).astype(int)
    df.drop('exercise_type', axis=1, inplace=True)

    # One-hot encoding manual para experience_level
    experience_levels = ['principiante', 'intermedio', 'advanced']
    for lvl in experience_levels:
        df[f"experience_level_{lvl}"] = (df['experience_level'] == lvl).astype(int)
    df.drop('experience_level', axis=1, inplace=True)

    # Asegurar que todas las columnas requeridas estén presentes
    columns_expected = model.feature_names_in_
    for col in columns_expected:
        if col not in df.columns:
            df[col] = 0  # Rellenar faltantes con 0

    df = df[columns_expected]  # Reordenar columnas

    # Realizar predicción
    prediction = model.predict(df)

    # Preparar respuesta
    response = {
        "input": {
            "weight": input_dict["weight"],
            "reps": input_dict["reps"],
            "estimated_1rm": input_dict["estimated_1rm"],
        },
        "prediction": prediction.tolist()
    }

    print("Enviando respuesta:", response)  # Esto imprimirá la respuesta en la consola
    return response
