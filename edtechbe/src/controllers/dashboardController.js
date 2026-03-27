const Enrollment = require('../models/Enrollment');
const Progress = require('../models/Progress');
const TestResult = require('../models/TestResult');
const LiveClass = require('../models/LiveClass');
const User = require('../models/User');

// @desc   Get aggregated dashboard data for current user
// @route  GET /api/dashboard
const getDashboard = async (req, res, next) => {
  try {
    const userId = req.user.id;

    // Enrolled courses count
    const enrollmentCount = await Enrollment.countDocuments({ user: userId });

    // Completed courses
    const completedCount = await Enrollment.countDocuments({ user: userId, isCompleted: true });

    // Total tests taken
    const testsTaken = await TestResult.countDocuments({ user: userId });

    // Average test score
    const testStats = await TestResult.aggregate([
      { $match: { user: req.user._id } },
      { $group: { _id: null, avgScore: { $avg: '$percentage' } } },
    ]);
    const avgScore = testStats.length ? Math.round(testStats[0].avgScore) : 0;

    // In-progress courses with progress
    const progressRecords = await Progress.find({ user: userId, progressPercent: { $lt: 100 } })
      .sort({ lastAccessedAt: -1 })
      .limit(3)
      .populate('course', 'title thumbnail category totalChapters');

    // User info (email, streak, study hours)
    const user = await User.findById(userId).select('name email streak totalStudyHours plan badges');

    // Upcoming live classes (next 2) - global or explicitly invited
    const upcomingClasses = await LiveClass.find({ 
      scheduledAt: { $gte: new Date() },
      $or: [
        { invitedEmails: { $size: 0 } },
        { invitedEmails: user.email.toLowerCase() }
      ]
    })
      .sort({ scheduledAt: 1 })
      .limit(2)
      .populate('instructor', 'name');

    res.json({
      success: true,
      stats: {
        totalStudyHours: user.totalStudyHours,
        coursesEnrolled: enrollmentCount,
        coursesCompleted: completedCount,
        testsTaken,
        avgScore,
        streak: user.streak,
        plan: user.plan,
        badges: user.badges,
      },
      continueLearning: progressRecords,
      upcomingClasses,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { getDashboard };
