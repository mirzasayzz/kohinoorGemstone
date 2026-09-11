<div align="center">

# 💎 Kohinoor Gemstone

### A Production-Grade D2C Gemstone Marketplace

[![Live](https://img.shields.io/badge/🌐_Live_App-kohinoorgemstone.com-gold?style=for-the-badge)](https://www.kohinoorgemstone.com)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![Node.js](https://img.shields.io/badge/Node.js-20-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://mongodb.com)
[![Socket.io](https://img.shields.io/badge/Socket.io-Realtime-010101?style=for-the-badge&logo=socketdotio)](https://socket.io)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://docker.com)

*Full-stack e-commerce platform with AI-powered recommendations, real-time chat, and Razorpay payments — built and deployed in production.*

</div>

---

## ✨ What Makes This Project Stand Out

| Feature | Detail |
|---------|--------|
| 🤖 **AI Chatbot** | Google Gemini + Groq fallback — recommends gemstones by zodiac, budget, occasion & purpose |
| 💬 **Real-Time Chat** | Socket.io authenticated rooms for live customer support |
| 💳 **Payments** | Full Razorpay integration with webhook signature verification |
| 🔐 **Security** | JWT + OTP email verification, AES-256 encryption, rate limiting, CORS hardening |
| 🌍 **Bilingual** | Full English/Urdu catalog with bilingual search |
| 🌙 **Dark Mode** | Persistent dark/light theme with system preference detection |
| 📦 **Multi-provider AI** | Graceful LLM fallback: Gemini → Groq → DeepSeek |
| 🐳 **DevOps** | Docker + docker-compose, Heroku-ready, GitHub Actions CI/CD |

---

## 🚀 Live Application

> **[kohinoorgemstone.com](https://www.kohinoorgemstone.com)** — Deployed and live in production

- **Frontend:** Vercel (React + Vite)
- **Backend:** Render (Node.js + Express)
- **Database:** MongoDB Atlas
- **Media CDN:** Cloudinary

---

## 🏗️ Architecture

```
kohinoorGemstone/
├── frontend/                  # React 18 + Vite + TailwindCSS
│   └── src/
│       ├── components/        # Reusable UI components
│       │   ├── auth/          # Login, Register, OTP verification
│       │   ├── common/        # Header, Footer, Navbar, ThemeToggle
│       │   ├── gemstone/      # ProductCard, GemstoneFilter, AIChat
│       │   └── layout/        # PageWrapper, AdminLayout
│       ├── context/           # AuthContext, CartContext, ThemeContext
│       ├── pages/             # Home, Shop, Product, Cart, Checkout, Profile
│       └── services/          # Axios API client, Socket.io client
│
├── backend/                   # Node.js + Express
│   └── src/
│       ├── models/            # User, Gemstone, Order, Cart, Chat (Mongoose)
│       ├── routes/            # /api/gemstones, /api/customer, /api/admin, /api/ai
│       ├── controllers/       # Business logic for each domain
│       ├── middleware/        # JWT auth, admin guard, Multer, error handler
│       ├── services/          # Email (Resend), Socket.io, AI agent router
│       ├── views/             # EJS admin dashboard templates
│       └── utils/             # AES encryption, helpers, validators
│
├── .github/workflows/         # GitHub Actions CI/CD pipeline
├── Dockerfile                 # Multi-stage production build
├── docker-compose.yml         # Full stack orchestration
└── ARCHITECTURE.md            # Deep-dive technical documentation
```

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|-----------|---------|
| **React 18** | UI library with hooks and Context API |
| **Vite** | Lightning-fast build tool and dev server |
| **TailwindCSS** | Utility-first responsive styling |
| **React Router v6** | Client-side routing with protected routes |
| **Socket.io Client** | Real-time bidirectional communication |
| **Axios** | HTTP client with interceptors for auth tokens |

### Backend
| Technology | Purpose |
|-----------|---------|
| **Node.js 20 + Express** | REST API and WebSocket server |
| **MongoDB + Mongoose** | NoSQL database with schema validation |
| **JWT** | Stateless authentication |
| **Resend API** | Transactional OTP email delivery |
| **Razorpay** | Payment gateway with webhook verification |
| **Cloudinary + Multer** | Image upload, storage and optimization |
| **Google Gemini AI** | AI-powered gemstone recommendation engine |
| **Groq + DeepSeek** | Fallback LLM providers for AI resilience |
| **Socket.io** | Real-time customer support chat |
| **Swagger / OpenAPI** | Auto-generated interactive API docs |

---

## 🎯 Features

### 🛒 Customer Experience
- **Bilingual Catalog** — Browse gemstones in English and Urdu with dual-language search
- **Advanced Filtering** — Filter by category, purpose, color, price range, certification
- **AI Gemstone Advisor** — Chat with an AI that recommends stones by zodiac sign, budget, occasion, and intent
- **Real-Time Support** — Instant live chat with the shop admin via Socket.io
- **Cart & Checkout** — Full cart management, address saving, Razorpay payment, COD option
- **Wishlist** — Save products for later across sessions
- **OTP Auth** — Email-verified signup with Resend API
- **Dark / Light Mode** — System-aware theme with manual toggle

### 🔧 Admin Dashboard
- **Product Management** — Full CRUD for gemstone listings with multi-image upload
- **Order Management** — Track and update order statuses
- **Chat Console** — Reply to real-time customer inquiries from a unified dashboard
- **User Management** — View and manage customer accounts
- **Analytics** — Product views, engagement metrics
- **Swagger Docs** — Admin-gated `/admin/api-docs` with live API exploration

---

## ⚡ Getting Started

### Prerequisites
- Node.js 20+
- MongoDB (local or Atlas)
- Cloudinary account
- Google Gemini API key
- Razorpay test keys

### Backend Setup

```bash
cd backend
npm install
cp .env.example .env
# Fill in your credentials in .env
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env
# Set VITE_API_BASE_URL and VITE_SOCKET_URL
npm run dev
```

### Access

| Service | URL |
|---------|-----|
| Frontend | http://localhost:5173 |
| Backend API | http://localhost:5000/api |
| Admin Panel | http://localhost:5000/admin |
| API Docs (Swagger) | http://localhost:5000/admin/api-docs |

---


---


## 🐳 Docker

```bash
# Full stack with one command
docker-compose up -d
```

See [DOCKER_DEPLOYMENT.md](./DOCKER_DEPLOYMENT.md) for production Docker setup and [HEROKU_DEPLOYMENT.md](./HEROKU_DEPLOYMENT.md) for Heroku deployment.

---

## 📡 API Endpoints

### Authentication
```
POST   /api/customer/signup          Register with OTP verification
POST   /api/customer/verify-email    Verify OTP
POST   /api/customer/signin          Customer login
POST   /api/auth/login               Admin login
```

### Gemstones
```
GET    /api/gemstones                List with filters & pagination
GET    /api/gemstones/trending       Trending gemstones
GET    /api/gemstones/:id            Single product detail
POST   /api/gemstones                Create (admin)
PUT    /api/gemstones/:id            Update (admin)
DELETE /api/gemstones/:id            Delete (admin)
```

### Cart & Orders
```
GET    /api/cart                     Get user cart
POST   /api/cart/add                 Add to cart
PUT    /api/cart/update              Update quantity
POST   /api/orders                   Place order (Razorpay)
POST   /api/orders/verify            Verify payment webhook
```

### AI & Chat
```
POST   /api/gemstone-ai/chat         Chat with AI advisor
GET    /api/gemstone-ai/suggestions  Personalized recommendations
GET    /api/customer/chat/messages   Get chat history
POST   /api/customer/chat/send       Send customer message
```

> 📖 Full interactive docs available at `/admin/api-docs` (Swagger/OpenAPI)

---

## 🔒 Security Highlights

- **JWT** authentication with secure HttpOnly cookie option
- **OTP email verification** via Resend (time-limited, single-use)
- **AES-256 encryption** for sensitive API credentials
- **HMAC signature verification** for Razorpay webhooks
- **Rate limiting** on all authentication endpoints
- **Input sanitization** and XSS prevention
- **CORS** strict configuration per environment

---

## 🗂️ Deep-Dive Docs

- [ARCHITECTURE.md](./ARCHITECTURE.md) — System design, data models, and API design decisions
- [DOCKER_DEPLOYMENT.md](./DOCKER_DEPLOYMENT.md) — Container deployment guide
- [HEROKU_DEPLOYMENT.md](./HEROKU_DEPLOYMENT.md) — Heroku platform deployment

---

## 👩‍💻 About the Developer

<div align="center">

**Tuba Mirza** — Full Stack Developer

[![Portfolio](https://img.shields.io/badge/🌐_Portfolio-tubamirza.vercel.app-blueviolet?style=flat-square)](https://tubamirza.vercel.app/)
[![GitHub](https://img.shields.io/badge/GitHub-@mirzasayzz-181717?style=flat-square&logo=github)](https://github.com/mirzasayzz)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Tuba_Mirza-0A66C2?style=flat-square&logo=linkedin)](https://linkedin.com/in/tubamirza)
[![Email](https://img.shields.io/badge/Email-tubamirza822@gmail.com-EA4335?style=flat-square&logo=gmail)](mailto:tubamirza822@gmail.com)

*Passionate about building real-world full-stack applications with modern web technologies.*

</div>

---

## 📄 License

This project is shared for portfolio demonstration purposes. All rights reserved — unauthorized commercial use is prohibited.

---

<div align="center">

Built with ❤️ by **Tuba Mirza**

*If you found this project interesting, feel free to ⭐ star it!*

</div>
