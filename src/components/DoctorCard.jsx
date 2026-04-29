import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './Button';

/**
 * DoctorCard Component - Displays individual doctor information
 * @param {Object} doctor - Doctor data object
 * @param {string} doctor.id - Doctor unique identifier
 * @param {string} doctor.name - Doctor full name
 * @param {string} doctor.specialty - Medical specialty
 * @param {number} doctor.experience - Years of experience
 * @param {number} doctor.fee - Consultation fee
 * @param {string} doctor.image - Doctor image URL
 */
const DoctorCard = ({ doctor, onBookClick }) => {
  const navigate = useNavigate();
  const doctorId = doctor.id || doctor._id;

  const handleViewProfile = () => {
    navigate(`/doctors/${doctorId}`);
  };

  const handleBookClick = () => {
    if (onBookClick) {
      onBookClick(doctor);
    } else {
      navigate(`/doctors/${doctorId}`);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden border border-gray-100">
      {/* Doctor Image */}
      <div className="relative h-64 bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center overflow-hidden">
        {doctor.image ? (
          <img
            src={doctor.image}
            alt={doctor.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-32 h-32 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white text-4xl font-bold">
            {doctor.name?.charAt(0).toUpperCase()}
          </div>
        )}
      </div>

      {/* Doctor Info */}
      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-800 mb-1">
          {doctor.name || 'Dr. Name'}
        </h3>

        <p className="text-blue-600 font-semibold text-sm mb-2">
          {doctor.specialty || 'General Physician'}
        </p>

        <div className="space-y-2 text-sm text-gray-600 mb-4 pb-4 border-b border-gray-200">
          <p>
            <span className="font-semibold">Experience:</span> {doctor.experience || 0}+ years
          </p>
          <p>
            <span className="font-semibold">Consultation Fee:</span> ₹{doctor.fee || 500}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            onClick={handleViewProfile}
            className="flex-1 px-3 py-2 border-2 border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition duration-200 text-sm"
          >
            View Profile
          </button>
          <Button
            size="sm"
            onClick={handleBookClick}
            className="flex-1 text-sm"
          >
            Book Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
