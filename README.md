# FasalSathi (फसल साथी) — Hackathon Prototype

**AI-Powered Crop Yield Prediction & Optimization**

> This repository is a hackathon/demo implementation. It is **not an official Government of India website or service** and does not establish an affiliation with the Ministry of Agriculture and Farmers Welfare, NIC, or any government department. Replace demo branding/assets/contact details with officially authorized material before any public deployment.

## Stack

- Frontend: React 18 + Vite + React Router + Tailwind CSS + Framer Motion + Axios + React Hot Toast + i18next
- Backend: FastAPI + JWT + Pydantic
- OTP: Development/mock OTP flow. The backend returns a `dev_otp` only when `DEV_OTP=true`.
- Prediction: Demo deterministic model endpoint. Replace with your trained ML model before production.

## Run

### Backend

```bash
cd backend
python -m venv .venv
# Windows:
.venv\Scripts\activate
# macOS/Linux:
source .venv/bin/activate

pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend defaults to `http://localhost:5173`; API defaults to `http://localhost:8000`.

### Demo OTP

Use `123456` during development. A real SMS/OTP provider must replace this in production.

## Production checklist

- Use a real PostgreSQL database and migrations.
- Store JWT secrets in environment variables.
- Use HTTPS.
- Integrate a compliant OTP/SMS provider.
- Never implement or store Aadhaar credentials yourself; use an authorized identity provider if applicable.
- Replace demo statistics, testimonials, government logos, addresses, phone numbers and email addresses with verified/authorized information.
- Replace the demo prediction function with a validated agricultural ML model.
- Add rate limiting, CSRF protections where applicable, audit logging, consent/privacy flows and security testing.
