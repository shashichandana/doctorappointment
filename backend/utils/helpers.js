const jwt = require('jsonwebtoken');

/**
 * Generate JWT Token
 * @param {string} id - User ID
 * @returns {string} JWT Token
 */
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '7d',
  });
};

/**
 * Verify JWT Token
 * @param {string} token - JWT Token
 * @returns {object} Decoded token
 */
const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return null;
  }
};

/**
 * Format date to output format
 * @param {Date} date - Date object
 * @returns {string} Formatted date
 */
const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
};

/**
 * Format time slot
 * @param {string} time - Time in HH:MM format
 * @returns {string} Formatted time
 */
const formatTime = (time) => {
  if (!time || typeof time !== 'string') return '';
  const [hours, minutes] = time.split(':');
  const hour = parseInt(hours);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const displayHour = hour > 12 ? hour - 12 : hour || 12;
  return `${displayHour}:${minutes} ${ampm}`;
};

/**
 * Check if time slot is in future
 * @param {Date} date - Appointment date
 * @param {string} timeSlot - Time slot in HH:MM format
 * @returns {boolean} True if future
 */
const isFutureSlot = (date, timeSlot) => {
  const [hours, minutes] = timeSlot.split(':');
  const appointmentTime = new Date(date);
  appointmentTime.setHours(parseInt(hours), parseInt(minutes), 0, 0);
  return appointmentTime > new Date();
};

/**
 * Generate time slots for a day
 * @param {string} startTime - Start time (HH:MM)
 * @param {string} endTime - End time (HH:MM)
 * @param {number} interval - Interval in minutes (default: 30)
 * @returns {array} Array of time slots
 */
const generateTimeSlots = (startTime, endTime, interval = 30) => {
  const slots = [];
  const [startHour, startMin] = startTime.split(':').map(Number);
  const [endHour, endMin] = endTime.split(':').map(Number);

  let current = new Date();
  current.setHours(startHour, startMin, 0);
  const end = new Date();
  end.setHours(endHour, endMin, 0);

  while (current < end) {
    const hours = String(current.getHours()).padStart(2, '0');
    const minutes = String(current.getMinutes()).padStart(2, '0');
    slots.push(`${hours}:${minutes}`);
    current = new Date(current.getTime() + interval * 60000);
  }

  return slots;
};

/**
 * Calculate age from DOB
 * @param {Date} dob - Date of birth
 * @returns {number} Age in years
 */
const calculateAge = (dob) => {
  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  const monthDiff = today.getMonth() - dob.getMonth();
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < dob.getDate())
  ) {
    age--;
  }
  return age;
};

/**
 * Sanitize user object for response
 * @param {object} user - User object
 * @returns {object} Sanitized user
 */
const sanitizeUser = (user) => {
  const { password, ...sanitized } = user.toObject();
  return sanitized;
};

/**
 * Check if array contains all elements
 * @param {array} arr - Array to check
 * @param {array} elements - Elements to find
 * @returns {boolean} True if all elements exist
 */
const containsAll = (arr, elements) => {
  return elements.every((e) => arr.includes(e));
};

module.exports = {
  generateToken,
  verifyToken,
  formatDate,
  formatTime,
  isFutureSlot,
  generateTimeSlots,
  calculateAge,
  sanitizeUser,
  containsAll,
};
