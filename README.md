# 💰 Finance Tracker API

A RESTful backend API for tracking personal expenses, built with **Node.js, Express, Prisma, and PostgreSQL**.

This project demonstrates building a full backend service with database integration, validation, and clean architecture using controllers and services.

---

## 🚀 Features

- Create, read, update, and delete expenses (CRUD)
- PostgreSQL database (hosted on Railway)
- Prisma ORM for database access
- Input validation using Zod
- Structured backend (controllers, services, routes)

---

## 🛠 Tech Stack

- Node.js
- Express
- TypeScript
- Prisma ORM
- PostgreSQL (Railway)
- Zod

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

### Create Expense

```
POST /expenses
```

Body:

```json
{
	"name": "coffee",
	"amount": 5,
	"category": "food"
}
```

---

### Get All Expenses

```
GET /expenses
```

---

### Get Expense by ID

```
GET /expenses/:id
```

---

### Update Expense

```
PUT /expenses/:id
```

---

### Delete Expense

```
DELETE /expenses/:id
```

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

- Filtering and sorting (e.g. by category, amount)
- Pagination
- Authentication (JWT)
- Frontend (React)
- Deployment

---

## 👤 Author

Christopher Schretzmann
