from datetime import datetime, timedelta, timezone
from typing import Dict
import os
from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from jose import jwt, JWTError
from pydantic import BaseModel, Field

SECRET_KEY = os.getenv("FASALSATHI_JWT_SECRET", "change-this-secret-in-production")
ALGORITHM = "HS256"
DEV_OTP = os.getenv("DEV_OTP", "true").lower() == "true"
OTP_VALUE = os.getenv("DEMO_OTP", "123456")

app = FastAPI(title="FasalSathi Demo API", version="1.0.0")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

users: Dict[str, dict] = {}
otps: Dict[str, dict] = {}
security = HTTPBearer()

class OTPRequest(BaseModel):
    phone: str = Field(min_length=10, max_length=10)
    mode: str = "login"
    name: str = ""

class OTPVerify(BaseModel):
    phone: str
    otp: str
    mode: str = "login"
    name: str = ""

class PredictionInput(BaseModel):
    crop: str
    location: str
    area: float = 2
    rainfall: float = 1200
    temperature: float = 28
    humidity: float = 75
    irrigation: float = 50
    fertilizer: float = 70
    soil: str = "Loamy"
    sowing_date: str = ""

def make_token(phone: str):
    payload = {"sub": phone, "exp": datetime.now(timezone.utc) + timedelta(hours=8)}
    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)

def current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    try:
        payload = jwt.decode(credentials.credentials, SECRET_KEY, algorithms=[ALGORITHM])
        phone = payload.get("sub")
        if not phone or phone not in users:
            raise HTTPException(status_code=401, detail="Invalid session")
        return users[phone]
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid or expired token")

@app.get("/api/health")
def health():
    return {"status": "ok", "service": "FasalSathi demo API"}

@app.post("/api/auth/request-otp")
def request_otp(body: OTPRequest):
    if not body.phone.isdigit() or len(body.phone) != 10:
        raise HTTPException(status_code=422, detail="Invalid phone number")
    if body.mode == "signup" and not body.name:
        # Demo frontend can add a name later; keep endpoint simple.
        pass
    otps[body.phone] = {"otp": OTP_VALUE, "expires": datetime.now(timezone.utc) + timedelta(minutes=5), "mode": body.mode, "name": body.name}
    response = {"message": "OTP generated for development build", "expires_in": 300}
    if DEV_OTP:
        response["dev_otp"] = OTP_VALUE
    return response

@app.post("/api/auth/verify-otp")
def verify_otp(body: OTPVerify):
    item = otps.get(body.phone)
    if not item or datetime.now(timezone.utc) > item["expires"]:
        raise HTTPException(status_code=400, detail="OTP expired or not requested")
    if body.otp != item["otp"]:
        raise HTTPException(status_code=400, detail="Invalid OTP")
    name = body.name or item.get("name") or users.get(body.phone, {}).get("name") or "Farmer"
    users[body.phone] = {"phone": body.phone, "name": name, "created_at": datetime.now(timezone.utc).isoformat()}
    del otps[body.phone]
    return {"access_token": make_token(body.phone), "token_type": "bearer", "user": users[body.phone]}

@app.get("/api/auth/me")
def me(user=Depends(current_user)):
    return user

@app.post("/api/prediction/predict")
def predict(body: PredictionInput, user=Depends(current_user)):
    # Demo model only. Replace with a trained/scaled agricultural ML model.
    rainfall = float(body.rainfall)
    temp = float(body.temperature)
    humidity = float(body.humidity)
    irrigation = float(body.irrigation)
    fertilizer = float(body.fertilizer)

    base = 4.35
    rainfall_score = max(-0.45, min(0.45, (rainfall - 1000) / 1000))
    temp_score = max(-0.35, min(0.35, 0.35 - abs(temp - 27) / 25))
    humidity_score = max(-0.25, min(0.25, 0.25 - abs(humidity - 72) / 100))
    irrigation_score = (irrigation - 60) / 200
    fertilizer_score = (fertilizer - 70) / 300

    predicted = round(max(1.5, min(7.5, base + rainfall_score + temp_score + humidity_score + irrigation_score + fertilizer_score)), 2)

    factors = [
        {"name": "Rainfall", "status": "Favorable" if 800 <= rainfall <= 1500 else "Needs Attention"},
        {"name": "Temperature", "status": "Favorable" if 20 <= temp <= 32 else "Needs Attention"},
        {"name": "Humidity", "status": "Favorable" if 55 <= humidity <= 85 else "Needs Attention"},
        {"name": "Irrigation", "status": "Favorable" if irrigation >= 65 else "Below Optimal"},
        {"name": "Fertilizer", "status": "Favorable" if fertilizer >= 75 else "Slightly Low"},
        {"name": "Soil", "status": "Favorable" if body.soil.lower() in ["loamy", "black soil"] else "Needs Attention"},
    ]

    improvement = 0
    recs = []
    if irrigation < 65:
        improvement += 0.22
        recs.append("Review irrigation scheduling and maintain adequate soil moisture.")
    if fertilizer < 75:
        improvement += 0.14
        recs.append("Review nutrient management using soil-test recommendations.")
    if not 800 <= rainfall <= 1500:
        recs.append("Monitor rainfall and use irrigation planning to manage water stress.")
    recs.append("Monitor pest and disease risk regularly.")
    optimized = round(min(7.8, predicted + improvement), 2)
    confidence = 84

    return {
        "predicted_yield": predicted,
        "optimized_yield": optimized,
        "confidence": confidence,
        "factors": factors,
        "recommendations": recs,
        "disclaimer": "Potential yield is a model scenario, not a guaranteed outcome."
    }
