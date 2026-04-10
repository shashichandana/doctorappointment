const express = require('express');
const { body } = require('express-validator');
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public
router.post(
  '/register',
  [
    body('name', 'Name is required').trim().notEmpty(),
    body('email', 'Please include a valid email').isEmail(),
    body('password', 'Password must be at least 6 characters').isLength({
      min: 6,
    }),
    body('role', 'Role must be patient, doctor, or admin').optional().isIn([
      'patient',
      'doctor',
      'admin',
    ]),
    body('phone', 'Phone must be 10 digits').optional().matches(/^\d{10}$/),
  ],
  authController.registerUser
);

// @route   POST /api/auth/login
// @desc    Login user
// @access  Public
router.post(
  '/login',
  [
    body('email', 'Please include a valid email').isEmail(),
    body('password', 'Password is required').exists(),
  ],
  authController.loginUser
);

// @route   GET /api/auth/me
// @desc    Get current logged in user
// @access  Private
router.get('/me', authMiddleware, authController.getMe);

// @route   PUT /api/auth/update-profile
// @desc    Update user profile
// @access  Private
router.put(
  '/update-profile',
  authMiddleware,
  [
    body('name', 'Name is required').optional().trim().notEmpty(),
    body('phone', 'Phone must be 10 digits')
      .optional()
      .matches(/^\d{10}$/),
  ],
  authController.updateProfile
);

module.exports = router;
