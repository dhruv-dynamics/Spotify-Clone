# Spotify Clone

A full-stack Spotify clone web application built with React, Redux, Tailwind CSS, Express, and MongoDB.

---

## Tech Stack

- **Frontend:** React, Redux, React Router, Tailwind CSS, Vite
- **Backend:** Node.js, Express.js, MongoDB, Mongoose, JWT

---

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MongoDB connection URI

---

### Installation & Setup

#### 1. Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the `backend` folder:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_uri
   JWT_SECRET=your_jwt_secret_key
   ```

4. Start the backend server:
   ```bash
   npm run dev
   ```
   The backend API will run on **http://localhost:5000**.

---

#### 2. Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the frontend application:
   ```bash
   npm run dev
   ```
   The frontend app will run on **http://localhost:3000**.

---

## Ports Summary

| Service  | Port | URL                   |
|----------|------|-----------------------|
| Frontend | 3000 | http://localhost:3000 |
| Backend  | 5000 | http://localhost:5000 |
