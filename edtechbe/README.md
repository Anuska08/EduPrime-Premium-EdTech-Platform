# EduPrime Backend API

The EduPrime Backend is a robust, production-ready RESTful API built with Node.js, Express, and MongoDB. It serves as the core engine for the EduPrime EdTech platform, managing complex relationships between users, courses, live classes, and automated assessments.

## Tech Stack
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Security**: JWT (JSON Web Tokens) & Bcrypt.js for password hashing
- **Validation**: Express-validator for robust input sanitization

## Key Features
- **Role-Based Access Control (RBAC)**: Granular permissions for student, teacher, and admin roles.
- **Course Engine**: Supports full CRUD, advanced filtering (by category, level, price), and text-based search indexing.
- **Progress Tracking**: Automatically calculates completion percentages based on chapters completed and tracks total study hours.
- **Live Class Management**: Scheduling system for real-time classes with attendee limits and instructor assignments.
- **Automated Test Series**: Auto-grading engine for MCQ tests that calculates scores, percentages, and tracks time taken.
- **Subscription System**: Tiered plans (Starter, Pro Learner, Enterprise) to gate premium content.

## Project Architecture
The project follows the MVC (Model-View-Controller) pattern for clean separation of concerns:
- `src/models/`: Mongoose schemas defining data structures for Users, Courses, Tests, etc.
- `src/controllers/`: Logical processing and database interactions.
- `src/routes/`: API endpoint definitions and middleware mapping.
- `src/middleware/`: Authentication, authorization, validation, and global error handling.

## API Endpoints

### Authentication & User
- `POST /api/auth/register` - Register a new user.
- `POST /api/auth/login` - Login and receive JWT.
- `GET /api/auth/me` - Get current user profile (Protected).
- `GET /api/users/instructors` - List all teachers (Public).

### Courses & Learning
- `GET /api/courses` - Search and filter courses.
- `POST /api/enrollments` - Enroll in a course.
- `PUT /api/progress/:courseId` - Update lesson progress and study hours.
- `GET /api/dashboard` - Get aggregated student stats (enrolled count, avg score, streak).

### Assessments & Live Classes
- `GET /api/tests/:id` - Fetch test questions (hides correct answers).
- `POST /api/tests/:id/submit` - Submit answers for auto-grading.
- `GET /api/live-classes` - View upcoming live session schedule.

## Environment Variables
Create a `.env` file in the root directory

## Installation & Setup

**Clone the repository:**
```bash
git clone https://github.com/Anuska08/eduprime-backend.git
```

**Install dependencies:**
```bash
npm install
```

**Start the server:**
```bash
node server.js
```