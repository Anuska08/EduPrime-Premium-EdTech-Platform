const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema(
  {
    title: { type: String, required: [true, 'Title is required'], trim: true },
    description: { type: String, default: '' },
    instructor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    instructorName: { type: String, required: true },
    category: {
      type: String,
      required: true,
      enum: ['JEE Preparation', 'NEET Preparation', 'Civil Services', 'Technology', 'School', 'MBA', 'Finance', 'Language', 'Other'],
    },
    level: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'], default: 'Beginner' },
    price: { type: Number, default: 0 },
    originalPrice: { type: Number, default: 0 },
    isFree: { type: Boolean, default: false },
    thumbnail: { type: String, default: '' },
    badge: { type: String, default: '' },
    duration: { type: String, default: '' },
    totalLessons: { type: Number, default: 0 },
    totalChapters: { type: Number, default: 0 },
    rating: { type: Number, default: 0, min: 0, max: 5 },
    reviews: { type: Number, default: 0 },
    students: { type: Number, default: 0 },
    tags: [{ type: String }],
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// Text index for search
CourseSchema.index({ title: 'text', description: 'text', category: 'text' });

module.exports = mongoose.model('Course', CourseSchema);
