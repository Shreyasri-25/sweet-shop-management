# 🍬 Sweet Shop Management System (MERN Stack)

A full-stack Sweet Shop Management System built using the **MERN Stack** with role-based access for **Admin** and **Users**.

---

## 🚀 Features

### 👤 Authentication
- User registration & login
- JWT-based authentication
- Role-based authorization (Admin / User)

### 🧑‍💼 Admin Features
- Add, update, delete sweets
- Restock sweets
- View all orders
- Dashboard with:
  - Total income
  - Today’s income
  - Orders today
  - Sweet-wise sales

### 🧑 User Features
- View available sweets
- Buy sweets with quantity selection
- View order history
- Secure access to personal data

---

## 🛠 Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- Axios
- Framer Motion

### Backend
- Node.js
- Express.js
- MongoDB (Atlas)
- Mongoose
- JWT Authentication

---

## 📁 Project Structure
```
sweet-shop-management/
├── backend/
│ ├── src/
│ │ ├── controllers/
│ │ ├── models/
│ │ ├── routes/
│ │ └── middleware/
│ └── server.js
│
├── frontend/
│ ├── src/
│ │ ├── pages/
│ │ ├── components/
│ │ ├── services/
│ │ └── layouts/
│ └── main.jsx
│
└── README.md
```

---

### 🔹 STEP 3.3 — ADD ENVIRONMENT DETAILS

Paste this **after Project Structure**:

```md
---

## ⚙️ Environment Variables

Create a `.env` file inside the **server** folder:

```
PORT=5000
MONGO_URI=your_mongodb_atlas_uri
JWT_SECRET=your_secret_key
```

⚠️ **Do not commit `.env` to GitHub**

---

## ▶️ Run the Project Locally

### 1️⃣ Backend

```bash
cd server
npm install
npm run dev
```

Server runs at:

```
http://localhost:5000
```

---

### 2️⃣ Frontend

```bash
cd client
npm install
npm run dev
```

Frontend runs at:

```
http://localhost:5173
```

## 🔐 Default Roles

* **Admin**: Can manage sweets & view analytics
* **User**: Can browse menu & place orders

(Admin role can be assigned directly in the database.)

---

## 📊 Admin Dashboard Preview

* Revenue Analytics
* Orders Table
* Inventory Control
* Clean, modern UI

---

## 🧪 Testing

* Backend APIs tested using Jest & Supertest
* Authentication & order flows validated

---

## 📌 Future Enhancements

* Deployment (Render / Vercel)
* Charts & Graphs
* Payment Gateway Integration

---

## 👨‍💻 Author

**Shreya**
MERN Stack Developer

---

## ⭐️ Acknowledgements

This project was built as part of an academic / skill-building assignment to demonstrate full-stack development and system design.

---

⭐ If you like this project, feel free to star the repository!
