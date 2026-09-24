# Mini KAAL AI Backend

## Overview
This is the backend for the Mini KAAL AI Guidance App. It provides an API for user authentication and generating AI-based guidance inspired by the Bhagavad Gita using Groq 2.5 Flash.

## Features
- JWT Authentication (Register, Login, Me)
- Secure password hashing with bcryptjs
- Groq 2.5 Flash integration for AI Guidance
- PostgreSQL Database with Prisma ORM
- Zod Request Validation
- Rate Limiting and Helmet Security
- Error Handling

## Tech Stack
- Node.js & TypeScript
- Express.js
- PostgreSQL
- Prisma ORM
- Google Groq API
- Zod

## Prerequisites
- Node.js (v18+)
- PostgreSQL Database

## Installation

1. Clone the repository and navigate to the backend folder:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Setup environment variables:
   Copy `.env.example` to `.env` and fill in the details:
   ```bash
   cp .env.example .env
   ```

## PostgreSQL & Prisma Setup

1. Make sure your PostgreSQL server is running and the database specified in `DATABASE_URL` is accessible.
2. Run Prisma Migrations:
   ```bash
   npx prisma generate
   npx prisma migrate dev --name init
   ```

## Running Locally

Development mode:
```bash
npm run dev
```

Production build:
```bash
npm run build
npm start
```

## API Documentation

### Authentication
- **POST** `/api/v1/auth/register` - Register a new user
- **POST** `/api/v1/auth/login` - Login to an existing account
- **GET** `/api/v1/auth/me` - Get current authenticated user details (Requires Auth Header)

### Guidance
- **POST** `/api/v1/guidance` - Generate new AI guidance (Requires Auth Header)
- **GET** `/api/v1/guidance` - Retrieve user's guidance history with pagination (Requires Auth Header)
- **GET** `/api/v1/guidance/:id` - Retrieve a single specific guidance (Requires Auth Header)
- **DELETE** `/api/v1/guidance/:id` - Delete a specific guidance (Requires Auth Header)

### Health
- **GET** `/health` - Check API Health

## Testing
Unit tests are written for core functionalities.
```bash
npm run test
```
