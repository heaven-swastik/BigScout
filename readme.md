# BizScout 🏙️
### AI-Powered Business Location Intelligence Platform

> *"What if every entrepreneur had access to the same location data that Starbucks uses to choose their sites — for free?"*

BizScout uses OpenStreetMap data, a 7-phase analysis algorithm (CASA), and a hybrid ML + rule-based engine to help small business owners make smart, data-driven location decisions.

---

## 🚀 Quick Start

### Backend (Python / FastAPI)
```bash
cd backend
python -m venv venv
source venv/bin/activate      # Windows: venv\Scripts\activate
pip install -r requirements.txt
python main.py
```

API runs at **http://localhost:8000**

### Frontend (React / Vite)
```bash
cd frontend
npm install
npm run dev
```

Dashboard runs at **http://localhost:5173**

---

## 🧠 How It Works — The CASA Algorithm

BizScout runs every location through a **7-phase analysis pipeline**:

| Phase | Name | What It Does |
|---|---|---|
| 1 | Zone Identification | Classifies the area (commercial, residential, market, etc.) |
| 2 | OSM Deep Scan | Pulls real competitor & POI data from OpenStreetMap |
| 3 | Feature Engineering | Calculates density, diversity, and foot traffic signals |
| 4 | ML Prediction | RandomForest model scores the location (0–100) |
| 5 | Rule-Based Consulting | Applies 9+ economic and business rules |
| 6 | Gap Analysis | Identifies underserved niches nearby |
| 7 | Financial Projections | Estimates break-even, ROI, and revenue ranges |

---

## 📁 Project Structure

```
bizscout/
├── backend/
│   ├── main.py                  # FastAPI app & API endpoints
│   ├── deep_researcher.py       # OSM queries & competitor scraping
│   ├── ml_trainer.py            # RandomForest model training
│   ├── training_data_generator.py  # Synthetic training data
│   ├── geocoding_service.py     # Location resolution
│   ├── logger.py                # Logging utility
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx              # Root component
│   │   ├── components/
│   │   │   ├── HeroSection      # Landing hero with 3D background
│   │   │   ├── Navbar           # Top navigation
│   │   │   ├── LocationSearch   # Map-based location picker
│   │   │   ├── BusinessSelector # 20 business type chooser
│   │   │   ├── BudgetInput      # Capital tier selector
│   │   │   ├── Dashboard        # Results & score display
│   │   │   ├── LiveAnalysis     # Real-time analysis stream
│   │   │   ├── FloatingLogs     # Live backend log overlay
│   │   │   └── AnimatedBackground # 3D particle canvas
│   │   └── utils/
│   │       ├── api.js           # Axios API client
│   │       └── store.js         # Zustand global state
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
```

---

## ⚙️ Environment Variables

Create a `.env` file in `backend/`:

```env
HOST=0.0.0.0
PORT=8000
```

No API keys required — BizScout runs entirely on free, open data.

---

## 📊 Tech Stack

| Layer | Technology |
|---|---|
| Backend | Python, FastAPI, Uvicorn |
| ML | scikit-learn (RandomForest) |
| Data | OpenStreetMap (via Overpass API) |
| Frontend | React 18, Vite, Framer Motion |
| 3D | Three.js, React Three Fiber |
| State | Zustand |
| HTTP | Axios |

---

## 🎯 Supported Business Types

Tea stall, coffee shop, restaurant, grocery store, pharmacy, gym, salon, clothing store, electronics shop, bakery, laundry, tutoring centre, medical clinic, stationery shop, mobile repair, juice bar, fast food, bookstore, pet store, and flower shop.

---

## 💰 Capital Tiers

| Tier | Range |
|---|---|
| Budget | ₹50K – ₹2L |
| Mid-range | ₹2L – ₹10L |
| Premium | ₹10L+ |

---

## 🔑 Key Features

- **0 API keys needed** — fully open-source data pipeline
- **Explainable AI** — tells you *why* a location scores the way it does
- **Gap analysis** — suggests what business to open if yours isn't ideal there
- **Financial reality check** — break-even timeline, expected ROI, monthly projections
- **Works for any city** — anywhere covered by OpenStreetMap

---

## 📄 License

MIT License — free to use, modify, and distribute.