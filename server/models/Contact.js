const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
  // This 'user' field links each contact to a specific user
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user', // Refers to the 'user' model we just created
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('contact', ContactSchema);