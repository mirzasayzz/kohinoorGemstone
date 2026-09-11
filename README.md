<div align="center">

<img src="https://img.shields.io/badge/-%F0%9F%92%8E%20KOHINOOR%20GEMSTONE-gold?style=for-the-badge&labelColor=1a1a2e&color=f0a500" alt="Kohinoor Gemstone" height="50"/>

### Production-Grade D2C E-Commerce Platform

[![Live App](https://img.shields.io/badge/🌐_LIVE_APP-kohinoorgemstone.com-success?style=for-the-badge&labelColor=1a1a2e)](https://www.kohinoorgemstone.com)
&nbsp;
[![CI](https://github.com/mirzasayzz/kohinoorGemstone/actions/workflows/qa-automation.yml/badge.svg)](https://github.com/mirzasayzz/kohinoorGemstone/actions)

<br/>

[![React](https://img.shields.io/badge/React_18-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev)
[![Node.js](https://img.shields.io/badge/Node.js_20-339933?style=flat-square&logo=nodedotjs&logoColor=white)](https://nodejs.org)
[![MongoDB](https://img.shields.io/badge/MongoDB_Atlas-47A248?style=flat-square&logo=mongodb&logoColor=white)](https://mongodb.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://typescriptlang.org)
[![Playwright](https://img.shields.io/badge/Playwright-2EAD33?style=flat-square&logo=playwright&logoColor=white)](https://playwright.dev)
[![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=docker&logoColor=white)](https://docker.com)
[![Socket.io](https://img.shields.io/badge/Socket.io-010101?style=flat-square&logo=socketdotio)](https://socket.io)
[![Gemini AI](https://img.shields.io/badge/Gemini_AI-8E75B2?style=flat-square&logo=google&logoColor=white)](https://ai.google.dev)

<br/>

> A fully-featured, production-deployed gemstone marketplace — built solo from scratch with **AI recommendations**, **real-time Socket.io chat**, **Razorpay payments**, **235 automated tests**, and a **5-browser CI/CD pipeline**.

<br/>

[🚀 Live Demo](https://www.kohinoorgemstone.com) &nbsp;·&nbsp; [📐 Architecture](./ARCHITECTURE.md) &nbsp;·&nbsp; [🐳 Docker Setup](./DOCKER_DEPLOYMENT.md) &nbsp;·&nbsp; [🧪 QA Docs](./tests/README.md)

</div>

---

## 📌 About This Project

**Kohinoor Gemstone** is a complete, end-to-end D2C (Direct-to-Consumer) marketplace for authentic certified gemstones — built and deployed solo as a full-stack engineering showcase.

The goal was to build something that mirrors **real production engineering**: a live product with actual users, real payment flows, an AI-powered recommendation engine, live customer support chat, a full admin dashboard, and a professional QA automation suite — not a tutorial clone.

### 🎯 Why This Project Is Different

| Aspect | What Was Built |
|--------|---------------|
| **Not a CRUD app** | AI chatbot with multi-provider LLM fallback (Gemini → Groq → DeepSeek), zodiac-based recommendation scoring, weighted intent matching |
| **Not fake payments** | Live Razorpay integration with HMAC webhook signature verification and order lifecycle management |
| **Not mock data** | Real product listings, real bilingual (English/Urdu) catalog, real Cloudinary CDN images |
| **Not skipped QA** | 235 automated tests across E2E + API, 5 browsers, Page Object Model, GitHub Actions matrix CI |
| **Not tutorial auth** | JWT + OTP email verification (Resend), AES-256 API key encryption, rate limiting, CORS hardening |
| **Deployed** | Live at [kohinoorgemstone.com](https://www.kohinoorgemstone.com) — not localhost |

---

## 🏆 Project Highlights

```
✅ Production deployed at kohinoorgemstone.com
✅ 235 automated tests (E2E + API) — Playwright + TypeScript
✅ 5-browser CI matrix: Chrome · Firefox · WebKit · Mobile Chrome · Mobile Safari
✅ AI chatbot with 3-provider LLM fallback (Gemini, Groq, DeepSeek)
✅ Real Razorpay payment gateway with HMAC webhook verification
✅ Socket.io real-time chat — authenticated rooms, admin console
✅ Bilingual product catalog — English + Urdu search
✅ Full admin dashboard (EJS) with RBAC, analytics, order management
✅ Swagger/OpenAPI interactive docs at /admin/api-docs
✅ Docker + docker-compose for one-command local dev
✅ GitHub Actions CI/CD pipeline on every push
```

---

## 🧪 QA Automation — 235 Tests, 5 Browsers

One of the most complete QA setups in a solo portfolio project:

| Suite | Tests | Coverage |
|-------|-------|----------|
| 🔐 Auth E2E | 60 | Login, register, OTP, validation, accessibility, responsive |
| 🛍️ Product E2E | 46 | Search, filters, detail page, images, tabs, categories |
| 🛒 Cart E2E | 32 | Add, update, remove, quantities, coupon codes |
| 💳 Checkout E2E | 33 | Shipping, payment methods, COD, order placement |
| 🔌 Auth API | 19 | Register, login, JWT, OTP, profile, error handling |
| 📦 Products API | 23 | CRUD, search, pagination, sorting, filtering |
| 🛒 Cart API | 22 | Add, update, remove, calculations, validation |
| **Total** | **235** | **5 browsers · Page Object Model · GitHub Actions** |

**Browsers tested:** Chromium · Firefox · WebKit · Mobile Chrome (Pixel 5) · Mobile Safari (iPhone 12)

```bash
cd tests && npm test              # All 235 tests
cd tests && npm run test:e2e      # E2E only
cd tests && npm run test:api      # API only
cd tests && npm run test:headed   # With visible browser
```

---

## 🏗️ Architecture

```
kohinoorGemstone/
├── frontend/                    # React 18 + Vite + TailwindCSS
│   └── src/
│       ├── components/
│       │   ├── auth/            # Login, Register, OTP verification
│       │   ├── common/          # Header, Footer, CartDrawer, ThemeToggle
│       │   ├── gemstone/        # ProductCard, GemstoneFilter, AIChat widget
│       │   └── layout/          # PageWrapper, AdminLayout
│       ├── context/             # AuthContext, CartContext, ThemeContext
│       ├── pages/               # Home, Shop, Product, Cart, Checkout, Profile
│       └── services/            # Axios API client + Socket.io client
│
├── backend/                     # Node.js + Express REST API
│   └── src/
│       ├── models/              # User, Gemstone, Order, Cart, Chat (Mongoose)
│       ├── routes/              # /gemstones /customer /admin /gemstone-ai
│       ├── controllers/         # Domain business logic
│       ├── middleware/          # JWT auth · Admin guard · Multer · Error handler
│       ├── services/            # Email (Resend) · Socket.io · AI Agent Router
│       ├── views/               # EJS admin dashboard templates
│       └── utils/               # AES-256 encryption · Validators · Helpers
│
├── tests/                       # Playwright QA Automation Suite
│   ├── pages/                   # 9 Page Object classes (TypeScript)
│   ├── tests/e2e/               # End-to-end browser tests
│   ├── tests/api/               # REST API test suite
│   ├── helpers/                 # Performance · Accessibility · Visual helpers
│   └── playwright.config.ts     # 5-browser matrix config
│
├── .github/workflows/           # GitHub Actions CI/CD
├── Dockerfile                   # Multi-stage production build
├── docker-compose.yml           # Full-stack orchestration
└── ARCHITECTURE.md              # Deep-dive system design docs
```

---

## 🛠️ Tech Stack

### Frontend
| Technology | Why Used |
|-----------|----------|
| **React 18** | Component architecture, hooks, Context API for state |
| **Vite** | Sub-second HMR, optimised production bundle |
| **TailwindCSS** | Utility-first styling, dark mode, responsive design |
| **React Router v6** | Client-side routing with protected + public routes |
| **Socket.io Client** | Real-time bidirectional chat events |
| **Axios** | HTTP client with JWT interceptors and error handling |

### Backend
| Technology | Why Used |
|-----------|----------|
| **Node.js 20 + Express** | Non-blocking I/O, REST API + WebSocket on one server |
| **MongoDB + Mongoose** | Flexible schema for gemstone attributes + validation |
| **JWT** | Stateless auth — scalable across multiple server instances |
| **Resend API** | Reliable transactional OTP email delivery |
| **Razorpay** | Indian payment gateway — UPI, cards, netbanking, COD |
| **Cloudinary + Multer** | Multi-image upload, CDN delivery, auto-optimisation |
| **Google Gemini AI** | Primary LLM for intelligent gemstone recommendations |
| **Groq + DeepSeek** | Fallback LLM providers — zero downtime if Gemini fails |
| **Socket.io** | Real-time chat with namespace-based authenticated rooms |
| **Swagger / OpenAPI** | Self-documenting API — admin-gated interactive explorer |

### QA & DevOps
| Technology | Why Used |
|-----------|----------|
| **Playwright 1.59** | Cross-browser automation — Chrome, Firefox, Safari, Mobile |
| **TypeScript** | Type-safe test code — Page Objects, helpers, configs |
| **Page Object Model** | 9 POM classes — maintainable, reusable test abstractions |
| **GitHub Actions** | Matrix CI — runs all 235 tests on every push to main |
| **Docker** | Reproducible environments — dev to production parity |

---

## 🎯 Features

### 🛒 Customer-Facing
- **Bilingual catalog** — Browse gemstones in English and Urdu, search in both languages
- **Advanced filters** — Filter by category, purpose, color, price range, certification status
- **AI Gemstone Advisor** — Chat-based recommendations using zodiac sign, budget, occasion, intent
- **Real-time customer chat** — Instant Socket.io messaging with the shop admin
- **Cart & Checkout** — Full cart lifecycle, saved addresses, Razorpay (UPI/card) + COD
- **Wishlist** — Persisted across sessions with auth
- **OTP email auth** — Resend-powered time-limited verification codes
- **Dark / Light mode** — System preference detection with manual override

### ⚙️ Admin Dashboard
- **Gemstone CRUD** — Create, edit, delete listings with multi-image Cloudinary upload
- **Order management** — Track and update order statuses through fulfilment lifecycle
- **Chat console** — Unified inbox to respond to all customer Socket.io conversations
- **User management** — View accounts, verification status, order history
- **Analytics** — Product view counts and engagement metrics
- **Swagger API Explorer** — Admin-gated live interactive docs at `/admin/api-docs`

---

## ⚡ Getting Started

### Prerequisites
- Node.js 20+ · MongoDB · Cloudinary · Gemini API key · Razorpay test keys

### Quick Start

```bash
# Clone
git clone https://github.com/mirzasayzz/kohinoorGemstone.git
cd kohinoorGemstone

# Backend
cd backend && npm install && cp .env.example .env
# → fill in your credentials in .env
npm run dev

# Frontend (new terminal)
cd frontend && npm install && cp .env.example .env
npm run dev

# Tests (new terminal)
cd tests && npm install && npx playwright install --with-deps
npm test
```

### Local Access

| Service | URL |
|---------|-----|
| Frontend | http://localhost:5173 |
| Backend API | http://localhost:3001/api |
| Admin Panel | http://localhost:3001/admin |
| Swagger Docs | http://localhost:3001/admin/api-docs |

### Docker (One Command)

```bash
docker-compose up -d
```

---

## 📡 API Reference

### Authentication
```http
POST  /api/customer/signup          # Register + send OTP
POST  /api/customer/verify-email    # Verify OTP code
POST  /api/customer/signin          # Login → JWT
POST  /api/auth/login               # Admin login
```

### Gemstones
```http
GET    /api/gemstones               # List with filters, sort, pagination
GET    /api/gemstones/trending      # Trending products
GET    /api/gemstones/:id           # Single product detail
POST   /api/gemstones               # Create  [Admin]
PUT    /api/gemstones/:id           # Update  [Admin]
DELETE /api/gemstones/:id           # Delete  [Admin]
```

### Cart & Orders
```http
GET   /api/cart                     # User cart
POST  /api/cart/add                 # Add item
PUT   /api/cart/update              # Update quantity
POST  /api/orders                   # Place order (Razorpay)
POST  /api/orders/verify            # Verify payment webhook
```

### AI & Chat
```http
POST  /api/gemstone-ai/chat         # AI advisor conversation
GET   /api/gemstone-ai/suggestions  # Personalised recommendations
GET   /api/customer/chat/messages   # Chat history
POST  /api/customer/chat/send       # Send message
```

> 📖 Full interactive docs: **[/admin/api-docs](https://www.kohinoorgemstone.com/admin/api-docs)** (Swagger/OpenAPI)

---

## 🔒 Security

| Layer | Implementation |
|-------|---------------|
| Authentication | JWT with configurable expiry |
| Email verification | OTP via Resend — time-limited, single-use |
| API key storage | AES-256 encryption at rest |
| Payment integrity | HMAC-SHA256 Razorpay webhook signature verification |
| Abuse prevention | Rate limiting on all auth endpoints |
| Input security | XSS prevention via input sanitisation |
| Network | Environment-specific CORS whitelist |

---

## 📚 Documentation

| Doc | Contents |
|-----|----------|
| [ARCHITECTURE.md](./ARCHITECTURE.md) | System design, data models, API decisions, sequence diagrams |
| [DOCKER_DEPLOYMENT.md](./DOCKER_DEPLOYMENT.md) | Container build, compose, production Docker setup |
| [HEROKU_DEPLOYMENT.md](./HEROKU_DEPLOYMENT.md) | Heroku platform deployment step-by-step |
| [tests/README.md](./tests/README.md) | QA suite structure, test commands, CI setup |

---

## 👩‍💻 About the Developer

<div align="center">

### Tuba Mirza

**Full Stack Developer** — React · Node.js · MongoDB · AI Integration · QA Automation

<br/>

I built this project entirely solo — from database schema design to frontend UI, AI integration, payment gateway, real-time chat, and a 235-test QA automation suite. Every line of code, every architectural decision, and every deployment was mine.

This project reflects how I approach engineering: **build for production, not for demos**.

<br/>

[![Portfolio](https://img.shields.io/badge/🌐_Portfolio-tubamirza.vercel.app-7C3AED?style=for-the-badge)](https://tubamirza.vercel.app/)
&nbsp;
[![GitHub](https://img.shields.io/badge/GitHub-@mirzasayzz-181717?style=for-the-badge&logo=github)](https://github.com/mirzasayzz)
&nbsp;
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Tuba_Mirza-0A66C2?style=for-the-badge&logo=linkedin)](https://linkedin.com/in/tubamirza)
&nbsp;
[![Email](https://img.shields.io/badge/Email-tubamirza822@gmail.com-EA4335?style=for-the-badge&logo=gmail&logoColor=white)](mailto:tubamirza822@gmail.com)

<br/>

*Open to full-stack, backend, and frontend engineering roles — let's build something great.*

</div>

---

## 📄 License

© Tuba Mirza. Shared for portfolio purposes — all rights reserved. Unauthorized commercial use is prohibited.

---

<div align="center">

**⭐ If this project impressed you, a star goes a long way!**

*Built with ❤️ and a lot of ☕ by Tuba Mirza*

</div>
