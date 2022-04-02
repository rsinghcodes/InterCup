const Validator = require('validator');
const isEmpty = require('is-empty');

const ValidateLogin = (data) => {
  let errors = {};

  data.email = !isEmpty(data.email) ? data.email : ''; // Email checks
  data.password = !isEmpty(data.password) ? data.password : '';

  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email field is required';
  } else if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

const validateSignUp = (data) => {
  let errors = {};

  data.fullname = !isEmpty(data.fullname) ? data.fullname : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';

  if (Validator.isEmpty(data.fullname)) {
    errors.fullname = 'Fullname field is required';
  }
  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email field is required';
  } else if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password field is required';
  }
  if (!Validator.isLength(data.password, { min: 6, max: 20 })) {
    errors.password = 'Password must be at least 6 characters';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

module.exports = {
  ValidateLogin,
  validateSignUp,
};
