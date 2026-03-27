const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./src/config/db');
const errorHandler = require('./src/middleware/errorHandler');

// Load env
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Body parser
app.use(express.json());

// CORS
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
}));

// Health check
app.get('/', (req, res) => {
  res.json({ success: true, message: '🎓 EduPrime API is running', version: '1.0.0' });
});

// Routes
app.use('/api/auth', require('./src/routes/auth'));
app.use('/api/users', require('./src/routes/users'));
app.use('/api/courses', require('./src/routes/courses'));
app.use('/api/enrollments', require('./src/routes/enrollments'));
app.use('/api/progress', require('./src/routes/progress'));
app.use('/api/live-classes', require('./src/routes/liveClasses'));
app.use('/api/tests', require('./src/routes/tests'));
app.use('/api/dashboard', require('./src/routes/dashboard'));
app.use('/api/teacher', require('./src/routes/teacher'));
app.use('/api/contact', require('./src/routes/contact'));
app.use('/api/subscriptions', require('./src/routes/subscriptions'));

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found` });
});

// Global error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT} [${process.env.NODE_ENV}]`);
});
