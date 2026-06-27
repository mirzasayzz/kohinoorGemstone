# Kohinoor Gemstone

A modern e-commerce platform for authentic gemstones, built with full-stack technologies.

## Overview

This project showcases a complete e-commerce solution for a premium gemstone business. It features product browsing, AI-powered recommendations, real-time chat, and secure authentication.

## Tech Stack

**Frontend**
- React 18 with Vite
- TailwindCSS for styling
- Context API for state management

**Backend**
- Node.js with Express
- MongoDB with Mongoose
- Socket.io for real-time features
- JWT authentication

**Integrations**
- Google Gemini AI for recommendations
- Cloudinary for image storage
- Nodemailer for email services

## Key Features

- Product catalog with advanced filtering
- AI-powered gemstone assistant
- Real-time customer support chat
- Shopping cart and wishlist
- Customer authentication with email verification
- Admin dashboard for product management
- Dark/light mode toggle
- Mobile-first responsive design

## Project Structure

```
kohinoorGemstone/
├── backend/          # Node.js/Express API
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   └── services/
│   └── package.json
├── frontend/         # React application
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   └── services/
│   └── package.json
└── README.md
```

## Installation

### Prerequisites
- Node.js 18+
- MongoDB
- Cloudinary account
- Google Gemini API key

### Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Configure environment variables
npm run dev
```

### Frontend Setup
```bash
cd frontend
npm install
cp .env.example .env
# Configure environment variables
npm run dev
```

## Deployment

- Frontend: Vercel
- Backend: Render
- Database: MongoDB Atlas
- Images: Cloudinary

## Developer

Built by [Tuba Mirza](https://github.com/mirzasayzz)

---

This repository is shared for portfolio demonstration purposes only.
