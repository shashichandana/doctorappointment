import React, { useState, useEffect, useContext, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import DoctorCard from '../components/DoctorCard';
import { AppContext } from '../context/AppContext';

const specialties = [
  { id: 1, name: 'Cardiology', icon: '❤️' },
  { id: 2, name: 'Neurology', icon: '🧠' },
  { id: 3, name: 'Orthopedics', icon: '🦴' },
  { id: 4, name: 'Pediatrics', icon: '👶' },
  { id: 5, name: 'Dermatology', icon: '🧴' },
  { id: 6, name: 'ENT', icon: '👂' },
  { id: 7, name: 'General Practice', icon: '👨‍⚕️' },
  { id: 8, name: 'Ophthalmology', icon: '👁️' },
];

const Doctors = () => {
  const [searchParams] = useSearchParams();
  const { selectDoctor } = useContext(AppContext);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSpecialty, setSelectedSpecialty] = useState(
    searchParams.get('specialty') || 'All'
  );
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/doctors');
        const rawDoctors = response.data.doctors ?? response.data.data ?? [];
        const normalizedDoctors = rawDoctors.map((doctor) => ({
          ...doctor,
          id: doctor._id || doctor.id,
        }));
        setDoctors(normalizedDoctors);
      } catch (error) {
        console.error('Failed to load doctors:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  // Filter and sort doctors
  const filteredDoctors = useMemo(() => {
    let result = [...doctors];

    // Filter by specialty
    if (selectedSpecialty !== 'All') {
      result = result.filter((doc) => doc.specialty === selectedSpecialty);
    }

    // Filter by search term
    if (searchTerm) {
      result = result.filter(
        (doc) =>
          doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          doc.specialty.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort
    if (sortBy === 'name') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'fee-low') {
      result.sort((a, b) => a.fee - b.fee);
    } else if (sortBy === 'fee-high') {
      result.sort((a, b) => b.fee - a.fee);
    } else if (sortBy === 'experience') {
      result.sort((a, b) => b.experience - a.experience);
    } 

    return result;
  }, [doctors, selectedSpecialty, searchTerm, sortBy]);

  const handleDoctorBook = (doctor) => {
    selectDoctor(doctor);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-screen">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Find Your Doctor</h1>
        <p className="text-gray-600">Browse and book appointments with qualified doctors</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Left Sidebar: Filters */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-md p-6 sticky top-20">
            
            {/* Search */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-800 mb-2">
                Search Doctor
              </label>
              <input
                type="text"
                placeholder="Doctor name or specialty..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>

            {/* Specialty Filter */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-800 mb=3">
                Specialty
              </label>
              <div className="space-y-2">
                <button
                  onClick={() => setSelectedSpecialty('All')}
                  className={`w-full text-left px-4 py-2 rounded-lg transition ${
                    selectedSpecialty === 'All'
                      ? 'bg-blue-600 text-white font-semibold'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  All Specialties
                </button>
                {specialties.map((specialty) => (
                  <button
                    key={specialty.id}
                    onClick={() => setSelectedSpecialty(specialty.name)}
                    className={`w-full text-left px-4 py-2 rounded-lg transition flex items-center space-x-2 ${
                      selectedSpecialty === specialty.name
                        ? 'bg-blue-600 text-white font-semibold'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <span>{specialty.icon}</span>
                    <span>{specialty.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Sort */}
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-3">
                Sort By
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition bg-white"
              >
                <option value="name">Name (A-Z)</option>
                <option value="fee-low">Fee (Low to High)</option>
                <option value="fee-high">Fee (High to Low)</option>
                <option value="experience">Experience</option>
                
              </select>
            </div>
          </div>
        </div>

        {/* Right Content: Doctor Grid */}
        <div className="lg:col-span-3">
          {/* Results Summary */}
          <div className="mb-6 flex justify-between items-center">
            <p className="text-gray-600 font-medium">
              Showing {filteredDoctors.length} doctor{filteredDoctors.length !== 1 ? 's' : ''}
            </p>
          </div>

          {/* Doctor Grid */}
          {loading ? (
            <div className="bg-white rounded-xl shadow-md p-12 text-center">
              <p className="text-xl font-semibold text-gray-800">Loading doctors...</p>
            </div>
          ) : filteredDoctors.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {filteredDoctors.map((doctor) => (
                <DoctorCard
                  key={doctor.id}
                  doctor={doctor}
                  onBookClick={handleDoctorBook}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-md p-12 text-center">
              <div className="text-5xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                No doctors available
              </h3>
              <p className="text-gray-600">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Doctors;
