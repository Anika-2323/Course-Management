require('dotenv').config();
const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const User = require('./models/User');
const Course = require('./models/Course');
const Enrollment = require('./models/Enrollment');
const LearningProgress = require('./models/LearningProgress');
const Notification = require('./models/Notification');
const Message = require('./models/Message');

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected for seeding...');

    // Clear existing collections
    await User.deleteMany();
    await Course.deleteMany();
    await Enrollment.deleteMany();
    await LearningProgress.deleteMany();
    await Notification.deleteMany();
    await Message.deleteMany();
    console.log('Cleared existing data.');

    // Hash passwords
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('password123', salt);

    // Create default users
    const users = await User.create([
      {
        name: 'Instructor Jane',
        email: 'instructor@example.com',
        password: hashedPassword,
        role: 'admin',
      },
      {
        name: 'Student Alex',
        email: 'student@example.com',
        password: hashedPassword,
        role: 'student',
      },
    ]);

    const instructor = users[0];
    const student = users[1];

    // Create initial courses
    const courses = await Course.create([
      {
        title: 'Full-Stack Web Development with MERN',
        description: 'Comprehensive guide to building modern apps with MongoDB, Express, React, and Node.js.',
        instructor: instructor._id,
        category: 'Web Development',
        level: 'Intermediate',
        duration: 10, // numeric value
        lessons: [
          { title: 'Introduction to Node & Express', duration: '45 mins' },
          { title: 'MongoDB & Mongoose Schemas', duration: '60 mins' },
          { title: 'React Frontend Integration', duration: '75 mins' },
        ],
      },
      {
        title: 'Data Structures and Algorithms in JavaScript',
        description: 'Master core CS fundamentals, algorithms, and dynamic problem solving.',
        instructor: instructor._id,
        category: 'Computer Science',
        level: 'Beginner',
        duration: 8, // numeric value
        lessons: [
          { title: 'Big-O Notation & Arrays', duration: '40 mins' },
          { title: 'Linked Lists & Trees', duration: '65 mins' },
        ],
      },
    ]);

    // Create initial notification for student
    await Notification.create({
      recipient: student._id,
      title: 'Welcome to the Platform',
      message: 'Explore our catalog and enroll in your first course!',
      type: 'info',
    });

    console.log('Database seeded successfully:');
    console.log('- Instructor: instructor@example.com / password123');
    console.log('- Student: student@example.com / password123');
    console.log(`- Courses seeded: ${courses.length}`);

    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error.message);
    process.exit(1);
  }
};

seedData();