const { check } = require('express-validator');
const { validatorMiddleWare } = require('../middleware/validatorMiddleWare');

exports.createJobValidator = [
  check('company')
    .notEmpty().withMessage('Company required')
    .isLength({ max: 50 }).withMessage('Company name less than 50 character'),
  check('position')
    .notEmpty().withMessage('Position required')
    .isLength({ max: 100 }).withMessage('Position name less than 50 character'),
  validatorMiddleWare
];

exports.getJobValidator = [
  check('id')
    .notEmpty().withMessage('Job id required')
    .isMongoId().withMessage('Invalid job id format'),
  validatorMiddleWare,
];

exports.updateJobValidator = [
  check('id')
    .notEmpty().withMessage('Job id required')
    .isMongoId().withMessage('Invalid job id format'),
  validatorMiddleWare,
];

exports.deleteJobValidator = [
  check('id')
    .notEmpty().withMessage('Job id required')
    .isMongoId().withMessage('Invalid job id format'),
  validatorMiddleWare,
];