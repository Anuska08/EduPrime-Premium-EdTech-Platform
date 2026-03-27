# EduPrime – Premium EdTech Platform

EduPrime is a modern, high-performance learning management system (LMS) frontend built with Next.js 14. It features a sophisticated glassmorphism design, real-time data fetching, and a personalized learning experience for students and educators.

## Key Features
- **Personalized Student Dashboard**: Real-time tracking of study hours, course progress, and upcoming class schedules.
- **Live Interactive Classes**: Real-time class tracking with countdown timers and direct join integration.
- **Comprehensive Test Series**: Mock exams with difficulty levels, instant analytics, and a global leaderboard.
- **AI-Powered Learning**: Personalized study recommendations and automated performance insights.
- **Dynamic Theming**: Fully integrated Dark and Light modes with persistent user preferences.
- **Secure Authentication**: JWT-based auth flow with protected API interceptors.

## Tech Stack
- **Framework**: Next.js 14
- **Styling**: Tailwind CSS with custom Glassmorphism tokens
- **Animations**: Framer Motion for smooth route transitions and scroll effects
- **Icons**: Lucide React
- **Data Fetching**: Axios & SWR for efficient API communication
- **State Management**: React Context API

## Project Structure
```plaintext
src/
├── app/              # App Router: Dashboards, Courses, Auth, Live Classes
├── components/       # UI Library: Cards, Navigation, Animated Sections
├── context/          # Global State: Auth (JWT) and Theme (Dark/Light)
├── lib/              # Utils: Axios instance (api.ts) and Tailwind Merge (utils.ts)
└── styles/           # Global CSS and Design Tokens
```

## Getting Started

### Prerequisites
- Node.js 18+
- Backend API running

### Installation

**Clone the Repository**
```bash
git clone https://github.com/Anuska08/EduPrime.git
```

**Install Dependencies**
```bash
npm install --legacy-peer-deps
```

**Environment Setup**

Create a `.env` file

**Run Development Server**
```bash
npm run dev
```

## Security & Performance
- **JWT Interceptor**: Automatically attaches Authorization headers to every outgoing request if a token exists in localStorage.
- **Global Error Handling**: Centralized handling of `401 Unauthorized` errors to ensure secure session management.
- **Optimized Rendering**: Uses `framer-motion` for hardware-accelerated animations and SWR for "stale-while-revalidate" data fetching.