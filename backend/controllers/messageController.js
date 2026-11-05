const Message = require('../models/Message');

// @desc    Send a message
// @route   POST /api/messages
// @access  Private
const sendMessage = async (req, res) => {
  try {
    const { receiverId, courseId, content } = req.body;

    if (!receiverId || !content) {
      return res.status(400).json({ message: 'Receiver and content are required' });
    }

    const message = await Message.create({
      sender: req.user.id,
      receiver: receiverId,
      course: courseId || null,
      content,
    });

    return res.status(201).json(message);
  } catch (error) {
    return res.status(500).json({ message: 'Error sending message', error: error.message });
  }
};

// @desc    Get conversation history between current user and another user
// @route   GET /api/messages/:otherUserId
// @access  Private
const getConversation = async (req, res) => {
  try {
    const currentUserId = req.user.id;
    const { otherUserId } = req.params;

    const messages = await Message.find({
      $or: [
        { sender: currentUserId, receiver: otherUserId },
        { sender: otherUserId, receiver: currentUserId },
      ],
    })
      .populate('sender', 'name email role')
      .populate('receiver', 'name email role')
      .populate('course', 'title')
      .sort({ createdAt: 1 });

    return res.status(200).json(messages);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching conversation', error: error.message });
  }
};

module.exports = {
  sendMessage,
  getConversation,
};