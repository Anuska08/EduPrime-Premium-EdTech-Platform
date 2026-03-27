# EduPrime – Premium EdTech Platform

EduPrime is a full-stack, production-ready learning management system (LMS). It features a sophisticated glassmorphism frontend and a robust backend engine. The platform is designed to provide a personalized learning experience for students, extensive management tools for educators, and granular control for administrators.

## Key Features

### Core Platform
- **Role-Based Access Control (RBAC)**: Granular permissions tailored for Student, Teacher, and Admin roles.
- **Subscription System**: Tiered plans (Starter, Pro Learner, Enterprise) to gate premium content.
- **Dynamic Theming**: Fully integrated Dark and Light modes with persistent user preferences throughout the platform.
- **Interactive UI**: A sophisticated glassmorphism design with hardware-accelerated animations using Framer Motion.

### Learning & Management
- **Course Engine**: Full CRUD support, advanced filtering (by category, level, price), and text-based search indexing.
- **Personalized Student Dashboard**: Real-time tracking of study hours, course progress, enrolled courses count, average scores, and upcoming class schedules.
- **Progress Tracking**: Automatically calculates course completion percentages based on chapters completed and tracks total study hours.
- **Live Interactive Classes**: Comprehensive scheduling system for real-time classes featuring countdown timers, attendee limits, instructor assignments, and direct join integration.
- **Comprehensive Test Series**: An auto-grading engine for MCQ tests that calculates scores, percentages, tracks time taken, provides instant analytics, and supports a global leaderboard (hiding correct answers during the attempt).
- **AI-Powered Learning**: Personalized study recommendations and automated performance insights.

## Tech Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS with custom Glassmorphism tokens
- **Animations**: Framer Motion for smooth route transitions and scroll effects
- **Icons**: Lucide React
- **Data Fetching**: Axios & SWR for efficient, "stale-while-revalidate" API communication
- **State Management**: React Context API

### Backend
- **Runtime & Framework**: Node.js & Express.js
- **Database**: MongoDB with Mongoose ODM
- **Security**: JWT (JSON Web Tokens) & Bcrypt.js for password hashing. JWT Interceptors automatically secure outgoing front-end requests.
- **Validation**: Express-validator for robust input sanitization

## Project Architecture

The project consists of two main codebases:

### Frontend (`edtech/`)
```plaintext
src/
├── app/              # App Router: Dashboards, Courses, Auth, Live Classes
├── components/       # UI Library: Cards, Navigation, Animated Sections
├── context/          # Global State: Auth (JWT) and Theme (Dark/Light)
├── lib/              # Utils: Axios instance (api.ts) and Tailwind Merge (utils.ts)
└── styles/           # Global CSS and Design Tokens
```

### Backend (`edtechbe/`)
Follows the MVC (Model-View-Controller) pattern:
```plaintext
src/
├── models/           # Mongoose schemas (Users, Courses, Tests, etc.)
├── controllers/      # Logical processing & database interactions
├── routes/           # API endpoint definitions mapping
└── middleware/       # JWT Auth, authorization, validation & error handling
```

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB instance (local or MongoDB Atlas)

### 1. Backend Setup
**Clone the Backend Repository (if applicable) or navigate to `edtechbe/`**:
```bash
git clone https://github.com/Anuska08/eduprime-backend.git
```
**Install Dependencies**:
```bash
npm install
```
**Environment Configuration**:
Create a `.env` file in the root directory and configure necessary environment variables
**Start the Server**:
```bash
node server.js
```

### 2. Frontend Setup
**Clone the Frontend Repository (if applicable) or navigate to `edtech/`**:
```bash
git clone https://github.com/Anuska08/EduPrime.git
```
**Install Dependencies**:
```bash
npm install --legacy-peer-deps
```
**Environment Configuration**:
Create a `.env` file in the root directory and configure necessary variables
**Run Development Server**:
```bash
npm run dev
```

## Security & Performance Highlights
- **JWT Flow & Interceptor**: Secure, stateless authentication with protected API interceptors attaching Authorization headers automatically.
- **Global Error Handling**: Centralized handling for the API and frontend components (e.g., managing `401 Unauthorized` responses gracefully).
- **Optimized Rendering**: Lightning-fast data updates via SWR in React and optimized route loading via Next.js.
