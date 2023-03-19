const { check } = require('express-validator');
const { validatorMiddleWare } = require('../middleware/validatorMiddleWare');
exports.signupValidator = [
  check('name')
    .notEmpty().withMessage('Name must be required')
    .isLength({ min: 3, max: 50 }).withMessage('Name must be between 3 t0 50'),
  check('email')
    .notEmpty().withMessage('E-mail required')
    .isEmail().withMessage('E-mail invalid'),
  check('password')
    .notEmpty().withMessage('Password required')
    .isLength({ min: 6 }).withMessage('Password greater than 6 '),
  validatorMiddleWare,
];

exports.loginValidator = [
  check('email')
  .notEmpty().withMessage('E-mail required')
  .isEmail().withMessage('E-mail invalid'),
check('password')
  .notEmpty().withMessage('Password required')
  .isLength({ min: 6 }).withMessage('Password greater than 6 '),
validatorMiddleWare,
]