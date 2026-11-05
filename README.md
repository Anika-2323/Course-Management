# SkillTrack: Full-Stack Student Course Management System

A production-grade, containerized full-stack web application for student course discovery, module enrollment tracking, and authenticated real-time peer messaging.

---

## 🛠️ Technology Stack

- **Frontend**: React (Vite), React Router v6, Axios, Socket.IO Client
- **Backend**: Node.js, Express.js, Socket.IO, JSON Web Tokens (JWT), Bcrypt
- **Database**: MongoDB Atlas with Mongoose ODM
- **Security**: Helmet, Express Rate Limit, Express Validator, Bcrypt password hashing
- **Testing**: Jest, Supertest
- **DevOps & Infrastructure**: Docker, Docker Compose, Nginx

---

## 🚀 Quick Start (Dockerized)

Ensure **Docker Desktop** is running, then run:

```bash
# Build and start all services in detached mode
docker compose up -d --build

# Verify container statuses
docker compose ps