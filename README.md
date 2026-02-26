# ⚓ AutoShip — Automated Deployment Pipeline

[![CI/CD Pipeline](https://github.com/YOUR_USERNAME/autoship/actions/workflows/deploy.yml/badge.svg)](https://github.com/YOUR_USERNAME/autoship/actions/workflows/deploy.yml)
![Node.js](https://img.shields.io/badge/Node.js-18-green)
![Docker](https://img.shields.io/badge/Docker-Containerized-blue)
![License](https://img.shields.io/badge/license-MIT-purple)

A production-style mini deployment system built with **Node.js**, **Docker**, and **GitHub Actions**. Simulates how modern engineering teams automate their build and deployment workflows.

## 🏗️ Architecture
```
GitHub Push → GitHub Actions → Docker Build → Container Deploy → Health Check
```

## ✨ Features

- REST API with deployment simulation endpoints
- Real-time deployment dashboard UI
- Dockerized with multi-stage builds and non-root user
- Full CI/CD pipeline: test → build → push → deploy
- Health check endpoint for container orchestration
- Structured logging, security headers, error handling

## 🚀 Quick Start

### Prerequisites
- Node.js 18+, Docker, Docker Compose

### Local Development
```bash
git clone https://github.com/YOUR_USERNAME/autoship.git
cd autoship
cp .env.example .env
npm install
npm run dev
# Visit http://localhost:3000
```

### Docker
```bash
docker compose up -d
# Visit http://localhost:3000
docker compose logs -f
docker compose down
```

### Run Tests
```bash
npm test
```

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Health check |
| GET | `/api/info` | App metadata |
| GET | `/api/deployments` | List deployments |
| GET | `/api/deployments/:id` | Get deployment |
| POST | `/api/deployments` | Trigger deployment |

### Example Request
```bash
curl -X POST http://localhost:3000/api/deployments \
  -H "Content-Type: application/json" \
  -d '{"app":"my-service","version":"v1.0.0","environment":"staging"}'
```

## ⚙️ CI/CD Pipeline

On every push to `main`:
1. **Test** — runs Jest test suite
2. **Build** — builds Docker image, tags with commit SHA
3. **Push** — pushes to GitHub Container Registry
4. **Deploy** — runs container, verifies health check

## 🔧 Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | `3000` | Server port |
| `NODE_ENV` | `development` | Environment |
| `BUILD_TIME` | `local` | Injected by CI |
| `COMMIT_SHA` | `local` | Git commit SHA |

## 📁 Project Structure
```
autoship/
├── src/
│   ├── app.js              # Express app
│   ├── routes/api.js       # API endpoints
│   └── middleware/logger.js
├── public/index.html       # Dashboard UI
├── tests/app.test.js       # Jest tests
├── .github/workflows/      # CI/CD pipeline
├── Dockerfile              # Multi-stage build
├── docker-compose.yml
└── .env.example
```

## 🔮 Future Improvements
- Deploy to AWS ECS or Railway
- Add Redis for persistent deployment storage
- Kubernetes manifests (Deployment + Service)
- Prometheus metrics at `/metrics`
- Slack/Discord webhook notifications
- Staging vs production environment separation

## 📝 License
MIT
# Autoship - Last updated: Thu Feb 26 11:12:10 PM IST 2026
