import React, { useState, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { AppContext } from '../context/AppContext';

const Appointment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, resetAppointmentDetails } = useContext(AppContext);

  const { doctor, date, time } = location.state || {};
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    patientName: user?.name || '',
    email: user?.email || '',
    age: '',
    phone: '',
    problemDescription: '',
  });
  const [errors, setErrors] = useState({});

  if (!doctor || !date || !time) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-screen">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Invalid Request</h1>
          <p className="text-gray-600 mb-6">
            Please start from booking a doctor appointment
          </p>
          <Button onClick={() => navigate('/doctors')}>Go to Doctors</Button>
        </div>
      </div>
    );
  }

  const validateForm = () => {
    const newErrors = {};

    if (!formData.patientName.trim()) {
      newErrors.patientName = 'Name is required';
    }
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Valid email is required';
    }
    if (!formData.age || formData.age < 1 || formData.age > 120) {
      newErrors.age = 'Valid age is required';
    }
    if (!formData.phone.trim() || !/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = '10-digit phone number is required';
    }
    if (!formData.problemDescription.trim()) {
      newErrors.problemDescription = 'Please describe your health concern';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      // Success! Show confirmation
      alert(
        `Appointment confirmed!\n\nDoctor: ${doctor.name}\nDate: ${new Date(
          date
        ).toLocaleDateString()}\nTime: ${time}\n\nConfirmation email sent to ${formData.email}`
      );

      resetAppointmentDetails();
      navigate('/');
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-screen bg-gray-50">
      <div className="mb-8">
        <button
          onClick={() => navigate(-1)}
          className="text-blue-600 hover:text-blue-800 font-semibold flex items-center space-x-2 mb-6"
        >
          <span>←</span>
          <span>Back</span>
        </button>
        <h1 className="text-4xl font-bold text-gray-900">Confirm Your Appointment</h1>
        <p className="text-gray-600 mt-2">Fill in your details to complete the booking</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left: Appointment Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-md p-8 sticky top-20">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Appointment Summary</h3>

            {/* Doctor Info */}
            <div className="flex items-center space-x-4 mb-6 pb-6 border-b">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                {doctor.name?.charAt(0).toUpperCase()}
              </div>
              <div>
                <h4 className="font-bold text-gray-900">{doctor.name}</h4>
                <p className="text-sm text-blue-600">{doctor.specialty}</p>
              </div>
            </div>

            {/* Details */}
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-gray-600">Date</p>
                <p className="font-semibold text-gray-900">
                  {new Date(date).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>

              <div>
                <p className="text-gray-600">Time</p>
                <p className="font-semibold text-gray-900">{time}</p>
              </div>

              <div className="pt-3 border-t">
                <p className="text-gray-600">Consultation Fee</p>
                <p className="text-2xl font-bold text-blue-600">₹{doctor.fee}</p>
              </div>

              <div className="pt-3 bg-blue-50 rounded-lg p-3 text-xs text-gray-700">
                <p>✓ Confirmation will be sent to your registered email</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Booking Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-8 space-y-6">
            
            {/* Patient Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                name="patientName"
                value={formData.patientName}
                onChange={handleInputChange}
                placeholder="Enter your full name"
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition ${
                  errors.patientName
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-gray-300 focus:ring-blue-500'
                }`}
              />
              {errors.patientName && (
                <p className="text-red-500 text-sm mt-1">{errors.patientName}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="your.email@example.com"
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition ${
                  errors.email
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-gray-300 focus:ring-blue-500'
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {/* Age and Phone */}
            <div className="grid grid-cols-2 gap-4">
              {/* Age */}
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  Age *
                </label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  placeholder="25"
                  min="1"
                  max="120"
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition ${
                    errors.age
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-gray-300 focus:ring-blue-500'
                  }`}
                />
                {errors.age && (
                  <p className="text-red-500 text-sm mt-1">{errors.age}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="9876543210"
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition ${
                    errors.phone
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-gray-300 focus:ring-blue-500'
                  }`}
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                )}
              </div>
            </div>

            {/* Problem Description */}
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2">
                Describe Your Health Concern *
              </label>
              <textarea
                name="problemDescription"
                value={formData.problemDescription}
                onChange={handleInputChange}
                placeholder="Please describe your symptoms or health concerns in detail..."
                rows="5"
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition resize-none ${
                  errors.problemDescription
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-gray-300 focus:ring-blue-500'
                }`}
              />
              {errors.problemDescription && (
                <p className="text-red-500 text-sm mt-1">{errors.problemDescription}</p>
              )}
            </div>

            {/* Terms and Conditions */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <label className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  required
                  className="mt-1 w-4 h-4 text-blue-600 rounded focus:ring-blue-500 cursor-pointer"
                />
                <span className="text-sm text-gray-700">
                  I agree to the{' '}
                  <a href="#terms" className="text-blue-600 hover:underline font-semibold">
                    Terms & Conditions
                  </a>{' '}
                  and{' '}
                  <a href="#privacy" className="text-blue-600 hover:underline font-semibold">
                    Privacy Policy
                  </a>
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <div className="space-y-3 pt-6 border-t">
              <Button
                type="submit"
                size="lg"
                disabled={loading}
                className="w-full text-base"
              >
                {loading ? 'Confirming...' : 'Confirm Appointment'}
              </Button>
              <Button
                type="button"
                variant="outline"
                size="lg"
                onClick={() => navigate(-1)}
                className="w-full text-base"
                disabled={loading}
              >
                Back to Date Selection
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Appointment;
