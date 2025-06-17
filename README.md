
---

## 📋 Collaborative Task Manager (MERN Stack)

A simple task manager built with the *MERN* stack that allows team members to create tasks, assign them, filter by status or assignee, and update status in real time. Built with clean modular code and teamwork in mind.

---

## 🔧 Features

* ✅ Create tasks with title, description, assignee, and status
* 🔄 Update task status (To Do, In Progress, Done)
* 🔍 Filter tasks by status or assignee
* 🗑 Delete tasks (optional feature)
* 🖥 Full-stack MERN setup (MongoDB, Express, React, Node.js)
* 💅 UI styled with Tailwind CSS

---

## 📁 Project Structure


project-root/
├── server/             # Backend
│   ├── model.js
│   ├── routes.js
│   ├── server.js
│
├── client/             # Frontend (React)
│   ├── src/
│   │   ├── components/
│   │   │   ├── TaskForm.jsx
│   │   │   ├── TaskList.jsx
│   │   │   └── TaskCard.jsx
│   │   ├── App.jsx
│   │   ├── api.js
│   │   └── index.js
│
├── README.md


---

## 🚀 Getting Started

### 🧠 Prerequisites

* Node.js
* MongoDB Atlas or local MongoDB
* npm
* Git

---

## 🖥 Backend Setup (Express + MongoDB)

### 1. Navigate to the server folder:

bash
cd server


### 2. Install dependencies:

bash
npm install


### 3. Set up MongoDB connection in server.js:

js
mongoose.connect('mongodb+srv://<username>:<password>@cluster.mongodb.net/<dbname>?retryWrites=true&w=majority')


✅ Or use a local MongoDB:

js
mongoose.connect('mongodb://localhost:27017/taskdb')


### 4. Run the backend server:

bash
nodemon server.js


Server runs on: http://localhost:5000/

---

## 💻 Frontend Setup (React + Tailwind)

### 1. Navigate to the client folder:

bash
cd client


### 2. Install dependencies:

bash
npm install


### 3. Run the frontend:

bash
npm start


App opens at: http://localhost:3000/

---

## 🛠 API Documentation

### 🔸 Create Task (POST /)

json
{
  "title": "Sample Task",
  "Description": "Details here...",
  "assignedto": "Alice",
  "statusbar": "To Do"
}


### 🔹 Get Tasks (GET /)

Supports query params:

* statusbar=To Do
* assignedto=Alice

Example:


GET /?statusbar=In%20Progress&assignedto=Bob


### 🔸 Update Task (PATCH /:id)

json
{
  "statusbar": "Done"
}


### 🔹 Delete Task (DELETE /:id) (if implemented)

---

## 👥 Team Roles

* *Frontend Developer*: Built the UI using React + Tailwind
* *Backend Developer*: Set up Express routes & MongoDB connection
* *Database Handler*: Created Mongoose schema, ensured data integrity
* *Tester/QA*: Manually tested frontend + API integration

---


---

## ✅ Future Enhancements

* User login/signup with JWT
* Task due dates & reminders
* Real-time collaboration (WebSockets)
* Deploy backend (Render) and frontend (Vercel/Netlify)

---

## 📃 License

This project is for educational and collaborative purposes.
