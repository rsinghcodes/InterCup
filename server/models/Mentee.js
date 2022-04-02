const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

const menteeSchema = new Schema({
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
    default: false,
  },
  global_rank: {
    type: Number,
    default: 0,
  },
  profession: {
    type: String,
  },
  college: {
    type: String,
  },
});

menteeSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(this.password, salt);

  this.password = hash;

  next();
});

menteeSchema.methods.isValidPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = model('Mentee', menteeSchema);
