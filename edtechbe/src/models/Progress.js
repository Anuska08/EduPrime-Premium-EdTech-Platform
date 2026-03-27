const mongoose = require('mongoose');

const ProgressSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    currentChapter: { type: Number, default: 0 },
    totalChapters: { type: Number, default: 1 },
    progressPercent: { type: Number, default: 0, min: 0, max: 100 },
    studyHours: { type: Number, default: 0 },
    lastAccessedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

ProgressSchema.index({ user: 1, course: 1 }, { unique: true });

module.exports = mongoose.model('Progress', ProgressSchema);
