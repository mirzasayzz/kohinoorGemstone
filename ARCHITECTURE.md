# 🏗️ Kohinoor Gemstone — Project Architecture

A full-stack monorepo for a premium gemstone e-commerce platform.

- **Frontend:** React 19 SPA (Vite + Tailwind CSS) — customer storefront
- **Backend:** Node.js + Express + MongoDB (Mongoose) — REST API + EJS admin dashboard
- **Realtime:** Socket.IO — customer ↔ admin live chat
- **AI:** "Kohinoor AI" — multi-turn gemstone advisor with multi-provider LLM fallback
- **Payments:** Razorpay · **Email:** Resend · **Images:** Cloudinary

---

## 1. High-Level System Diagram

```
                         ┌─────────────────────────────────────────────┐
                         │              BROWSER (users)                │
                         │                                             │
        ┌────────────────┼──────────────────────────────┐              │
        │                │                              │              │
        ▼                ▼                              ▼              │
┌───────────────┐ ┌───────────────┐          ┌──────────────────┐      │
│  React SPA    │ │  EJS Admin    │          │  React SPA       │      │
│  / (store)    │ │  /admin/*     │          │  (same origin)   │      │
│  JSON fetch   │ │  form posts   │          │  Socket.IO       │      │
└──────┬────────┘ └──────┬────────┘          └────────┬─────────┘      │
       │                 │                           │                │
       ▼                 ▼                           ▼                │
┌─────────────────────────────────────────────────────────────────┐   │
│                        EXPRESS SERVER (3001)                    │   │
│  ┌──────────────┬──────────────┬──────────────┬──────────────┐  │   │
│  │ /api/auth    │ /api/customer│ /api/gemstone│ /api/business│  │   │
│  │ /api/payment │ /api/upload  │ /gemstone-ai │ /admin/*     │  │   │
│  └──────────────┴──────────────┴──────────────┴──────────────┘  │   │
│  Middleware: helmet · cors · rate-limit · session · compression │   │
└──────────┬──────────────┬────────────────┬──────────────────────┘   │
           │              │                │                          │
           ▼              ▼                ▼                          │
    ┌────────────┐  ┌──────────┐   ┌───────────────┐                 │
    │  MongoDB   │  │ Socket.IO│   │  Cloudinary   │                 │
    │  (Mongoose)│  │ (chat)   │   │  (images)     │                 │
    └────────────┘  └──────────┘   └───────────────┘                 │
           │
           ▼
    ┌────────────────────────────────────────────┐
    │  EXTERNAL SERVICES                          │
    │  Resend (email/OTP) · Razorpay (payments)   │
    │  Groq / Mistral / Pollinations (AI)         │
    └────────────────────────────────────────────┘
```

---

## 2. Repository Layout

```
kohinoor/
├── frontend/                      # React SPA (customer storefront)
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js         # luxury gold/dark theme tokens
│   ├── vercel.json                # Vercel deploy config
│   └── src/
│       ├── main.jsx               # React entry (StrictMode)
│       ├── App.jsx                # Providers + router
│       ├── config/config.js       # API endpoints, categories, site config
│       ├── services/api.js        # Axios wrapper + service modules
│       ├── context/               # 6 React contexts (state)
│       ├── components/
│       │   ├── layout/            # Header, Footer, Layout
│       │   ├── common/            # drawers, panels, chat, AI, widgets
│       │   ├── auth/              # AuthModal, UserMenu
│       │   └── gemstone/          # GemstoneCard, ImageGallery
│       └── pages/                 # 11 route pages
│
├── backend/                       # Express API + EJS admin
│   ├── src/
│   │   ├── server.js              # App entry: middleware + routes + socket
│   │   ├── config/database.js     # Mongoose connect + index creation
│   │   ├── middleware/            # auth.js (JWT), errorHandler.js
│   │   ├── routes/                # 8 route modules
│   │   ├── controllers/           # business logic per feature
│   │   ├── models/                # 7 Mongoose schemas
│   │   ├── services/              # emailService (Resend), socketService
│   │   ├── views/admin/           # EJS admin dashboard templates
│   │   ├── utils/                 # seeds, setupAdmin, email tests
│   │   └── scripts/               # seed/data/maintenance scripts
│   └── test-*.js                  # deployment/API smoke tests
│
├── Dockerfile · docker-compose.yml · heroku.yml · Procfile   # deploy
└── ARCHITECTURE.md · KOHINOORGEMSTONE.md · *DEPLOYMENT.md    # docs
```

---

## 3. Frontend Architecture (React SPA)

### 3.1 Tech Stack
React 19 · Vite 7 · Tailwind 3.4 · React Router 7 · Framer Motion · Axios · Socket.IO-client · Lucide icons · react-helmet (SEO)

### 3.2 Provider Nesting (state hierarchy in `App.jsx`)
```
HelmetProvider
└─ ToastProvider                     → toast notifications
   └─ BusinessProvider               → business info from API (global settings)
      └─ AuthProvider                → customer JWT auth (login/signup/OTP/profile)
         └─ SocketProvider           → Socket.IO chat connection (auth-gated)
            └─ WishlistProvider      → wishlist state
               └─ CartProvider       → per-user localStorage cart
                  └─ Router + Routes
```

### 3.3 Routing Map
| Route | Page | Notes |
|---|---|---|
| `/signin`, `/signup` | SignIn, SignUp | standalone, no Layout |
| `/` | Home | with Layout |
| `/gemstones` | AllGemstones | search/filter/sort + pagination |
| `/gemstone/:slug` | GemstoneDetail | by slug or ID |
| `/about` | About | also serves `/contact` (redirect) |
| `/wishlist` | Wishlist | |
| `/profile` | Profile | also serves `/settings` |
| `/checkout` | Checkout | Razorpay checkout |
| `/order-success` | OrderSuccess | |
| `*` | NotFound | 404 |

### 3.4 Config & API Layers
- **`config/config.js`** — single source of truth: `API_CONFIG` (base URL + all endpoint paths), `GEMSTONE_CATEGORIES` (EN/Urdu), `CLOUDINARY_CONFIG`, `SITE_CONFIG`, fallback `BUSINESS_INFO`, `APP_CONFIG` (WhatsApp template, image limits).
- **`services/api.js`** — Axios instance with:
  - Request interceptor: attaches `Bearer` token from `kohinoor_token` (customer) or `token` (admin).
  - Response interceptor: unwraps `response.data`, clears tokens on 401, normalizes errors.
  - Exports grouped services: `authService`, `gemstoneService`, `businessService`, `uploadService`, `aiService`, `apiUtils`.

### 3.5 Data Flow (example: gemstone listing)
```
AllGemstones.jsx
  └─ gemstoneService.getGemstones({category, sort, page})
       └─ api.get('/gemstones?...')        [axios]
            └─ GET /api/gemstones          [Express route]
                 └─ gemstoneController.getGemstones
                      └─ Gemstone.find(...) → MongoDB
```
Response → axios unwraps → setState → render cards.

---

## 4. Backend Architecture (Express + MongoDB)

### 4.1 Server Bootstrap (`src/server.js`)
1. Load env → **validate required vars** (`NODE_ENV`, `MONGODB_URI`, `JWT_SECRET`, `GEMINI_API_KEY`) — exits if missing.
2. Middleware stack: helmet → cors (origin allowlist) → compression → morgan → JSON/urlencoded (10mb) → session (MongoStore) → rate limiter (`/api` only).
3. Static: `/admin/assets`, `/uploads`; in production serves the built React SPA.
4. Mount admin routes (`/`), then API routes under `/api/*`.
5. Health check `GET /api/health`.
6. Production SPA catch-all (`app.get('*')` → `index.html`, skipping `/api` & `/admin`).
7. 404 handler (JSON for API) → centralized `errorHandler`.
8. `http.createServer(app)` → `initializeSocket(server)` → listen → `connectDB()` → `setupDefaultAdmin()`.

### 4.2 API Route Map
| Mount | Router | Purpose |
|---|---|---|
| `/` | `adminDashboardRoutes` | All `/admin/*` EJS pages + admin CRUD + AI key settings |
| `/api/auth` | `authRoutes` | Admin JWT auth |
| `/api/customer` | `customerAuthRoutes` | **Customer auth** — signup/login w/ OTP, profile, avatar, addresses, chat REST |
| `/api/gemstones` | `gemstoneRoutes` | Public listing/detail/search; admin CRUD + stats |
| `/api/business` | `businessRoutes` | Business info, contact, SEO, policies (admin-managed) |
| `/api/upload` | `uploadRoutes` | Cloudinary uploads |
| `/api/payment` | `paymentRoutes` | Razorpay order create + verify |
| `/api` | `gemstoneAIRoutes` | `POST /gemstone-ai` (chat), status, reset |

### 4.3 Middleware (`middleware/auth.js`)
- `protect` — verifies Bearer JWT, loads `User`, checks `isActive`.
- `adminOnly` — restricts to `role: admin/super_admin`.
- `optionalAuth` — allows public access but attaches user when token valid.
- `errorHandler` — `AppError` + `asyncHandler` wrappers.

### 4.4 Data Models (`models/`)
| Model | Highlights |
|---|---|
| **Gemstone** | bilingual name (EN/Urdu), category, purpose[], color, priceRange, weight/ratti, certification, images (Cloudinary), SEO meta, discount, auto-slug, viewCount, static helpers (getTrending, getNewArrivals, search) |
| **Customer** | bcrypt password, OTP (email verify + password reset), addresses[] w/ default flag, wishlist refs, avatar, DOB, preferences |
| **User** | admin users with role (`admin`/`super_admin`) |
| **Message** | customer↔admin chat, sender, isRead, static conversation helpers |
| **BusinessInfo** | store info (contact, address, hours, social, SEO, policies) |
| **Category** | managed categories (add/delete/toggle) |
| **Settings** | DB key-value store (e.g. `ai_api_key` persisted from admin panel) |

### 4.5 Controllers
- `gemstoneController` — filtering ($in, regex, $text search), sort, pagination, Cloudinary image processing on create/update/delete, stats aggregation.
- `authController`, `businessController`, `adminDashboardController` — per-feature logic.
- Note: `customerAuthRoutes` contains its controllers inline (large route file).

### 4.6 Two Authentication Systems
| | Customers (SPA) | Admins (EJS dashboard) |
|---|---|---|
| Token | JWT in `localStorage` (`kohinoor_token`), `type: 'customer'` | Session cookie + MongoStore |
| Flow | OTP email verification → signup/login → `/api/customer/*` | `POST /admin/login` → session → `requireAuth` guards |
| Chat | JWT via Socket.IO `auth` handshake | session-based pages |

---

## 5. 🤖 Kohinoor AI — How It Works

A conversational gemstone advisor ("Kohinoor") with **conversation memory**, **emotional intelligence**, and **catalog-aware recommendations**. Lives in `backend/src/routes/gemstoneAIRoutes.js`.

### 5.1 End-to-End Flow

```
React (GemstoneAI.jsx)                 Express (gemstoneAIRoutes.js)
─────────────────────                  ──────────────────────────────
user types message
  │ aiService.chatWithAI(msg)
  │   (sessionId from sessionStorage)   POST /gemstone-ai
  │                                     │
  │                                     ▼
  │                               1. rate limit (30/hr/IP)
  │                                     │
  │                                     ▼
  │                               2. session lookup (Map)
  │                                  - 30 min timeout
  │                                  - create or resume history
  │                                     │
  │                                     ▼
  │                               3. merge userInfo
  │                                  (name, DOB→zodiac, place)
  │                                     │
  │                                     ▼
  │                               4. push user msg → history
  │                                     │
  │                                     ▼
  │                               5. extractContext(message)
  │                                  (regex NLP: name, budget,
  │                                   occasion, gem type, zodiac,
  │                                   color, purpose, DOB)
  │                                     │
  │                                     ▼
  │                               6. detectMood(message)
  │                                  (excited/confused/worried/
  │                                   urgent/skeptical/grateful/...)
  │                                     │
  │                                     ▼
  │                               7. getMatchingGemstones(context)
  │                                  - score ALL catalog gems
  │                                  - pick top 4 across categories
  │                                  - fallback: trending by views
  │                                     │
  │                                     ▼
  │                               8. buildMessages()
  │                                  system prompt = persona +
  │                                  mood instruction + known facts
  │                                  + expert knowledge +
  │                                  matching catalog entries
  │                                  + last 10 history turns
  │                                     │
  │                                     ▼
  │                               9. callAIMessages(messages)
  │                                  TIERED FALLBACK:
  │                                  T1 Groq llama-3.3-70b
  │                                  T2 Groq llama-3.1-8b
  │                                  T3 Mistral small
  │                                  T4 Pollinations (free)
  │                                     │
  │                                     ▼
  │                              10. clean response (strip **,
  │                                  role prefixes, quotes)
  │                                     │
  │                                     ▼
  │                              11. if empty → smart fallback
  │                                  (name-aware, references
  │                                   conversation, suggests gems)
  │                                     │
  │                                     ▼
  │                              12. push AI reply → history,
  │                                  save session, cleanup 10%
  │                                     │
  │                                     ▼
  │   ◄── response text + suggestedGemstones + extractedParams + mood
  ▼
render bubble + clickable gemstone cards (max 4) + "View all"
```

### 5.2 The Multi-Tier Provider Fallback (`callAIMessages`)
Guaranteed-availability design — tries providers in order, 8s timeout each, returns first valid text:

| Tier | Provider | Model | Cost |
|---|---|---|---|
| 1 | Groq | `llama-3.3-70b-versatile` | fast, free tier |
| 2 | Groq | `llama-3.1-8b-instant` | smaller/faster |
| 3 | Mistral | `mistral-small-latest` | good quality |
| 4 | Pollinations | text API | no auth, always free |
| 5 | **Hardcoded** | template replies | never fails |

All providers use an OpenAI-compatible `messages[]` payload → true multi-turn. Pollinations gets a flattened single prompt.

### 5.3 Context Extraction (regex-based NLP)
`extractContext()` parses user text into structured state merged across turns:
- **name** — "I'm Azhar", "my name is...", bare names (with stopword list)
- **budget** — ₹/rs/k/lakh patterns (converts to number, e.g. `50k` → 50000)
- **occasion** — wedding, engagement, anniversary, birthday, gift, astrological, investment
- **gemstoneType** — English + Hindi/Urdu aliases (neelam, panna, pukhraj, moti...)
- **zodiac** — sign names in EN/HI + **computed from DOB** (`getZodiacFromDate`)
- **color**, **purpose** (love/health/wealth/marriage/protection/peace/wisdom), **askingInfo**, **askingPrice**

### 5.4 Gemstone Matching (`getMatchingGemstones`)
Scores every active gemstone in the catalog:
- +50 specific gem type match
- +20 budget fits `priceRange`
- +15 occasion / purpose text match
- +10 color match
- +25 zodiac-recommended gem (per `ZODIAC_GEMSTONES` map)
- +5 trending bonus
Then **de-duplicates categories** to guarantee variety, fills remaining slots, shuffles, returns ≤4.

### 5.5 Persona & Prompt Engineering (`buildMessages`)
System prompt composes dynamically:
1. **Persona** — "Kohinoor", a warm gemstone friend from Bareilly; 2–4 sentence replies; forbidden robotic phrases ("As an AI", "I'd be happy to help"); one follow-up question max.
2. **Mood instruction** — adapts style to detected emotion (enthusiastic for excited, patient for confused, reassuring for worried...).
3. **Known facts** — name, zodiac, budget, occasion, gemstone, purpose, location.
4. **Expert knowledge** — per-gemstone `GEMSTONE_KNOWLEDGE` (planet, benefits, warnings, price guide).
5. **Catalog context** — matching gems with prices + summaries ("tell them to tap the cards below").
6. **History** — last 10 turns passed as real `user`/`assistant` messages.

### 5.6 Resilience
- **Smart fallback replies** when all providers fail — name-aware, references the conversation ("Sorry Azhar, I hit a small glitch... where were we?").
- **Error catch** → returns trending gemstones + friendly message with `isServiceDown: true` (never a hard 500 to the user).
- **Rate limit** 30/hr/IP; client also self-throttles.
- **Session cleanup** — 30-min inactivity timeout; 10% chance per request to sweep stale sessions.

### 5.7 Frontend Integration (`GemstoneAI.jsx` + `api.js: aiService`)
- Floating golden button → animated chat modal (Framer Motion).
- Session ID stored in `sessionStorage` (`kohinoor_ai_session`) for continuity; "reset" clears it.
- Quick-action chips (gift, wedding, zodiac, popular, purpose-based).
- Renders AI replies + **clickable gemstone cards** linking to detail pages.
- Logged-in users get personalized greetings; their name/DOB/place are sent to enrich context.
- Client-side fallback: if API fails, fetches trending gems and shows friendly message.

---

## 6. Realtime Chat (Socket.IO)

- `socketService.js` initializes Socket.IO on the same HTTP server.
- **Auth:** JWT in handshake (`auth.token` + `userType`), customers verified against DB.
- **Rooms:** customers join `customer:{id}`; admins join `admins`.
- **Events:** `sendMessage` (persists to `Message`, broadcasts, confirms via `messageSent`), `typing`, `markRead`, `joinChat`, online presence (`customerOnline`/`customerOffline`/`onlineCustomers`).
- **Fallback:** REST endpoints `/api/customer/chat/*` load history & unread counts.
- **Admin side:** `/admin/chats` EJS pages list conversations and reply.

---

## 7. Supporting Services

| Service | Usage | Files |
|---|---|---|
| **Razorpay** | create order + HMAC signature verification | `paymentRoutes.js`, `Checkout.jsx` |
| **Resend** | OTP, password-reset, welcome emails (black luxury templates) | `emailService.js` |
| **Cloudinary** | gemstone images, avatars (face-crop), base64 uploads, delete | `uploadRoutes.js`, `customerAuthRoutes.js`, `gemstoneController.js` |
| **MongoDB Atlas** | Mongoose 8, text indexes, MongoStore sessions | `config/database.js` |

---

## 8. Admin Dashboard (EJS)

Server-rendered under `/admin/*` with session auth:
- Login / forgot / reset / change password
- Dashboard with analytics (`/admin/api/analytics`)
- Gemstone CRUD + image upload + bulk ops + trending toggle
- Business info editor (contact, address, hours, social, SEO, policies, certifications)
- Category management, User management (delete cascades messages)
- **AI settings** — persist Gemini/OpenAI/MegaLLM API key to DB (`Settings` model) + key tester
- Chat console, Admin management (super-admin only)

---

## 9. Deployment

- **Docker** — `Dockerfile` (build frontend → serve from Express), `docker-compose.yml`
- **Heroku** — `heroku.yml` + `Procfile`
- **Vercel** — `vercel.json` (frontend only)
- **Render** — in CORS allowlist; SPA pings `/api/health` every 10 min to avoid cold starts
- **Env vars:** `MONGODB_URI`, `JWT_SECRET`, `GEMINI_API_KEY`, `CLOUDINARY_*`, `RAZORPAY_KEY_*`, `RESEND_API_KEY`, `FRONTEND_URL`, `VITE_API_BASE_URL`, `VITE_CLOUDINARY_*`
