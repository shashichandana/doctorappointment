const Doctor = require('../models/Doctor');
const User = require('../models/User');
const { validationResult } = require('express-validator');

// @route   GET /api/doctors
// @desc    Get all doctors with pagination and filtering
// @access  Public
exports.getAllDoctors = async (req, res, next) => {
  try {
    const { specialty, available, page = 1, limit = 10, search } = req.query;
    const skip = (page - 1) * limit;

    // Build filter object
    const filter = {};

    if (specialty) {
      filter.specialty = specialty;
    }

    if (available !== undefined) {
      filter.available = available === 'true';
    }

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { specialty: { $regex: search, $options: 'i' } },
        { degree: { $regex: search, $options: 'i' } },
      ];
    }

    // Execute query
    const doctors = await Doctor.find(filter)
      .populate('user', 'name email phone avatar')
      .sort('-rating')
      .skip(skip)
      .limit(parseInt(limit));

    // Get total count for pagination
    const total = await Doctor.countDocuments(filter);

    return res.status(200).json({
      success: true,
      count: doctors.length,
      total,
      pages: Math.ceil(total / limit),
      currentPage: parseInt(page),
      doctors,
    });
  } catch (error) {
    next(error);
  }
};

// @route   GET /api/doctors/:id
// @desc    Get doctor by ID
// @access  Public
exports.getDoctorById = async (req, res, next) => {
  try {
    const doctor = await Doctor.findById(req.params.id)
      .populate('user', 'name email phone avatar')
      .populate('reviews.userId', 'name avatar');

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: 'Doctor not found',
      });
    }

    return res.status(200).json({
      success: true,
      doctor,
    });
  } catch (error) {
    next(error);
  }
};

// @route   POST /api/doctors
// @desc    Create a new doctor (Admin only)
// @access  Private/Admin
exports.createDoctor = async (req, res, next) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const { name, specialty, experience, fee, degree, about, image, timeslots } =
      req.body;

    // Check if doctor already exists
    let doctor = await Doctor.findOne({ name });
    if (doctor) {
      return res.status(400).json({
        success: false,
        message: 'Doctor already exists',
      });
    }

    // Create or find doctor's user account
    let user = await User.findOne({ email: req.body.email });

    if (!user) {
      user = await User.create({
        name,
        email: req.body.email,
        password: req.body.password || 'TempPassword123!',
        role: 'doctor',
      });
    }

    // Create doctor profile
    doctor = await Doctor.create({
      user: user._id,
      name,
      specialty,
      experience,
      fee,
      degree,
      about,
      image,
      timeslots,
    });

    doctor = await doctor.populate('user', 'name email phone avatar');

    return res.status(201).json({
      success: true,
      message: 'Doctor created successfully',
      doctor,
    });
  } catch (error) {
    next(error);
  }
};

// @route   PUT /api/doctors/:id
// @desc    Update doctor (Admin or Doctor themselves)
// @access  Private
exports.updateDoctor = async (req, res, next) => {
  try {
    const { name, specialty, experience, fee, degree, about, image, timeslots, available } =
      req.body;

    let doctor = await Doctor.findById(req.params.id);

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: 'Doctor not found',
      });
    }

    // Check authorization
    if (
      req.user.role !== 'admin' &&
      req.user._id.toString() !== doctor.user.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this doctor',
      });
    }

    // Update fields
    if (name) doctor.name = name;
    if (specialty) doctor.specialty = specialty;
    if (experience) doctor.experience = experience;
    if (fee) doctor.fee = fee;
    if (degree) doctor.degree = degree;
    if (about) doctor.about = about;
    if (image) doctor.image = image;
    if (timeslots) doctor.timeslots = timeslots;
    if (available !== undefined) doctor.available = available;

    doctor = await doctor.save();
    doctor = await doctor.populate('user', 'name email phone avatar');

    return res.status(200).json({
      success: true,
      message: 'Doctor updated successfully',
      doctor,
    });
  } catch (error) {
    next(error);
  }
};

// @route   DELETE /api/doctors/:id
// @desc    Delete doctor (Admin only)
// @access  Private/Admin
exports.deleteDoctor = async (req, res, next) => {
  try {
    const doctor = await Doctor.findByIdAndDelete(req.params.id);

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: 'Doctor not found',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Doctor deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

// @route   POST /api/doctors/:id/reviews
// @desc    Add a review to a doctor
// @access  Private
exports.addReview = async (req, res, next) => {
  try {
    const { rating, comment } = req.body;

    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        message: 'Rating must be between 1 and 5',
      });
    }

    const doctor = await Doctor.findById(req.params.id);

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: 'Doctor not found',
      });
    }

    // Get user info
    const user = await User.findById(req.userId);

    // Add review
    doctor.reviews.push({
      userId: req.userId,
      userName: user.name,
      rating,
      comment,
    });

    await doctor.save();

    return res.status(201).json({
      success: true,
      message: 'Review added successfully',
      doctor,
    });
  } catch (error) {
    next(error);
  }
};

// @route   GET /api/doctors/stats/dashboard
// @desc    Get doctor dashboard statistics
// @access  Private/Doctor
exports.getDoctorStats = async (req, res, next) => {
  try {
    const doctor = await Doctor.findOne({ user: req.userId });

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: 'Doctor profile not found',
      });
    }

    return res.status(200).json({
      success: true,
      stats: {
        totalReviews: doctor.reviews.length,
        averageRating: doctor.rating,
        totalPatients: new Set(doctor.reviews.map((r) => r.userId)).size,
        isAvailable: doctor.available,
      },
      doctor,
    });
  } catch (error) {
    next(error);
  }
};
