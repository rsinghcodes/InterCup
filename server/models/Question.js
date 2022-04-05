const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

const questionSchema = new Schema({
  topic: {
    type: String,
    required: true,
  },
  question: {
    type: String,
    required: true,
    unique: true,
  },
  answer: {
    type: String,
    required: true,
  },
  marks: {
    type: Number,
    required: true,
    default: 1,
  },
});

module.exports = model('Question', questionSchema);
