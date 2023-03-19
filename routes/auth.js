const express = require('express');
const router = express.Router();

const {
  register,
  login
} = require('../controllers/auth');
const {
  signupValidator,
  loginValidator,
} = require('../validators/userValidator')

router.post('/register', signupValidator, register);
router.post('/login', loginValidator, login);

module.exports = router;