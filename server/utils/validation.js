const { body, param, query, validationResult } = require('express-validator');

// Common validation rules
const commonValidations = {
  email: body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  
  password: body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number'),
  
  phone: body('phone')
    .matches(/^[0-9]{10,15}$/)
    .withMessage('Please provide a valid phone number'),
  
  uuid: param('id')
    .isUUID()
    .withMessage('Invalid ID format'),
  
  pagination: [
    query('page')
      .optional()
      .isInt({ min: 1 })
      .withMessage('Page must be a positive integer'),
    query('limit')
      .optional()
      .isInt({ min: 1, max: 100 })
      .withMessage('Limit must be between 1 and 100')
  ]
};

// User validation rules
const userValidations = {
  register: [
    body('firstName')
      .trim()
      .isLength({ min: 2, max: 50 })
      .withMessage('First name must be between 2 and 50 characters'),
    body('lastName')
      .trim()
      .isLength({ min: 2, max: 50 })
      .withMessage('Last name must be between 2 and 50 characters'),
    commonValidations.email,
    commonValidations.password,
    body('confirmPassword')
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error('Password confirmation does not match password');
        }
        return true;
      }),
    body('phone')
      .optional()
      .matches(/^[0-9]{10,15}$/)
      .withMessage('Please provide a valid phone number')
  ],
  
  login: [
    commonValidations.email,
    body('password')
      .notEmpty()
      .withMessage('Password is required')
  ],
  
  updateProfile: [
    body('firstName')
      .optional()
      .trim()
      .isLength({ min: 2, max: 50 })
      .withMessage('First name must be between 2 and 50 characters'),
    body('lastName')
      .optional()
      .trim()
      .isLength({ min: 2, max: 50 })
      .withMessage('Last name must be between 2 and 50 characters'),
    body('phone')
      .optional()
      .matches(/^[0-9]{10,15}$/)
      .withMessage('Please provide a valid phone number'),
    body('dateOfBirth')
      .optional()
      .isISO8601()
      .withMessage('Please provide a valid date'),
    body('gender')
      .optional()
      .isIn(['male', 'female', 'other'])
      .withMessage('Gender must be male, female, or other')
  ]
};

// Provider validation rules
const providerValidations = {
  create: [
    body('businessName')
      .trim()
      .isLength({ min: 2, max: 200 })
      .withMessage('Business name must be between 2 and 200 characters'),
    body('description')
      .optional()
      .isLength({ max: 1000 })
      .withMessage('Description must not exceed 1000 characters'),
    body('cityId')
      .isUUID()
      .withMessage('Please select a valid city'),
    body('address')
      .trim()
      .isLength({ min: 10 })
      .withMessage('Address must be at least 10 characters long'),
    commonValidations.phone,
    commonValidations.email,
    body('hourlyRate')
      .isFloat({ min: 0 })
      .withMessage('Hourly rate must be a positive number'),
    body('experience')
      .optional()
      .isInt({ min: 0, max: 50 })
      .withMessage('Experience must be between 0 and 50 years'),
    body('qualifications')
      .optional()
      .isArray()
      .withMessage('Qualifications must be an array'),
    body('certifications')
      .optional()
      .isArray()
      .withMessage('Certifications must be an array'),
    body('specializations')
      .optional()
      .isArray()
      .withMessage('Specializations must be an array'),
    body('languages')
      .optional()
      .isArray()
      .withMessage('Languages must be an array')
  ],
  
  update: [
    body('businessName')
      .optional()
      .trim()
      .isLength({ min: 2, max: 200 })
      .withMessage('Business name must be between 2 and 200 characters'),
    body('description')
      .optional()
      .isLength({ max: 1000 })
      .withMessage('Description must not exceed 1000 characters'),
    body('cityId')
      .optional()
      .isUUID()
      .withMessage('Please select a valid city'),
    body('address')
      .optional()
      .trim()
      .isLength({ min: 10 })
      .withMessage('Address must be at least 10 characters long'),
    body('phone')
      .optional()
      .matches(/^[0-9]{10,15}$/)
      .withMessage('Please provide a valid phone number'),
    body('email')
      .optional()
      .isEmail()
      .normalizeEmail()
      .withMessage('Please provide a valid email address'),
    body('hourlyRate')
      .optional()
      .isFloat({ min: 0 })
      .withMessage('Hourly rate must be a positive number'),
    body('experience')
      .optional()
      .isInt({ min: 0, max: 50 })
      .withMessage('Experience must be between 0 and 50 years')
  ]
};

// Booking validation rules
const bookingValidations = {
  create: [
    body('providerId')
      .isUUID()
      .withMessage('Please select a valid provider'),
    body('serviceId')
      .isUUID()
      .withMessage('Please select a valid service'),
    body('cityId')
      .isUUID()
      .withMessage('Please select a valid city'),
    body('scheduledDate')
      .isISO8601()
      .custom((value) => {
        const date = new Date(value);
        const now = new Date();
        if (date <= now) {
          throw new Error('Scheduled date must be in the future');
        }
        return true;
      })
      .withMessage('Please select a valid future date'),
    body('duration')
      .isInt({ min: 1, max: 24 })
      .withMessage('Duration must be between 1 and 24 hours'),
    body('address')
      .trim()
      .isLength({ min: 10 })
      .withMessage('Address must be at least 10 characters long'),
    body('notes')
      .optional()
      .isLength({ max: 500 })
      .withMessage('Notes must not exceed 500 characters')
  ],
  
  update: [
    body('scheduledDate')
      .optional()
      .isISO8601()
      .custom((value) => {
        const date = new Date(value);
        const now = new Date();
        if (date <= now) {
          throw new Error('Scheduled date must be in the future');
        }
        return true;
      })
      .withMessage('Please select a valid future date'),
    body('duration')
      .optional()
      .isInt({ min: 1, max: 24 })
      .withMessage('Duration must be between 1 and 24 hours'),
    body('address')
      .optional()
      .trim()
      .isLength({ min: 10 })
      .withMessage('Address must be at least 10 characters long'),
    body('notes')
      .optional()
      .isLength({ max: 500 })
      .withMessage('Notes must not exceed 500 characters'),
    body('status')
      .optional()
      .isIn(['pending', 'confirmed', 'in_progress', 'completed', 'cancelled', 'rejected'])
      .withMessage('Invalid status')
  ]
};

// Review validation rules
const reviewValidations = {
  create: [
    body('providerId')
      .isUUID()
      .withMessage('Please select a valid provider'),
    body('bookingId')
      .isUUID()
      .withMessage('Please select a valid booking'),
    body('rating')
      .isInt({ min: 1, max: 5 })
      .withMessage('Rating must be between 1 and 5'),
    body('title')
      .optional()
      .trim()
      .isLength({ max: 200 })
      .withMessage('Title must not exceed 200 characters'),
    body('comment')
      .optional()
      .trim()
      .isLength({ max: 1000 })
      .withMessage('Comment must not exceed 1000 characters')
  ]
};

// Helper function to handle validation results
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: 'Validation Error',
      details: errors.array().map(err => ({
        field: err.path,
        message: err.msg
      }))
    });
  }
  next();
};

module.exports = {
  commonValidations,
  userValidations,
  providerValidations,
  bookingValidations,
  reviewValidations,
  handleValidationErrors
}; 