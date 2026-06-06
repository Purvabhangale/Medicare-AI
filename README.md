# 🩺 MediCare AI — Full Stack Medical Assistant

AI-powered Medical Assistant built with **React** (frontend) and **Spring Boot** (backend), powered by **Google Gemini AI**.

---

## 📁 Project Structure

```
medicare-ai/
├── frontend/          ← React App (CRA)
└── backend/           ← Spring Boot API
```

---

## 🚀 Quick Start

### Step 1 — Get Gemini API Key
1. Visit https://aistudio.google.com/app/apikey
2. Sign in with your Google account
3. Click **"Create API Key"** and copy it

---

### Step 2 — Frontend Setup

```bash
cd frontend
npm install
```

Open `src/config.js` and replace:
```js
export const GEMINI_API_KEY = 'YOUR_GEMINI_API_KEY_HERE';
```

```bash
npm start
# Runs at http://localhost:3000
```

---

### Step 3 — Backend Setup

Open `src/main/resources/application.properties` and replace:
```properties
gemini.api.key=YOUR_GEMINI_API_KEY_HERE
```

```bash
cd backend
./mvnw spring-boot:run
# Runs at http://localhost:8080
# H2 Console: http://localhost:8080/h2-console
```

---

## 🌐 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/health | Health check |
| GET | /api/medicines | All medicines |
| GET | /api/medicines/{id} | Medicine by ID |
| GET | /api/medicines/search?q= | Search medicines |
| GET | /api/medicines/otc | OTC medicines only |
| GET | /api/medicines/prescription | Rx-only medicines |
| POST | /api/chat | AI chat message |
| POST | /api/prescription/generate | AI health assessment |

---

## 🔧 Tech Stack

**Frontend**
- React 18 + React Router 6
- Google Gemini 2.0 Flash API (direct)
- Web Speech API (voice input)
- Axios

**Backend**
- Spring Boot 3.2
- Spring Data JPA
- H2 (dev) / MySQL (prod)
- Google Gemini API (via RestTemplate)
- Lombok

---

## 🗄️ Switch to MySQL (Production)

In `application.properties`, comment out H2 and uncomment MySQL:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/medicare_db?useSSL=false&serverTimezone=UTC
spring.datasource.username=root
spring.datasource.password=yourpassword
```

Create the database:
```sql
CREATE DATABASE medicare_db;
```

---

## ⚠️ Disclaimer

This application is for **educational and informational purposes only**.
Always consult a licensed medical professional before taking any medication.
