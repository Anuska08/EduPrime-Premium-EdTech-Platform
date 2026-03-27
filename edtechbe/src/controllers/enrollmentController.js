const Enrollment = require('../models/Enrollment');
const Course = require('../models/Course');
const Progress = require('../models/Progress');

// @desc   Enroll in a course
// @route  POST /api/enrollments
const enroll = async (req, res, next) => {
  try {
    const { courseId } = req.body;
    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ success: false, message: 'Course not found' });

    const enrollment = await Enrollment.create({ user: req.user.id, course: courseId });

    // Also create a progress record
    await Progress.create({ user: req.user.id, course: courseId, totalChapters: course.totalChapters || 1 });

    // Increment students count
    await Course.findByIdAndUpdate(courseId, { $inc: { students: 1 } });

    res.status(201).json({ success: true, enrollment });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ success: false, message: 'Already enrolled in this course' });
    }
    next(err);
  }
};

// @desc   Get my enrolled courses
// @route  GET /api/enrollments/mine
const getMyEnrollments = async (req, res, next) => {
  try {
    const enrollments = await Enrollment.find({ user: req.user.id })
      .populate('course', 'title thumbnail category level instructor instructorName rating duration')
      .sort({ enrolledAt: -1 });
    res.json({ success: true, count: enrollments.length, enrollments });
  } catch (err) {
    next(err);
  }
};

// @desc   Get all enrollments for a course (admin/teacher)
// @route  GET /api/enrollments/course/:courseId
const getCourseEnrollments = async (req, res, next) => {
  try {
    const enrollments = await Enrollment.find({ course: req.params.courseId })
      .populate('user', 'name email avatar');
    res.json({ success: true, count: enrollments.length, enrollments });
  } catch (err) {
    next(err);
  }
};

module.exports = { enroll, getMyEnrollments, getCourseEnrollments };
