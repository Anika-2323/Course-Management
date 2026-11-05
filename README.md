# SkillTrack: Full-Stack Student Course Management System

A production-grade, containerized full-stack web application for student course discovery, module enrollment tracking, and authenticated real-time peer messaging.

---

## Deployment

### Live Application
- **Frontend (Netlify):** https://cool-alpaca-dc70fa.netlify.app
- **Backend (Render):** https://student-course-api-d68c.onrender.com
- **API Health:** https://student-course-api-d68c.onrender.com/api/health

### Technology Stack
- **Frontend:** React, Vite, React Router, Axios, Socket.IO Client
- **Backend:** Node.js, Express, MongoDB Atlas, Mongoose, JWT, bcryptjs, Socket.IO
- **Hosting:** Netlify (Frontend), Render (Backend), MongoDB Atlas (Database)
---

## 🚀 Quick Start (Dockerized)

Ensure **Docker Desktop** is running, then run:

```bash
# Build and start all services in detached mode
docker compose up -d --build

# Verify container statuses
docker compose ps

