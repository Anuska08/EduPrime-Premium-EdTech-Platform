const mongoose = require('mongoose');

const LiveClassSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    subject: { type: String, required: true },
    instructor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    instructorName: { type: String, required: true },
    scheduledAt: { type: Date, required: true },
    duration: { type: Number, default: 60 }, // minutes
    joinUrl: { type: String, default: '' },
    color: { type: String, default: '#6060f0' },
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
    isLive: { type: Boolean, default: false },
    maxAttendees: { type: Number, default: 500 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('LiveClass', LiveClassSchema);
