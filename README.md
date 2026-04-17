# 💰 Finance Tracker

A backend service for tracking personal expenses, built with Node.js, Express, Prisma, and PostgreSQL.

It uses a layered architecture (controllers, services, routes) with validation to ensure scalability and maintainability.

This project demonstrates building a full backend service with database integration, validation, and clean architecture using controllers and services.

---

## 🚀 Features

- Full CRUD operations for expenses
- Category-based expense tracking
- PostgreSQL database hosted on Railway
- Prisma ORM for type-safe database access
- Request validation using Zod
- Clean architecture (controllers, services, routes)

---

## 🛠 Tech Stack

**Backend:** Node.js, Express, TypeScript  
**Database:** PostgreSQL (Railway)  
**ORM:** Prisma
**Validation:** Zod

---

## 📌 Highlights

- Built with TypeScript for type safety
- Structured for scalability and separation of concerns
- Ready for frontend integration (REST API design)

---

## 🧱 Architecture

The project follows a layered architecture:

- Routes → define API endpoints
- Controllers → handle HTTP requests/responses
- Services → contain business logic and database operations
- Prisma Client → handles type-safe database queries

---

## 📦 Installation

Clone the repository:

```bash
git clone https://github.com/schretzc/finance-tracker.git
cd finance-tracker
```

Install dependencies:

```bash
npm install
```

---

## ⚙️ Environment Variables

Create a `.env` file in the root:

```env
DATABASE_URL="your_postgresql_connection_string"
```

---

## 🗄 Database Setup

Generate Prisma client:

```bash
npx prisma generate
```

Push schema to database:

```bash
npx prisma db push
```

---

## ▶️ Running the Server

```bash
npm run dev
```

Server runs at:

```
http://localhost:3000
```

---

## 📡 API Endpoints

### Expenses

| Method | Endpoint      | Description           |
| ------ | ------------- | --------------------- |
| POST   | /expenses     | Create a new expense  |
| GET    | /expenses     | Retrieve all expenses |
| GET    | /expenses/:id | Get expense by ID     |
| PUT    | /expenses/:id | Update expense        |
| DELETE | /expenses/:id | Delete expense        |

---

## 🧠 Project Structure

```
src/
  controllers/
  services/
  routes/
  prisma.ts
```

- Controllers handle HTTP requests and responses
- Services contain business logic and database operations
- Routes define API endpoints

---

## 📌 Future Improvements

- Filtering and sorting by category, amount, and date
- Pagination for large datasets
- User authentication (JWT-based)
- Frontend dashboard (React)
- Production deployment (Render/Vercel/Railway)

---

## 👤 Author

Christopher Schretzmann
