# Hospital Management System

A Complete MERN stack Hospital Management application.

## Prerequisites
- Node.js (v18+)
- Local MongoDB installed and running on `localhost:27017` (Alternatively, change the `.env` `MONGO_URI`)

## Step 1: Start the Backend

1. Open a new terminal.
2. Navigate to the backend folder:
   ```bash
   cd backend
   ```
3. Ensure `.env` is setup. It should contain:
   ```env
   MONGO_URI=mongodb://127.0.0.1:27017/hospital-management
   PORT=5000
   JWT_SECRET=supersecretjwtkey_for_hospital_management
   ```
4. Start the server (runs on Port 5000 by default):
   ```bash
   npm run dev
   ```

## Step 2: Start the Frontend

1. Open another terminal window.
2. Navigate to the frontend folder:
   ```bash
   cd frontend
   ```
3. Start the Vite React development server:
   ```bash
   npm run dev
   ```
4. Open the application in your browser at `http://localhost:5173`.

## Step 3: First-time Admin Setup

Because the application is protected by a JWT login screen, you must first create an administrator account using API tools (like Postman), or simply run this curl command to register your initial Admin account:

```bash
curl -X POST http://localhost:5000/api/auth/register \
-H "Content-Type: application/json" \
-d "{\"name\":\"Admin User\", \"email\":\"admin@hospital.com\", \"password\":\"password123\"}"
```

Then, you can use `admin@hospital.com` and `password123` to log into the application dashboard.
