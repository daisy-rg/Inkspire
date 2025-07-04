Inkspire - Blogging Platform
rv 
A modern blogging platform for writers and readers

Table of Contents
Features

Technologies

Installation

Configuration

API Endpoints

Development

Deployment

Contributing

License

Features ✨
User Authentication: Secure signup/login with session management

Rich Blog Posts: Create, read, update and delete blog posts

Responsive Design: Works on all device sizes

Modern UI: Clean, intuitive interface for writers and readers

Performance Optimized: Fast loading and smooth interactions

Technologies 🛠️
Frontend
React.js

Vite


React Router



Backend
Python Flask

SQLAlchemy ORM

Flask-Login

Flask-Migrate

Flask-CORS

Database
SQLite (Development)



Installation 💻
Prerequisites
Node.js (v16+)

Python (v3.9+)

pipenv

Setup Instructions
Clone the repository

bash
git clone https://github.com/daisy-rg/Inkspire.git
cd inkspire
Set up backend

bash
cd Backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pipenv install  
Set up frontend

bash
cd ../Frontend
npm install
Environment variables
Create .env files in both Backend and Frontend directories with required variables.

Configuration ⚙️
Backend Configuration (Backend/.env)
ini
FLASK_APP=app.py
FLASK_ENV=development
SECRET_KEY=your-super-secret-key
DATABASE_URL=sqlite:///instance/inkspire.db
Frontend Configuration (Frontend/.env)
ini
VITE_API_BASE_URL=http://localhost:5000/api
API Endpoints 🌐
Endpoint	Method	Description
/api/auth/register	POST	User registration
/api/auth/login	POST	User login
/api/posts	GET	Get all posts
/api/posts	POST	Create new post
/api/posts/<id>	GET	Get single post
/api/posts/<id>	PUT	Update post
/api/posts/<id>	DELETE	Delete post
Development 🧑‍💻
Start backend server

bash
cd Backend
flask run
Start frontend server

bash
cd Frontend
npm run dev
Run database migrations

bash
flask db migrate -m "Migration message"
flask db upgrade



License 📄
This project is licensed under the MIT License - see the LICENSE file for deta