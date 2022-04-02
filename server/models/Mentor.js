const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

const mentorSchema = new Schema({
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isVerified: {
    type: Boolean,
    required: true,
  },
  bio: {
    type: String,
  },
  achievements: {
    type: String,
  },
  worksAt: {
    type: String,
  },
});

mentorSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(this.password, salt);

  this.password = hash;

  next();
});

mentorSchema.methods.isValidPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = model('Mentor', mentorSchema);
