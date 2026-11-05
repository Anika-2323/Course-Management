const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    courseCode: {
      type: String,
      trim: true,
    },
    category: {
      type: String,
      required: true,
    },
    level: {
      type: String,
      enum: ['Beginner', 'Intermediate', 'Advanced', 'Beginner to Advanced'],
      default: 'Beginner',
    },
    duration: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      default: 'Active',
    },
    instructorName: {
      type: String,
      trim: true,
    },
    modules: {
      type: [{ type: String, trim: true }],
      default: [],
    },
    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    lessons: [
      {
        title: { type: String, required: true },
        duration: { type: String },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Course', courseSchema);