const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide user ID'],
    },
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Doctor',
      required: [true, 'Please provide doctor ID'],
    },
    date: {
      type: Date,
      required: [true, 'Please provide appointment date'],
    },
    timeSlot: {
      type: String,
      required: [true, 'Please provide time slot'],
    },
    status: {
      type: String,
      enum: ['pending', 'booked', 'cancelled', 'completed'],
      default: 'pending',
    },
    reason: {
      type: String,
      trim: true,
      maxlength: [300, 'Reason cannot exceed 300 characters'],
    },
    notes: {
      type: String,
      trim: true,
    },
    cancelledBy: {
      type: String,
      enum: ['patient', 'doctor', 'admin'],
      default: null,
    },
    cancellationReason: {
      type: String,
      trim: true,
    },
    prescription: {
      type: String,
      default: null,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Index for faster queries
appointmentSchema.index({ userId: 1, date: 1 });
appointmentSchema.index({ doctorId: 1, date: 1 });

module.exports = mongoose.model('Appointment', appointmentSchema);
