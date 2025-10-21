# Expense Tracker (Full Stack)

This repository contains a full-stack expense tracker app.

Backend: Node.js + Express + MongoDB
Frontend: React + Material UI

Quick start (two terminals):

1. Backend

 - Copy `backend/.env.example` to `backend/.env` and set `MONGO_URI` and `JWT_SECRET`.
 - Install and run:

```powershell
cd backend
npm install
npm run dev
```

2. Frontend

```powershell
cd frontend
npm install
npm start
```

The frontend runs on http://localhost:3000 and the backend on http://localhost:5000 by default.
# MERN Expense Tracker

A **full-stack MERN (MongoDB, Express, React, Node.js) Expense Tracker** web application with authentication, expense management, dynamic charts, and modern UI. Track your expenses efficiently, analyze your spending habits, and gain insights with category-wise summaries and visual dashboards.

---

## **Features**

### **1. Authentication & Users**
- User registration and login with **JWT authentication**.
- Passwords are securely hashed using **bcrypt**.
- Each user can only manage and view their **own expenses**.

### **2. Expense Management**
- Add, edit, and delete expenses.
- Each expense has:
  - **Title**
  - **Amount**
  - **Category** (Food, Travel, Shopping, Bills, Entertainment, Other)
  - **Date**
  - **Recurring option**
- Real-time updates on adding or deleting expenses.

### **3. Dashboard & Reports**
- Displays **total expenses**.
- **Category-wise summary** with a **bar chart**.
- Responsive dashboard using **Material-UI**.
- Easy visualization of monthly/weekly spending trends.

### **4. Modern UI/UX**
- Clean, stylish, and **responsive design**.
- Material-UI components with **hover effects and smooth transitions**.
- Light/Dark mode toggle (optional for competition-level enhancements).

### **5. Backend & API**
- **RESTful API** built with **Express.js**.
- **MongoDB** database to store users and expenses.
- Secure endpoints with **JWT authentication**.
- Input validation and error handling.

### **6. Extra Features (Optional Enhancements)**
- Export expenses as **CSV or PDF**.
- Search and filter expenses by **category** or **date**.
- Notifications for **upcoming recurring expenses**.
- Production-ready **folder structure** with reusable components and clear comments.

---

## **Tech Stack**

| Layer          | Technology                   |
|----------------|------------------------------|
| Frontend       | React.js, Material-UI        |
| Backend        | Node.js, Express.js          |
| Database       | MongoDB                      |
| Authentication | JWT, bcrypt                  |
| Charts         | Chart.js, react-chartjs-2    |
| Styling        | Material-UI (MUI)            |
| Tools          | Axios, React Router Dom      |

---

## **Folder Structure**

