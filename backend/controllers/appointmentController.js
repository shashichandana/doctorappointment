const Appointment = require('../models/Appointment');
const Doctor = require('../models/Doctor');
const User = require('../models/User');
const { validationResult } = require('express-validator');

// @route   POST /api/appointments
// @desc    Book a new appointment
// @access  Private/Patient
exports.bookAppointment = async (req, res, next) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const { doctorId, date, timeSlot, reason } = req.body;

    // Validate doctor exists
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: 'Doctor not found',
      });
    }

    if (!doctor.available) {
      return res.status(400).json({
        success: false,
        message: 'Doctor is not available',
      });
    }

    // Check if appointment slot already exists
    const existingAppointment = await Appointment.findOne({
      doctorId,
      date: new Date(date),
      timeSlot,
      status: { $in: ['pending', 'booked'] },
    });

    if (existingAppointment) {
      return res.status(400).json({
        success: false,
        message: 'This time slot is already booked. Please choose another slot.',
      });
    }

    // Check for double booking (same patient, same time)
    const patientBooking = await Appointment.findOne({
      userId: req.userId,
      date: new Date(date),
      timeSlot,
      status: { $in: ['pending', 'booked'] },
    });

    if (patientBooking) {
      return res.status(400).json({
        success: false,
        message: 'You already have an appointment at this time',
      });
    }

    // Create appointment
    const appointment = await Appointment.create({
      userId: req.userId,
      doctorId,
      date: new Date(date),
      timeSlot,
      reason,
      status: 'booked',
    });

    // Populate and return
    const populatedAppointment = await appointment.populate([
      { path: 'userId', select: 'name email phone' },
      { path: 'doctorId', select: 'name specialty fee' },
    ]);

    return res.status(201).json({
      success: true,
      message: 'Appointment booked successfully',
      appointment: populatedAppointment,
    });
  } catch (error) {
    next(error);
  }
};

// @route   GET /api/appointments/user
// @desc    Get user's appointments
// @access  Private/Patient
exports.getUserAppointments = async (req, res, next) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    const filter = { userId: req.userId };

    if (status) {
      filter.status = status;
    }

    const appointments = await Appointment.find(filter)
      .populate('doctorId', 'name specialty fee image')
      .populate('userId', 'name email phone')
      .sort('-createdAt')
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Appointment.countDocuments(filter);

    return res.status(200).json({
      success: true,
      count: appointments.length,
      total,
      pages: Math.ceil(total / limit),
      currentPage: parseInt(page),
      appointments,
    });
  } catch (error) {
    next(error);
  }
};

// @route   GET /api/appointments/doctor
// @desc    Get doctor's appointments (dashboard)
// @access  Private/Doctor
exports.getDoctorAppointments = async (req, res, next) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    // Find the doctor profile
    const doctor = await Doctor.findOne({ user: req.userId });

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: 'Doctor profile not found',
      });
    }

    const filter = { doctorId: doctor._id };

    if (status) {
      filter.status = status;
    }

    const appointments = await Appointment.find(filter)
      .populate('userId', 'name email phone')
      .populate('doctorId', 'name specialty')
      .sort('-date')
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Appointment.countDocuments(filter);

    return res.status(200).json({
      success: true,
      count: appointments.length,
      total,
      pages: Math.ceil(total / limit),
      currentPage: parseInt(page),
      appointments,
    });
  } catch (error) {
    next(error);
  }
};

// @route   PUT /api/appointments/:id
// @desc    Update appointment status
// @access  Private/Doctor/Admin
exports.updateAppointmentStatus = async (req, res, next) => {
  try {
    const { status, notes, prescription } = req.body;

    // Validate status
    const validStatuses = ['pending', 'booked', 'cancelled', 'completed'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status',
      });
    }

    let appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found',
      });
    }

    // Check authorization
    const doctor = await Doctor.findOne({ user: req.userId });
    if (
      req.user.role !== 'admin' &&
      appointment.doctorId.toString() !== doctor?._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this appointment',
      });
    }

    // Update appointment
    appointment.status = status;
    if (notes) appointment.notes = notes;
    if (prescription) appointment.prescription = prescription;

    appointment = await appointment.save();

    // Populate and return
    appointment = await appointment.populate([
      { path: 'userId', select: 'name email phone' },
      { path: 'doctorId', select: 'name specialty fee' },
    ]);

    return res.status(200).json({
      success: true,
      message: 'Appointment updated successfully',
      appointment,
    });
  } catch (error) {
    next(error);
  }
};

// @route   PUT /api/appointments/:id/cancel
// @desc    Cancel an appointment
// @access  Private
exports.cancelAppointment = async (req, res, next) => {
  try {
    const { cancellationReason } = req.body;

    let appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found',
      });
    }

    // Check authorization (patient or doctor or admin)
    if (
      req.user.role === 'patient' &&
      appointment.userId.toString() !== req.userId
    ) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to cancel this appointment',
      });
    }

    // Check if appointment can be cancelled
    if (['cancelled', 'completed'].includes(appointment.status)) {
      return res.status(400).json({
        success: false,
        message: `Cannot cancel an appointment that is ${appointment.status}`,
      });
    }

    // Update appointment
    appointment.status = 'cancelled';
    appointment.cancelledBy = req.user.role;
    appointment.cancellationReason = cancellationReason;

    appointment = await appointment.save();

    // Populate and return
    appointment = await appointment.populate([
      { path: 'userId', select: 'name email phone' },
      { path: 'doctorId', select: 'name specialty' },
    ]);

    return res.status(200).json({
      success: true,
      message: 'Appointment cancelled successfully',
      appointment,
    });
  } catch (error) {
    next(error);
  }
};

// @route   GET /api/appointments/stats/dashboard
// @desc    Get appointment statistics
// @access  Private
exports.getAppointmentStats = async (req, res, next) => {
  try {
    let filter = {};

    if (req.user.role === 'patient') {
      filter.userId = req.userId;
    } else if (req.user.role === 'doctor') {
      const doctor = await Doctor.findOne({ user: req.userId });
      if (doctor) {
        filter.doctorId = doctor._id;
      }
    }

    const totalAppointments = await Appointment.countDocuments(filter);
    const bookedAppointments = await Appointment.countDocuments({
      ...filter,
      status: 'booked',
    });
    const completedAppointments = await Appointment.countDocuments({
      ...filter,
      status: 'completed',
    });
    const cancelledAppointments = await Appointment.countDocuments({
      ...filter,
      status: 'cancelled',
    });

    return res.status(200).json({
      success: true,
      stats: {
        totalAppointments,
        bookedAppointments,
        completedAppointments,
        cancelledAppointments,
      },
    });
  } catch (error) {
    next(error);
  }
};
