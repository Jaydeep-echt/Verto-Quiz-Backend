# Verto-Quiz-Backend
Quiz App backend with Node.js &amp; MongoDB. Includes secure auth, quiz creation, student attempts, and auto-grading logic

# 🧠 Quiz Competition Backend

A modular, production-grade backend built with **Node.js**, **Express**, and **MongoDB** for managing online quiz competitions.  
Includes secure authentication, role-based access, quiz creation & management, attempt tracking, and auto-grading functionality.

---

## 🚀 Features

- JWT Authentication (Login, Register, Role-based Access)
- Quiz & Question Management (Admin)
- Student Attempt & Auto-Grading System
- Real-time Ready (Socket.IO integration possible)
- Clean, Modular Project Architecture
- MongoDB + Mongoose ORM Integration
- Environment-based Configuration (`.env`)

---

## 📂 Project Structure
Verto-Quiz-Backend/
├─ package.json
├─ server.js
├─ config/
│  └─ db.js
├─ models/
│  ├─ User.js
│  ├─ Quiz.js
│  └─ Attempt.js
├─ middleware/
│  ├─ auth.js
│  └─ role.js
├─ controllers/
│  ├─ authController.js
│  ├─ quizController.js
│  └─ attemptController.js
├─ routes/
│  ├─ auth.js
│  ├─ admin.js
│  └─ student.js
├─ utils/
│  └─ scoring.js
├─ socket.js
└─ scripts/
└─ createAdmin.js

---

## ⚙️ Prerequisites

Make sure you have installed:

- [Node.js](https://nodejs.org/en/) (v18 or above)
- [MongoDB Community Server](https://www.mongodb.com/try/download/community) (running locally on default port)
- npm or yarn

---

## 🧩 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/<your-username>/quiz-backend.git
   cd quiz-backend

2.	**Install Dependencies**
    npm install

3.	**Create a .env file**
    PORT=5000
    MONGO_URI=mongodb://127.0.0.1:27017/quizdb
    JWT_SECRET=supersecret_jwt_key

4.	**Start MongoDB** 
    mongod

5.	**Run the server**
    npm run dev / node server.js

6.	**Create an Admin User**
    node scripts/createAdmin.js

## Tech Stack
	•	Backend: Node.js + Express.js
	•	Database: MongoDB + Mongoose
	•	Authentication: JWT
	•	Validation: express-validator
	•	Real-time Support (optional): Socket.IO

👨‍💻 Author

Jaydeep
Software Engineer & Full-Stack Developer

GitHub • LinkedIn

⸻

🛡 License

This project is licensed under the MIT License.
