const Progress = require('../models/Progress');
const User = require('../models/User');

// @desc   Get progress for a course
// @route  GET /api/progress/:courseId
const getProgress = async (req, res, next) => {
  try {
    const progress = await Progress.findOne({ user: req.user.id, course: req.params.courseId });
    if (!progress) return res.status(404).json({ success: false, message: 'No progress found' });
    res.json({ success: true, progress });
  } catch (err) {
    next(err);
  }
};

// @desc   Update progress for a course
// @route  PUT /api/progress/:courseId
const updateProgress = async (req, res, next) => {
  try {
    const { currentChapter, studyHours } = req.body;
    const progress = await Progress.findOne({ user: req.user.id, course: req.params.courseId });
    if (!progress) return res.status(404).json({ success: false, message: 'Progress record not found, enroll first' });

    if (currentChapter !== undefined) progress.currentChapter = currentChapter;
    if (studyHours !== undefined) {
      progress.studyHours += studyHours;
      await User.findByIdAndUpdate(req.user.id, { $inc: { totalStudyHours: studyHours } });
    }

    progress.progressPercent = Math.min(100, Math.round((progress.currentChapter / progress.totalChapters) * 100));
    progress.lastAccessedAt = new Date();
    await progress.save();

    res.json({ success: true, progress });
  } catch (err) {
    next(err);
  }
};

// @desc   Get all progress records for the current user
// @route  GET /api/progress
const getAllProgress = async (req, res, next) => {
  try {
    const records = await Progress.find({ user: req.user.id })
      .populate('course', 'title thumbnail category totalChapters')
      .sort({ lastAccessedAt: -1 });
    res.json({ success: true, records });
  } catch (err) {
    next(err);
  }
};

module.exports = { getProgress, updateProgress, getAllProgress };
