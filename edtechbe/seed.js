/**
 * Seed script – populates MongoDB with sample EdTech data from the frontend.
 * Run: node seed.js
 */
const dotenv = require('dotenv');
const mongoose = require('mongoose');
dotenv.config();

const User = require('./src/models/User');
const Course = require('./src/models/Course');
const LiveClass = require('./src/models/LiveClass');
const Subscription = require('./src/models/Subscription');
const Test = require('./src/models/Test');

const seed = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('✅ Connected to MongoDB');

  // Clear existing data
  await Promise.all([User.deleteMany(), Course.deleteMany(), LiveClass.deleteMany(), Subscription.deleteMany(), Test.deleteMany()]);
  console.log('🗑️  Cleared existing data');

  // --- Users ---
  const admin = await User.create({ name: 'Admin', email: 'admin@eduprime.com', password: 'Admin1234', role: 'admin' });
  const teacher1 = await User.create({ name: 'Dr. Arvind Kumar', email: 'arvind@eduprime.com', password: 'Teacher123', role: 'teacher', bio: 'IIT Delhi PhD in Physics. 18 yrs experience.', streak: 42 });
  const teacher2 = await User.create({ name: 'Priya Sharma', email: 'priya@eduprime.com', password: 'Teacher123', role: 'teacher', bio: 'IIM-A alumna and mathematics enthusiast. 12 yrs experience.' });
  const teacher3 = await User.create({ name: 'Rahul Mehta', email: 'rahul@eduprime.com', password: 'Teacher123', role: 'teacher', bio: 'Ex-Google engineer. Author of 3 bestselling tech courses.' });
  const teacher4 = await User.create({ name: 'Meera Iyer', email: 'meera@eduprime.com', password: 'Teacher123', role: 'teacher', bio: 'UPSC expert educator with 15 yrs experience.' });
  await User.create({ name: 'Anuska', email: 'student@eduprime.com', password: 'Student123', role: 'student', streak: 14, plan: 'Pro Learner' });

  console.log('👤 Users seeded');

  // --- Courses ---
  await Course.insertMany([
    { title: 'Complete JEE Physics Masterclass 2025', description: 'Master JEE Physics from basics to advanced with Dr. Arvind Kumar.', instructor: teacher1._id, instructorName: teacher1.name, category: 'JEE Preparation', level: 'Advanced', price: 4999, originalPrice: 12999, isFree: false, thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&auto=format', badge: 'Best Seller', duration: '220h', totalChapters: 22, totalLessons: 220, rating: 4.9, reviews: 28400, students: 340000 },
    { title: 'UPSC 2025 – Complete Prelims + Mains Strategy', description: 'Full UPSC preparation strategy for both Prelims and Mains.', instructor: teacher4._id, instructorName: teacher4.name, category: 'Civil Services', level: 'Intermediate', price: 7999, originalPrice: 18999, isFree: false, thumbnail: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&auto=format', badge: 'Trending', duration: '300h', totalChapters: 30, totalLessons: 300, rating: 4.8, reviews: 15600, students: 180000 },
    { title: 'Python & Data Science Bootcamp', description: 'Comprehensive Python and Data Science course for beginners.', instructor: teacher3._id, instructorName: teacher3.name, category: 'Technology', level: 'Beginner', price: 2999, originalPrice: 8999, isFree: false, thumbnail: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&auto=format', badge: 'New', duration: '80h', totalChapters: 12, totalLessons: 80, rating: 4.7, reviews: 42100, students: 520000 },
    { title: 'Class 12 Mathematics – Board + JEE', description: 'Complete Class 12 Maths for board exams and JEE Mains.', instructor: teacher2._id, instructorName: teacher2.name, category: 'School', level: 'Intermediate', price: 0, isFree: true, thumbnail: 'https://images.unsplash.com/photo-1596496181848-3091d4878b24?w=800&auto=format', badge: '', duration: '150h', totalChapters: 15, totalLessons: 150, rating: 4.8, reviews: 31200, students: 410000 },
    { title: 'NEET Biology 2025 – Complete Preparation', description: 'Complete NEET Biology preparation with Dr. Sunita Rao.', instructor: teacher1._id, instructorName: 'Dr. Sunita Rao', category: 'NEET Preparation', level: 'Advanced', price: 5999, originalPrice: 14999, isFree: false, thumbnail: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&auto=format', badge: 'Top Rated', duration: '200h', totalChapters: 20, totalLessons: 200, rating: 4.9, reviews: 22000, students: 280000 },
    { title: 'English Communication & IELTS Mastery', description: 'Ace IELTS and improve your English communication skills.', instructor: teacher2._id, instructorName: 'Anita Bose', category: 'Language', level: 'Beginner', price: 1999, originalPrice: 5999, isFree: false, thumbnail: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=800&auto=format', badge: '', duration: '60h', totalChapters: 8, totalLessons: 60, rating: 4.6, reviews: 18500, students: 220000 },
    { title: 'Stock Market & Personal Finance 101', description: 'Learn investing basics and personal finance management.', instructor: teacher3._id, instructorName: 'Vikram Sood', category: 'Finance', level: 'Beginner', price: 0, isFree: true, thumbnail: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&auto=format', badge: '', duration: '45h', totalChapters: 6, totalLessons: 45, rating: 4.7, reviews: 14200, students: 165000 },
    { title: 'CAT 2025 – Quantitative Ability Deep Dive', description: 'Master Quant for CAT 2025 with detailed problem solving.', instructor: teacher4._id, instructorName: 'Manish Gupta', category: 'MBA', level: 'Advanced', price: 3999, originalPrice: 9999, isFree: false, thumbnail: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&auto=format', badge: 'New', duration: '100h', totalChapters: 10, totalLessons: 100, rating: 4.8, reviews: 9800, students: 120000 },
  ]);

  console.log('📚 Courses seeded');

  // --- Live Classes ---
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const dayAfter = new Date();
  dayAfter.setDate(dayAfter.getDate() + 2);

  await LiveClass.insertMany([
    { title: 'Live: Gravitation – Final Revision', subject: 'Physics', instructorName: teacher1.name, instructor: teacher1._id, scheduledAt: new Date(tomorrow.setHours(15, 0, 0)), color: '#6060f0', duration: 90 },
    { title: 'Live: Constitutional Amendments', subject: 'Polity', instructorName: teacher4.name, instructor: teacher4._id, scheduledAt: new Date(tomorrow.setHours(18, 30, 0)), color: '#f59e0b', duration: 60 },
    { title: 'Live: Pandas & Data Wrangling', subject: 'Python', instructorName: teacher3.name, instructor: teacher3._id, scheduledAt: new Date(dayAfter.setHours(17, 0, 0)), color: '#10b981', duration: 75 },
  ]);

  console.log('🎥 Live classes seeded');

  // --- Subscriptions ---
  await Subscription.insertMany([
    { name: 'Starter', monthlyPrice: 0, yearlyPrice: 0, description: "Perfect for exploring EduPrime's content library.", features: ['Access to 200+ free courses', '5 practice tests/month', 'Community forums access', 'Mobile app access', 'Basic progress tracking'], cta: 'Get Started Free', isPopular: false },
    { name: 'Pro Learner', monthlyPrice: 799, yearlyPrice: 599, description: 'Everything you need to ace competitive exams.', features: ['All Starter features', 'Unlimited course access (1,200+)', 'Unlimited test series', 'Live class attendance', 'AI study planner', 'Doubt resolution within 2h', 'Offline downloads', 'Certificate of completion'], cta: 'Start Pro Trial', isPopular: true },
    { name: 'Enterprise', monthlyPrice: 2499, yearlyPrice: 1999, description: 'For institutions, coaching centres, and corporates.', features: ['All Pro features', 'Custom branding & white-label', 'Bulk student management', 'Advanced analytics dashboard', 'Dedicated account manager', 'API access & integrations', 'SLA-backed support', 'Custom course creation'], cta: 'Contact Sales', isPopular: false },
  ]);

  console.log('💳 Subscriptions seeded');

  // --- Sample Test ---
  await Test.create({
    title: 'JEE Physics – Motion Mock Test',
    category: 'JEE Preparation',
    duration: 30,
    totalMarks: 10,
    questions: [
      { question: 'A body moving with uniform acceleration covers 20m in 4s. What is the acceleration?', options: ['1 m/s²', '2.5 m/s²', '5 m/s²', '10 m/s²'], correctAnswer: 1, marks: 1 },
      { question: 'Which law states that every action has an equal and opposite reaction?', options: ['Newton\'s 1st Law', 'Newton\'s 2nd Law', 'Newton\'s 3rd Law', 'Law of Conservation of Momentum'], correctAnswer: 2, marks: 1 },
      { question: 'The unit of force in SI system is:', options: ['Dyne', 'Newton', 'Joule', 'Pascal'], correctAnswer: 1, marks: 1 },
    ],
  });

  console.log('📝 Tests seeded');
  console.log('\n✅ Seeding complete!\n');
  console.log('Accounts created:');
  console.log('  Admin  → admin@eduprime.com / Admin1234');
  console.log('  Teacher → arvind@eduprime.com / Teacher123');
  console.log('  Student → student@eduprime.com / Student123');

  mongoose.disconnect();
};

seed().catch((err) => {
  console.error('Seed error:', err);
  process.exit(1);
});
