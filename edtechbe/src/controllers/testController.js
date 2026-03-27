const Test = require('../models/Test');
const TestResult = require('../models/TestResult');

// @desc   Get all tests
// @route  GET /api/tests
const getTests = async (req, res, next) => {
  try {
    const { category } = req.query;
    const query = { isPublished: true };
    if (category) query.category = new RegExp(category, 'i');
    const tests = await Test.find(query).select('-questions').populate('course', 'title');
    res.json({ success: true, count: tests.length, tests });
  } catch (err) {
    next(err);
  }
};

// @desc   Get single test (with questions, but without correct answers)
// @route  GET /api/tests/:id
const getTest = async (req, res, next) => {
  try {
    const test = await Test.findById(req.params.id)
      .select('-questions.correctAnswer')
      .populate('course', 'title');
    if (!test) return res.status(404).json({ success: false, message: 'Test not found' });
    res.json({ success: true, test });
  } catch (err) {
    next(err);
  }
};

// @desc   Create test (admin/teacher)
// @route  POST /api/tests
const createTest = async (req, res, next) => {
  try {
    const test = await Test.create(req.body);
    res.status(201).json({ success: true, test });
  } catch (err) {
    next(err);
  }
};

// @desc   Submit test answers
// @route  POST /api/tests/:id/submit
const submitTest = async (req, res, next) => {
  try {
    const { answers, timeTaken } = req.body;
    const test = await Test.findById(req.params.id);
    if (!test) return res.status(404).json({ success: false, message: 'Test not found' });

    let score = 0;
    test.questions.forEach((q, i) => {
      if (answers[i] !== undefined && answers[i] === q.correctAnswer) {
        score += q.marks || 1;
      }
    });

    const totalMarks = test.questions.reduce((sum, q) => sum + (q.marks || 1), 0);
    const percentage = totalMarks > 0 ? Math.round((score / totalMarks) * 100) : 0;

    const result = await TestResult.create({
      user: req.user.id,
      test: test._id,
      answers,
      score,
      totalMarks,
      percentage,
      timeTaken: timeTaken || 0,
    });

    res.status(201).json({ success: true, result: { score, totalMarks, percentage, resultId: result._id } });
  } catch (err) {
    next(err);
  }
};

// @desc   Get test result for current user
// @route  GET /api/tests/:id/result
const getTestResult = async (req, res, next) => {
  try {
    const result = await TestResult.findOne({ user: req.user.id, test: req.params.id })
      .sort({ submittedAt: -1 })
      .populate('test', 'title totalMarks');
    if (!result) return res.status(404).json({ success: false, message: 'No result found' });
    res.json({ success: true, result });
  } catch (err) {
    next(err);
  }
};

module.exports = { getTests, getTest, createTest, submitTest, getTestResult };
