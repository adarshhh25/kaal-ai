# KAAL AI 🪷

> **Ancient Wisdom. Modern Clarity.**

KAAL AI is a contemplative web application designed to provide users with thoughtful guidance and clarity inspired by the timeless wisdom of the **Bhagavad Gita**. 

In a world filled with mental noise, career anxiety, and relationship crossroads, KAAL AI acts as a quiet sanctuary. It translates esoteric Vedic principles into structured, modern psychological clarity to help you reflect, decouple your worth from external outcomes, and take actionable next steps.

---

## 🌟 Features

- **Interactive Chat Interface**: A beautifully designed, distraction-free guidance portal where users can share their dilemmas and receive profound insights.
- **Vedic Synthesis Engine**: Powered by the **Groq API**, the AI provides structured 4-tier insights (Reflection, Gita Wisdom, Situation Application, and Immediate Practice).
- **History & Reflection Tracking**: Securely saves your past inquiries to your profile so you can revisit your moments of contemplation.
- **Premium UI/UX**: Built with a highly bespoke design system utilizing glassmorphism, subtle micro-animations, and a calming aesthetic perfect for a meditative state of mind.
- **User Authentication**: Secure JWT-based login and registration to ensure private, personalized sanctuaries for every user.

---

## 🛠️ Tech Stack

### Frontend
- **React.js** (v18)
- **TypeScript**
- **Vite** (for blazing fast bundling)
- **Tailwind CSS** (for highly customized utility-first styling)
- **React Router** (for seamless client-side routing)

### Backend
- **Node.js & Express.js**
- **TypeScript**
- **Prisma ORM** (for robust and type-safe database access)
- **PostgreSQL** (Relational Database)
- **Groq API** (for lightning-fast LLM inference)
- **JWT & bcrypt** (for authentication and security)

---

## 🚀 Getting Started

Follow these steps to set up the project locally.

### 1. Prerequisites
- Node.js (v18 or higher)
- PostgreSQL (Ensure it is installed and running locally, or have an external connection string ready)
- A Groq API Key (You can get one at [console.groq.com](https://console.groq.com/))

### 2. Clone the Repository
\`\`\`bash
git clone <your-repo-url>
cd Kaalai
\`\`\`

### 3. Backend Setup
Navigate to the \`backend\` directory and install dependencies:
\`\`\`bash
cd backend
npm install
\`\`\`

Create a \`.env\` file in the \`backend\` folder with the following variables:
\`\`\`env
PORT=5000
DATABASE_URL="postgresql://<user>:<password>@localhost:5432/kaalai?schema=public"
JWT_SECRET="your-super-secret-jwt-key"
GROQ_API_KEY="your-groq-api-key"
FRONTEND_URL="http://localhost:5173"
\`\`\`

Run Prisma migrations to set up your database schema:
\`\`\`bash
npx prisma migrate dev --name init
\`\`\`

Start the backend development server:
\`\`\`bash
npm run dev
\`\`\`

### 4. Frontend Setup
Open a new terminal, navigate to the \`frontend\` directory, and install dependencies:
\`\`\`bash
cd frontend
npm install
\`\`\`

Create a \`.env\` file in the \`frontend\` folder:
\`\`\`env
VITE_API_URL=http://localhost:5000/api/v1
\`\`\`

Start the frontend Vite development server:
\`\`\`bash
npm run dev
\`\`\`

### 5. Access the App
The application should now be running. 
- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:5000

---

## 📂 Project Structure

\`\`\`
Kaalai/
│
├── backend/
│   ├── prisma/             # Database schema and migrations
│   ├── src/
│   │   ├── controllers/    # Route controllers (Auth, Guidance)
│   │   ├── middleware/     # Auth checks, validation, error handling
│   │   ├── repositories/   # Prisma database queries
│   │   ├── routes/         # Express routing definitions
│   │   ├── services/       # Business logic (Groq API integration)
│   │   └── index.ts        # Server entry point
│
└── frontend/
    ├── public/             # Static assets
    ├── src/
    │   ├── components/     # Reusable UI components
    │   ├── context/        # React Context (AuthContext)
    │   ├── layouts/        # Protected routing and shell layouts
    │   ├── pages/          # Full page views (Home, Guidance, Auth)
    │   ├── services/       # API fetch wrappers
    │   ├── App.tsx         # Root component
    │   └── index.css       # Global styling and Tailwind directives
\`\`\`

---

## 📜 Philosophy

> *"You have a right to perform your prescribed duty, but you are not entitled to the fruits of action."* — **Bhagavad Gita 2.47**

KAAL AI reads intention, not grammar. Responses generated are meant for deep personal reflection and are not professional, medical, or legal advice. 

---

## 🤝 Contributing
Contributions, issues, and feature requests are welcome! Feel free to check the issues page if you want to contribute.

## 📄 License
© 2025 KAAL AI. All Rights Reserved.
