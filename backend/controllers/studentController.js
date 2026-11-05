const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const publicFields = "name email role createdAt updatedAt";

async function getStudents(req, res, next) {
  try {
    const students = await User.find({
      role: "student"
    }).select(publicFields);
    res.json({ students });
  } catch (error) {
    next(error);
  }
}

async function getStudentById(req, res, next) {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        message: "Invalid student ID"
      });
    }
    const student = await User.findOne({
      _id: req.params.id,
      role: "student"
    }).select(publicFields);

    if (!student) {
      return res.status(404).json({
        message: "Student not found"
      });
    }

    res.json({ student });
  } catch (error) {
    next(error);
  }
}

async function createStudent(req, res, next) {
  try {
    const { name, email, password } = req.body;
    if (
      typeof name !== "string" ||
      !name.trim() ||
      typeof email !== "string" ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
      typeof password !== "string" ||
      password.length < 12
    ) {
      return res.status(400).json({
        message: "Valid name, email and password are required"
      });
    }

    const normalizedEmail = email.trim().toLowerCase();
    if (await User.exists({ email: normalizedEmail })) {
      return res.status(409).json({
        message: "Email already registered"
      });
    }

    const student = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      password: await bcrypt.hash(password, 12),
      role: "student"
    });

    res.status(201).json({
      message: "Student created",
      student: {
        id: student.id,
        name: student.name,
        email: student.email,
        role: student.role
      }
    });
  } catch (error) {
    next(error);
  }
}

async function updateStudent(req, res, next) {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        message: "Invalid student ID"
      });
    }

    const updates = {};
    if (req.body.name !== undefined) {
      if (
        typeof req.body.name !== "string" ||
        !req.body.name.trim()
      ) {
        return res.status(400).json({
          message: "Invalid name"
        });
      }
      updates.name = req.body.name.trim();
    }

    if (req.body.email !== undefined) {
      if (
        typeof req.body.email !== "string" ||
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(req.body.email)
      ) {
        return res.status(400).json({
          message: "Invalid email"
        });
      }
      updates.email = req.body.email.trim().toLowerCase();
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({
        message: "No valid fields supplied"
      });
    }

    const student = await User.findOneAndUpdate(
      { _id: id, role: "student" },
      { $set: updates },
      { new: true, runValidators: true }
    ).select(publicFields);

    if (!student) {
      return res.status(404).json({
        message: "Student not found"
      });
    }

    res.json({
      message: "Student updated",
      student
    });
  } catch (error) {
    next(error);
  }
}

async function deleteStudent(req, res, next) {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        message: "Invalid student ID"
      });
    }

    const student = await User.findOneAndDelete({
      _id: req.params.id,
      role: "student"
    });

    if (!student) {
      return res.status(404).json({
        message: "Student not found"
      });
    }

    res.json({ message: "Student deleted" });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent
};