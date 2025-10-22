# Expense Tracker

A modern expense tracking application built with React and Node.js.

## Features

- User authentication (register/login)
- Add, edit, and delete expenses
- Categorize expenses
- Visual charts and analytics
- Responsive modern UI
- Real-time expense tracking

## Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT authentication
- bcrypt for password hashing

### Frontend
- React 18
- Modern CSS with Tailwind CSS
- Chart.js for visualizations
- Axios for API calls
- React Router for navigation

## Getting Started

1. Install dependencies:
```bash
npm run install-all
```

2. Set up environment variables:
- Copy `backend/.env.example` to `backend/.env`
- Copy `frontend/.env.example` to `frontend/.env`

3. Start the development servers:
```bash
npm run dev
```

This will start both the backend server (port 5000) and frontend development server (port 3000).

## Project Structure

```
expense-tracker/
├── backend/          # Node.js backend
├── frontend/         # React frontend
└── package.json      # Root package.json for scripts
```
