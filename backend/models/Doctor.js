const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide a user ID'],
    },
    name: {
      type: String,
      required: [true, 'Please provide doctor name'],
      trim: true,
    },
    specialty: {
      type: String,
      required: [true, 'Please provide specialty'],
      enum: [
        'Cardiology',
        'Neurology',
        'Orthopedics',
        'Pediatrics',
        'Dermatology',
        'ENT',
        'General Practice',
        'Psychiatry',
        'Ophthalmology',
      ],
    },
    experience: {
      type: Number,
      required: [true, 'Please provide years of experience'],
      min: 0,
    },
    fee: {
      type: Number,
      required: [true, 'Please provide consultation fee'],
      min: 0,
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    reviews: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
        userName: String,
        rating: {
          type: Number,
          min: 1,
          max: 5,
        },
        comment: String,
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    available: {
      type: Boolean,
      default: true,
    },
    image: {
      type: String,
      default: null,
    },
    about: {
      type: String,
      trim: true,
      maxlength: [500, 'About cannot exceed 500 characters'],
    },
    degree: {
      type: String,
      required: [true, 'Please provide degree'],
    },
    timeslots: [
      {
        day: {
          type: String,
          enum: [
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
            'Sunday',
          ],
        },
        startTime: String, // e.g., "09:00"
        endTime: String, // e.g., "17:00"
        interval: {
          type: Number,
          default: 30, // minutes
        },
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Calculate average rating from reviews
doctorSchema.pre('save', function (next) {
  if (this.reviews.length > 0) {
    const avgRating =
      this.reviews.reduce((sum, review) => sum + review.rating, 0) /
      this.reviews.length;
    this.rating = parseFloat(avgRating.toFixed(1));
  }
  next();
});

module.exports = mongoose.model('Doctor', doctorSchema);
