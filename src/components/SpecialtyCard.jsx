import React from 'react';

/**
 * SpecialtyCard Component - Displays medical specialty with icon
 * @param {Object} specialty - Specialty data
 * @param {string} specialty.name - Specialty name
 * @param {string} specialty.icon - Icon/emoji for specialty
 * @param {number} specialty.doctorCount - Number of doctors in this specialty
 */
const SpecialtyCard = ({ specialty, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 p-6 cursor-pointer border border-gray-100 text-center hover:border-blue-300 hover:-translate-y-1"
    >
      {/* Icon */}
      <div className="text-5xl mb-4 flex justify-center">
        {specialty.icon}
      </div>

      {/* Specialty Name */}
      <h3 className="text-lg font-bold text-gray-800 mb-2">
        {specialty.name}
      </h3>

      {/* Doctor Count */}
      <p className="text-sm text-gray-600">
        {specialty.doctorCount || 0} doctors available
      </p>

      {/* Hover Effect */}
      <div className="mt-4 text-blue-600 font-semibold text-sm opacity-0 group-hover:opacity-100 transition">
        View Doctors →
      </div>
    </div>
  );
};

export default SpecialtyCard;
