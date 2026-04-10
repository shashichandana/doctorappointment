const express = require('express');
const { body } = require('express-validator');
const appointmentController = require('../controllers/appointmentController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

const router = express.Router();

// @route   POST /api/appointments
// @desc    Book a new appointment
// @access  Private/Patient
router.post(
  '/',
  authMiddleware,
  roleMiddleware('patient'),
  [
    body('doctorId', 'Doctor ID is required').isMongoId(),
    body('date', 'Date is required and must be valid')
      .isISO8601()
      .toDate(),
    body('timeSlot', 'Time slot is required').matches(/^\d{2}:\d{2}$/),
    body('reason', 'Reason for appointment is recommended').optional().trim(),
  ],
  appointmentController.bookAppointment
);

// @route   GET /api/appointments/user
// @desc    Get user's appointments
// @access  Private/Patient
router.get(
  '/user',
  authMiddleware,
  roleMiddleware('patient'),
  appointmentController.getUserAppointments
);

// @route   GET /api/appointments/doctor
// @desc    Get doctor's appointments (dashboard)
// @access  Private/Doctor
router.get(
  '/doctor',
  authMiddleware,
  roleMiddleware('doctor'),
  appointmentController.getDoctorAppointments
);

// @route   PUT /api/appointments/:id
// @desc    Update appointment status
// @access  Private/Doctor/Admin
router.put(
  '/:id',
  authMiddleware,
  roleMiddleware('doctor', 'admin'),
  [
    body('status', 'Status is required').isIn([
      'pending',
      'booked',
      'cancelled',
      'completed',
    ]),
    body('notes', 'Notes should be a string').optional().trim(),
    body('prescription', 'Prescription should be a string')
      .optional()
      .trim(),
  ],
  appointmentController.updateAppointmentStatus
);

// @route   PUT /api/appointments/:id/cancel
// @desc    Cancel an appointment
// @access  Private
router.put(
  '/:id/cancel',
  authMiddleware,
  [
    body('cancellationReason', 'Cancellation reason is recommended')
      .optional()
      .trim(),
  ],
  appointmentController.cancelAppointment
);

// @route   GET /api/appointments/stats/dashboard
// @desc    Get appointment statistics
// @access  Private
router.get(
  '/stats/dashboard',
  authMiddleware,
  appointmentController.getAppointmentStats
);

module.exports = router;
