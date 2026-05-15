# 💰 Finance Tracker

A full-stack expense tracking application built with a modern TypeScript stack, featuring a React frontend and a Node.js/Express backend with JWT authentication, Prisma, and PostgreSQL.

This project demonstrates clean architecture, separation of concerns, and real-world patterns including JWT-based authentication, layered backend design, and service abstraction on both the frontend and backend.

> 🚀 **Live demo:** _coming soon_

---

## 🚀 Features

### Backend

- JWT authentication (register, login, protected routes)
- Full CRUD operations for expenses
- User-scoped data — each user only sees their own expenses
- PostgreSQL database hosted on Railway
- Prisma ORM for type-safe database access
- Request validation using Zod
- Layered architecture (controllers, services, routes, middleware)

### Frontend

- React + TypeScript (Vite)
- JWT auth flow — register, login, logout
- Create, edit, and delete expenses
- Filter expenses by date range and category
- Search expenses by name
- Category spending summary calculated client-side from filtered expenses
- Real-time UI updates
- Controlled form inputs with validation
- Per-item editing with local component state
- Service layer abstraction for API calls
- Custom hooks for data fetching and state management

---

## 🛠 Tech Stack

**Frontend:** React, TypeScript, Vite  
**Backend:** Node.js, Express, TypeScript  
**Database:** PostgreSQL (Railway)  
**ORM:** Prisma  
**Validation:** Zod  
**Auth:** JSON Web Tokens (JWT), bcrypt

---

## 📌 Highlights

- Full-stack TypeScript application end to end
- JWT authentication with protected routes and user-scoped data
- Clean separation between UI, logic, and data layers
- Service layer on both frontend and backend
- Custom React hook for expense state management
- `useCallback` for stable async dependencies in `useEffect`
- Middleware-based auth — token verification runs before every protected controller
- Category analytics derived client-side from filtered expense data using `reduce`
- `authFetch` wrapper centralizes token attachment, 401 redirects, and HTTP error handling across all service calls
- Proper `try/catch/finally` error handling in hooks — loading state always resolves regardless of fetch outcome

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
- **Prisma Client** → type-safe database layer

### Frontend

- **Components** → UI (Form, List, Item)
- **Hooks** → data fetching and state management
- **Services** → API calls and auth token management
- **App** → orchestration and routing

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
  shared/
```

---

## 🔮 Future Improvements

- Tailwind CSS migration
- Charts and analytics dashboard
- Toast notifications
- Responsive mobile layout
- Deployment (Vercel + Railway)

---

## 👤 Author

Christopher Schretzmann
