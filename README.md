# Kohinoor Gemstone

A modern full-stack e-commerce platform for authentic gemstones, featuring AI-powered recommendations and real-time customer support.

![Kohinoor Gemstone](https://img.shields.io/badge/Project-E--Commerce-blue) ![React](https://img.shields.io/badge/React-18.0-black) ![Node.js](https://img.shields.io/badge/Node.js-18.0-green) ![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green)

## Overview

Kohinoor Gemstone is a comprehensive e-commerce solution built for a premium gemstone business. This project demonstrates modern web development practices including:

- Full-stack architecture with React and Node.js
- AI integration using Google Gemini for intelligent recommendations
- Real-time communication with Socket.io
- Secure authentication with JWT
- Cloud-based image storage with Cloudinary
- Responsive design with TailwindCSS

## Tech Stack

### Frontend
- **React 18** - Modern UI library with hooks
- **Vite** - Fast build tool and dev server
- **TailwindCSS** - Utility-first CSS framework
- **Context API** - State management without Redux
- **Axios** - HTTP client for API calls
- **Socket.io Client** - Real-time WebSocket communication

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database with Mongoose ODM
- **Socket.io** - Real-time bidirectional communication
- **JWT** - JSON Web Tokens for authentication
- **Nodemailer** - Email service integration
- **Cloudinary** - Cloud image management

### AI & Services
- **Google Gemini AI** - AI-powered gemstone recommendations
- **Cloudinary** - Image upload and optimization
- **MongoDB Atlas** - Cloud database hosting

## Key Features

### Customer Experience
- **Product Catalog** - Browse gemstones with advanced filtering by category, purpose, and color
- **AI Assistant** - Intelligent gemstone recommendations powered by Google Gemini
- **Real-time Chat** - Live customer support with instant messaging
- **Shopping Cart** - Add items to cart with quantity management
- **Wishlist** - Save favorite gemstones for later
- **Search** - Quick search by name (English and Urdu)
- **Authentication** - Secure signup with email verification
- **Dark/Light Mode** - Toggle between themes
- **Mobile Responsive** - Optimized for all screen sizes

### Admin Dashboard
- **Product Management** - Add, edit, and delete gemstones
- **Image Upload** - Multiple image uploads with Cloudinary
- **User Management** - View and manage customer accounts
- **Chat Management** - Respond to customer inquiries
- **Business Settings** - Configure shop information and contact details
- **Analytics** - View product views and engagement metrics

## Project Structure

```
kohinoorGemstone/
├── backend/
│   ├── src/
│   │   ├── config/          # Database configuration
│   │   ├── controllers/     # Business logic handlers
│   │   ├── middleware/      # Express middleware (auth, error handling)
│   │   ├── models/          # Mongoose schemas (User, Gemstone, Customer)
│   │   ├── routes/          # API endpoints
│   │   ├── services/        # External services (email, socket)
│   │   ├── views/           # EJS templates for admin panel
│   │   └── server.js        # Application entry point
│   ├── package.json
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── components/      # Reusable React components
│   │   │   ├── auth/        # Authentication components
│   │   │   ├── common/      # Shared components (Header, Footer, etc.)
│   │   │   ├── gemstone/    # Gemstone-specific components
│   │   │   └── layout/      # Layout components
│   │   ├── context/         # React Context providers
│   │   ├── pages/           # Route pages (Home, Shop, Profile, etc.)
│   │   ├── services/        # API service layer
│   │   ├── config/          # Configuration files
│   │   ├── App.jsx          # Main app component
│   │   └── main.jsx         # React entry point
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── .env.example
├── Dockerfile
├── docker-compose.yml
└── README.md
```

## Installation

### Prerequisites
- Node.js 18 or higher
- MongoDB (local or Atlas account)
- Cloudinary account
- Google Gemini API key
- Git

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env
```

4. Configure environment variables:
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
GEMINI_API_KEY=your_gemini_api_key
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
FRONTEND_URL=http://localhost:5173
```

5. Start development server:
```bash
npm run dev
```

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env
```

4. Configure environment variables:
```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
```

5. Start development server:
```bash
npm run dev
```

### Access the Application

- Frontend: http://localhost:5173
- Backend API: http://localhost:5000/api
- Admin Panel: http://localhost:5000/admin

## Deployment

### Frontend (Vercel)

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy from frontend directory:
```bash
cd frontend
vercel
```

3. Set environment variables in Vercel dashboard:
   - `VITE_API_BASE_URL` = Your deployed backend URL
   - `VITE_SOCKET_URL` = Your deployed backend URL

### Backend (Render)

1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Configure build settings:
   - Build Command: `npm install`
   - Start Command: `npm start`
4. Add environment variables from your backend `.env` file
5. Deploy

### Database (MongoDB Atlas)

1. Create a free cluster on MongoDB Atlas
2. Create a database user with read/write permissions
3. Whitelist IP addresses (use 0.0.0.0/0 for all IPs)
4. Get the connection string and add to backend environment variables

## API Endpoints

### Authentication
- `POST /api/customer/signup` - Register new customer
- `POST /api/customer/verify-email` - Verify email with OTP
- `POST /api/customer/signin` - Customer login
- `POST /api/auth/login` - Admin login

### Gemstones
- `GET /api/gemstones` - Get all gemstones with filters
- `GET /api/gemstones/trending` - Get trending gemstones
- `GET /api/gemstones/:id` - Get single gemstone details
- `POST /api/gemstones` - Create gemstone (admin only)

### AI Features
- `POST /api/gemstone-ai/chat` - Chat with AI assistant
- `GET /api/gemstone-ai/suggestions` - Get AI recommendations

### Chat
- `GET /api/customer/chat/messages` - Get chat history
- `POST /api/customer/chat/send` - Send message

## Developer

**Tuba Mirza** - Full Stack Developer

- Portfolio: [tubamirza.vercel.app](https://tubamirza.vercel.app/)
- GitHub: [@mirzasayzz](https://github.com/mirzasayzz)
- Email: tubamirza822@gmail.com

## License

This project is shared for portfolio demonstration purposes only. Unauthorized commercial use is prohibited.

---

Built with ❤️ by Tuba Mirza
