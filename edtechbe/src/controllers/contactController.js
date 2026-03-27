const ContactInquiry = require('../models/ContactInquiry');

// @desc   Submit contact form
// @route  POST /api/contact
const submitContact = async (req, res, next) => {
  try {
    const { name, email, phone, subject, message } = req.body;
    const inquiry = await ContactInquiry.create({ name, email, phone, subject, message });
    res.status(201).json({ success: true, message: 'Your inquiry has been received. We will get back to you shortly.', id: inquiry._id });
  } catch (err) {
    next(err);
  }
};

// @desc   Get all inquiries (admin only)
// @route  GET /api/contact
const getInquiries = async (req, res, next) => {
  try {
    const inquiries = await ContactInquiry.find().sort({ createdAt: -1 });
    res.json({ success: true, count: inquiries.length, inquiries });
  } catch (err) {
    next(err);
  }
};

// @desc   Mark inquiry as resolved (admin)
// @route  PUT /api/contact/:id
const resolveInquiry = async (req, res, next) => {
  try {
    const inquiry = await ContactInquiry.findByIdAndUpdate(req.params.id, { status: 'resolved' }, { new: true });
    if (!inquiry) return res.status(404).json({ success: false, message: 'Inquiry not found' });
    res.json({ success: true, inquiry });
  } catch (err) {
    next(err);
  }
};

module.exports = { submitContact, getInquiries, resolveInquiry };
