// Constants for the application

// User Roles
const ROLES = {
  PATIENT: 'patient',
  DOCTOR: 'doctor',
  ADMIN: 'admin',
};

// Appointment Status
const APPOINTMENT_STATUS = {
  PENDING: 'pending',
  BOOKED: 'booked',
  CANCELLED: 'cancelled',
  COMPLETED: 'completed',
};

// Doctor Specialties
const SPECIALTIES = [
  'Cardiology',
  'Neurology',
  'Orthopedics',
  'Pediatrics',
  'Dermatology',
  'ENT',
  'General Practice',
  'Psychiatry',
  'Ophthalmology',
];

// HTTP Status Codes
const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
};

// Validation Patterns
const PATTERNS = {
  EMAIL: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
  PHONE: /^\d{10}$/,
  TIME_SLOT: /^\d{2}:\d{2}$/,
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
};

// Error Messages
const ERROR_MESSAGES = {
  INVALID_CREDENTIALS: 'Invalid email or password',
  USER_EXISTS: 'User already exists with this email',
  USER_NOT_FOUND: 'User not found',
  DOCTOR_NOT_FOUND: 'Doctor not found',
  APPOINTMENT_NOT_FOUND: 'Appointment not found',
  UNAUTHORIZED: 'Not authorized to access this route',
  FORBIDDEN: 'Access denied',
  SLOT_BOOKED: 'This time slot is already booked',
  DOUBLE_BOOKING: 'You already have an appointment at this time',
  INVALID_STATUS: 'Invalid appointment status',
  CANNOT_CANCEL: 'Cannot cancel this appointment',
  TOKEN_EXPIRED: 'Token has expired',
  INVALID_TOKEN: 'Invalid token',
};

// Success Messages
const SUCCESS_MESSAGES = {
  REGISTERED: 'User registered successfully',
  LOGIN_SUCCESS: 'Logged in successfully',
  PROFILE_UPDATED: 'Profile updated successfully',
  DOCTOR_CREATED: 'Doctor created successfully',
  DOCTOR_UPDATED: 'Doctor updated successfully',
  DOCTOR_DELETED: 'Doctor deleted successfully',
  APPOINTMENT_BOOKED: 'Appointment booked successfully',
  APPOINTMENT_UPDATED: 'Appointment updated successfully',
  APPOINTMENT_CANCELLED: 'Appointment cancelled successfully',
  REVIEW_ADDED: 'Review added successfully',
};

module.exports = {
  ROLES,
  APPOINTMENT_STATUS,
  SPECIALTIES,
  HTTP_STATUS,
  PATTERNS,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
};
