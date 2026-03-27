const Course = require('../models/Course');

// @desc   List / filter / search courses
// @route  GET /api/courses
const getCourses = async (req, res, next) => {
  try {
    const { search, category, level, price, sort, page = 1, limit = 12 } = req.query;
    const query = { isPublished: true };

    if (search) query.$text = { $search: search };
    if (category && category !== 'All') query.category = category;
    if (level && level !== 'All') query.level = level;
    if (price === 'free') query.isFree = true;
    if (price === 'paid') query.isFree = false;

    let sortObj = { students: -1 }; // default: Most Popular
    if (sort === 'Highest Rated') sortObj = { rating: -1 };
    else if (sort === 'Newest') sortObj = { createdAt: -1 };
    else if (sort === 'Price: Low to High') sortObj = { price: 1 };
    else if (sort === 'Price: High to Low') sortObj = { price: -1 };

    const skip = (Number(page) - 1) * Number(limit);
    const total = await Course.countDocuments(query);
    const courses = await Course.find(query).sort(sortObj).skip(skip).limit(Number(limit));

    res.json({ success: true, total, page: Number(page), pages: Math.ceil(total / limit), courses });
  } catch (err) {
    next(err);
  }
};

// @desc   Get single course
// @route  GET /api/courses/:id
const getCourse = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id).populate('instructor', 'name avatar bio');
    if (!course) return res.status(404).json({ success: false, message: 'Course not found' });
    res.json({ success: true, course });
  } catch (err) {
    next(err);
  }
};

// @desc   Create course
// @route  POST /api/courses
const createCourse = async (req, res, next) => {
  try {
    req.body.instructor = req.user.id;
    req.body.instructorName = req.user.name;
    const course = await Course.create(req.body);
    res.status(201).json({ success: true, course });
  } catch (err) {
    next(err);
  }
};

// @desc   Update course
// @route  PUT /api/courses/:id
const updateCourse = async (req, res, next) => {
  try {
    let course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ success: false, message: 'Course not found' });
    if (course.instructor.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }
    course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    res.json({ success: true, course });
  } catch (err) {
    next(err);
  }
};

// @desc   Delete course
// @route  DELETE /api/courses/:id
const deleteCourse = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ success: false, message: 'Course not found' });
    await course.deleteOne();
    res.json({ success: true, message: 'Course deleted' });
  } catch (err) {
    next(err);
  }
};

module.exports = { getCourses, getCourse, createCourse, updateCourse, deleteCourse };
