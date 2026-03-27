const express = require('express');
const router = express.Router();
const { submitContact, getInquiries, resolveInquiry } = require('../controllers/contactController');
const { protect, authorize } = require('../middleware/auth');
const { body } = require('express-validator');
const validate = require('../middleware/validate');

router.post('/', validate([
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('subject').notEmpty().withMessage('Subject is required'),
  body('message').isLength({ min: 10 }).withMessage('Message must be at least 10 characters'),
]), submitContact);

router.get('/', protect, authorize('admin'), getInquiries);
router.put('/:id', protect, authorize('admin'), resolveInquiry);

module.exports = router;
