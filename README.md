# 💰 Finance Tracker

A full-stack expense tracking application built with a modern TypeScript stack, featuring a React frontend and a Node.js backend with Prisma and PostgreSQL.

This project demonstrates clean architecture, separation of concerns, and real-world frontend patterns such as component-based design, local state management, and service abstraction.

---

## 🚀 Features

### Backend

- Full CRUD operations for expenses
- PostgreSQL database hosted on Railway
- Prisma ORM for type-safe database access
- Request validation using Zod
- Layered architecture (controllers, services, routes)

### Frontend

- React + TypeScript (Vite)
- Create, edit, and delete expenses
- Real-time UI updates
- Controlled form inputs with validation
- Per-item editing with local component state
- Service layer abstraction for API calls

---

## 🛠 Tech Stack

**Frontend:** React, TypeScript, Vite  
**Backend:** Node.js, Express, TypeScript  
**Database:** PostgreSQL (Railway)  
**ORM:** Prisma  
**Validation:** Zod

---

## 📌 Highlights

- Full-stack TypeScript application
- Clean separation between UI, logic, and data layers
- Uses a service layer on both frontend and backend
- Demonstrates proper React state management patterns
- Refactored from global edit state → per-component local state

---

## 🧱 Architecture

### Backend

- Routes → define API endpoints
- Controllers → handle HTTP requests/responses
- Services → business logic + database operations
- Prisma Client → database layer

### Frontend

- Components → UI (Form, List, Item)
- Services → API calls (fetch abstraction)
- App → state management + orchestration

---

## 📦 Installation

```bash
git clone https://github.com/schretzc/finance-tracker.git
cd finance-tracker
npm install
```

---

## ⚙️ Environment Variables

Create a `.env` file:

```env
DATABASE_URL="your_postgresql_connection_string"
```

---

## 🗄 Database Setup

```bash
npx prisma generate
npx prisma db push
```

---

## ▶️ Running the App

### Backend

```bash
npm run dev
```

Runs on:

```
http://localhost:3000
```

---

### Frontend

```bash
cd client
npm run dev
```

---

## 📡 API Endpoints

| Method | Endpoint      | Description      |
| ------ | ------------- | ---------------- |
| POST   | /expenses     | Create expense   |
| GET    | /expenses     | Get all expenses |
| GET    | /expenses/:id | Get by ID        |
| PATCH  | /expenses/:id | Update expense   |
| DELETE | /expenses/:id | Delete expense   |

---

## 🧠 Project Structure

```
backend/src/
  controllers/
  services/
  routes/

client/src/
  components/
  services/
  types/
```

---

## 📌 Recent Updates

- Refactored frontend to use service layer for API calls
- Moved expense type definitions to shared types file
- Improved component structure (Form / List / Item)
- Replaced global edit state with local component state
- Added form validation and proper submit handling
- Improved UX with disabled invalid submissions

---

## 🔮 Future Improvements

- Search and filtering (by name/category)
- UI styling (Tailwind or CSS modules)
- Toast notifications (success/error feedback)
- Authentication (JWT)
- Charts / analytics dashboard

---

## 👤 Author

Christopher Schretzmann
