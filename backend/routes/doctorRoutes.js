const express = require('express');
const { body } = require('express-validator');
const doctorController = require('../controllers/doctorController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

const router = express.Router();

// @route   GET /api/doctors
// @desc    Get all doctors with pagination and filtering
// @access  Public
router.get('/', doctorController.getAllDoctors);

// @route   GET /api/doctors/:id
// @desc    Get doctor by ID
// @access  Public
router.get('/:id', doctorController.getDoctorById);

// @route   POST /api/doctors
// @desc    Create a new doctor (Admin only)
// @access  Private/Admin
router.post(
  '/',
  authMiddleware,
  roleMiddleware('admin'),
  [
    body('name', 'Name is required').trim().notEmpty(),
    body('email', 'Valid email is required').isEmail(),
    body('specialty', 'Specialty is required').notEmpty(),
    body(
      'specialty',
      'Invalid specialty'
    ).isIn([
      'Cardiology',
      'Neurology',
      'Orthopedics',
      'Pediatrics',
      'Dermatology',
      'ENT',
      'General Practice',
      'Psychiatry',
      'Ophthalmology',
    ]),
    body('experience', 'Experience in years is required')
      .isInt({ min: 0 })
      .toInt(),
    body('fee', 'Consultation fee is required').isFloat({ min: 0 }).toFloat(),
    body('degree', 'Degree is required').notEmpty(),
    body('about', 'About is required').optional().trim(),
  ],
  doctorController.createDoctor
);

// @route   PUT /api/doctors/:id
// @desc    Update doctor (Admin or Doctor themselves)
// @access  Private
router.put(
  '/:id',
  authMiddleware,
  [
    body('name', 'Name is required').optional().trim().notEmpty(),
    body('specialty', 'Invalid specialty')
      .optional()
      .isIn([
        'Cardiology',
        'Neurology',
        'Orthopedics',
        'Pediatrics',
        'Dermatology',
        'ENT',
        'General Practice',
        'Psychiatry',
        'Ophthalmology',
      ]),
    body('experience', 'Experience in years must be valid')
      .optional()
      .isInt({ min: 0 })
      .toInt(),
    body('fee', 'Consultation fee must be valid')
      .optional()
      .isFloat({ min: 0 })
      .toFloat(),
    body('degree', 'Degree is required').optional().notEmpty(),
  ],
  doctorController.updateDoctor
);

// @route   DELETE /api/doctors/:id
// @desc    Delete doctor (Admin only)
// @access  Private/Admin
router.delete(
  '/:id',
  authMiddleware,
  roleMiddleware('admin'),
  doctorController.deleteDoctor
);

// @route   POST /api/doctors/:id/reviews
// @desc    Add a review to a doctor
// @access  Private
router.post(
  '/:id/reviews',
  authMiddleware,
  [
    body('rating', 'Rating must be between 1 and 5')
      .isInt({ min: 1, max: 5 })
      .toInt(),
    body('comment', 'Comment is required').optional().trim().notEmpty(),
  ],
  doctorController.addReview
);

// @route   GET /api/doctors/stats/dashboard
// @desc    Get doctor dashboard statistics
// @access  Private/Doctor
router.get(
  '/stats/dashboard',
  authMiddleware,
  roleMiddleware('doctor'),
  doctorController.getDoctorStats
);

module.exports = router;
