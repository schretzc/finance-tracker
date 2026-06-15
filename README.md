# 💰 Finance Tracker

A full-stack expense tracking application built with a modern TypeScript stack, featuring a React frontend and a Node.js/Express backend with JWT authentication, Prisma, and PostgreSQL.

This project demonstrates clean architecture, separation of concerns, and real-world patterns including JWT-based authentication, layered backend design, and service abstraction on both the frontend and backend.

> 🚀 **Live demo:** [finance-tracker-olive-zeta.vercel.app](https://finance-tracker-olive-zeta.vercel.app)

---

## 🚀 Features

### Backend

- JWT authentication (register, login, protected routes)
- Full CRUD operations for expenses
- User-scoped data — each user only sees their own expenses
- PostgreSQL database hosted on Railway
- Prisma ORM with pg driver adapter (Prisma v7)
- Request validation using Zod
- Email normalization (lowercased on register and login)
- Layered architecture (controllers, services, routes, middleware)

### Frontend

- React + TypeScript (Vite)
- JWT auth flow — register, login, logout
- Create, edit, and delete expenses with toast notifications
- Filter expenses by date range and category
- Search expenses by name
- Category spending summary calculated client-side from filtered expenses
- Recharts integration — category pie chart and monthly spending bar chart
- Real-time UI updates with silent background refresh (no loading flash on mutations)
- Controlled form inputs with validation
- Per-item editing with local component state
- Service layer abstraction for API calls
- Custom hooks for data fetching and state management

---

## 🛠 Tech Stack

**Frontend:** React, TypeScript, Vite, Recharts, react-toastify  
**Backend:** Node.js, Express, TypeScript  
**Database:** PostgreSQL (Railway)  
**ORM:** Prisma v7 (pg driver adapter)  
**Validation:** Zod  
**Auth:** JSON Web Tokens (JWT), bcrypt  
**Deployment:** Vercel (frontend), Railway (backend + database)

---

## 📌 Highlights

- Full-stack TypeScript application end to end
- JWT authentication with protected routes and user-scoped data
- Clean separation between UI, logic, and data layers
- Service layer on both frontend and backend
- Custom React hook for expense state management
- `useCallback` for stable async dependencies in `useEffect`
- Separate `loading` and refresh states — initial load shows a spinner, CRUD mutations refresh silently without unmounting the UI
- Middleware-based auth — token verification runs before every protected controller
- Category analytics and monthly spending derived client-side from filtered expense data using `reduce`
- `authFetch` wrapper centralizes token attachment, 401 redirects, and HTTP error handling across all service calls
- Proper `try/catch/finally` error handling in hooks — loading state always resolves regardless of fetch outcome
- Toast notifications for all user actions (add, update, delete)
- Prisma v7 driver adapter pattern for production PostgreSQL on Railway

---

## 🧱 Architecture

### Backend

```
request → auth middleware → controller → service → Prisma → database
```

- **Routes** → define API endpoints
- **Controllers** → handle HTTP requests/responses
- **Services** → business logic + database operations
- **Middleware** → JWT verification for protected routes
- **Prisma Client** → type-safe database layer with pg driver adapter

### Frontend

```
component → hook → service → backend API
```

- **Components** → UI rendering only, receive data as props
- **Hooks** → data fetching, state management, CRUD operations
- **Services** → raw API calls, no state
- **App** → orchestration, filtering, chart data derivation

---

## 📦 Installation

```bash
git clone https://github.com/schretzc/finance-tracker.git
cd finance-tracker
```

### Backend

```bash
cd backend
npm install
```

### Frontend

```bash
cd frontend
npm install
```

---

## ⚙️ Environment Variables

Create a `.env` file inside `backend/`:

```env
DATABASE_URL="your_postgresql_connection_string"
JWT_SECRET="your_jwt_secret"
PORT=3000
```

Create a `.env` file inside `frontend/`:

```env
VITE_API_URL=http://localhost:3000
```

---

## 🗄 Database Setup

```bash
cd backend
npx prisma generate
npx prisma migrate dev
```

---

## ▶️ Running the App

### Backend

```bash
cd backend
npm run dev
```

Runs on `http://localhost:3000`

### Frontend

```bash
cd frontend
npm run dev
```

---

## 📡 API Endpoints

### Auth

| Method | Endpoint       | Description       |
| ------ | -------------- | ----------------- |
| POST   | /auth/register | Register new user |
| POST   | /auth/login    | Login + get token |

### Expenses (protected — requires Bearer token)

| Method | Endpoint      | Description       |
| ------ | ------------- | ----------------- |
| GET    | /expenses     | Get all expenses  |
| GET    | /expenses/:id | Get expense by ID |
| POST   | /expenses     | Create expense    |
| PATCH  | /expenses/:id | Update expense    |
| DELETE | /expenses/:id | Delete expense    |

---

## 🧠 Project Structure

```
finance-tracker/
  backend/
    src/
      controllers/
      services/
      routes/
      middleware/
    prisma/
  frontend/
    src/
      components/
      hooks/
      services/
      types/
      constants/
```

---

## 👤 Author

Christopher Schretzmann
