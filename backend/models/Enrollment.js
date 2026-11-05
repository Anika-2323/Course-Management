const mongoose = require("mongoose");

const enrollmentSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true
    },
    status: {
      type: String,
      enum: ["active", "completed", "withdrawn"],
      default: "active"
    },
    completedModules: {
      type: [{ type: String, trim: true }],
      default: []
    },
    progress: {
      type: Number,
      min: 0,
      max: 100,
      default: 0
    },
    enrolledAt: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

enrollmentSchema.index({ student: 1, course: 1 }, { unique: true });

module.exports = mongoose.model("Enrollment", enrollmentSchema);