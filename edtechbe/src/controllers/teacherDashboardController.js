const Course = require('../models/Course');
const Enrollment = require('../models/Enrollment');
const LiveClass = require('../models/LiveClass');
const TestResult = require('../models/TestResult');

// @desc   Get aggregated teacher dashboard data
// @route  GET /api/teacher/dashboard
const getTeacherDashboard = async (req, res, next) => {
  try {
    const instructorId = req.user.id;

    // All courses by this teacher
    const courses = await Course.find({ instructor: instructorId }).sort({ createdAt: -1 });

    const courseIds = courses.map((c) => c._id);

    // Total unique students enrolled across teacher's courses
    const totalStudents = await Enrollment.countDocuments({ course: { $in: courseIds } });

    // Upcoming live classes taught by this teacher
    const upcomingClasses = await LiveClass.find({
      instructor: instructorId,
      scheduledAt: { $gte: new Date() },
    })
      .sort({ scheduledAt: 1 })
      .limit(5);

    // Average rating across all published courses (weighted by reviews)
    const ratingData = courses.filter((c) => c.reviews > 0);
    const avgRating =
      ratingData.length > 0
        ? (
            ratingData.reduce((sum, c) => sum + c.rating * c.reviews, 0) /
            ratingData.reduce((sum, c) => sum + c.reviews, 0)
          ).toFixed(1)
        : '—';

    res.json({
      success: true,
      stats: {
        totalCourses: courses.length,
        publishedCourses: courses.filter((c) => c.isPublished).length,
        totalStudents,
        upcomingClassesCount: upcomingClasses.length,
        avgRating,
      },
      courses,
      upcomingClasses,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { getTeacherDashboard };
