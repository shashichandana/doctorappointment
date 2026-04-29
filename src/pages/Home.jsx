import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from '../components/Button';
import SpecialtyCard from '../components/SpecialtyCard';
import DoctorCard from '../components/DoctorCard';
import { specialties } from '../utils/dummyData';
import { AppContext } from '../context/AppContext';

const Home = () => {
  const navigate = useNavigate();
  const { selectDoctor } = useContext(AppContext);
  const [doctors, setDoctors] = useState([]);
  const [loadingDoctors, setLoadingDoctors] = useState(true);
  
  // Get top 6 doctors from fetched backend doctors
  const topDoctors = doctors.slice(0, 6);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/doctors');
        console.log('API RESPONSE:', response.data);
        const fetchedDoctors = response.data.data || [];

        setDoctors(fetchedDoctors);
      } catch (error) {
        console.error('Error fetching doctors:', error);
        setDoctors([]);
      } finally {
        setLoadingDoctors(false);
      }
    };

    fetchDoctors();
  }, []);

  const specialtyCount = {};
  doctors.forEach((doc) => {
    if (!doc.specialty) return;
    specialtyCount[doc.specialty] = (specialtyCount[doc.specialty] || 0) + 1;
  });

  const handleBookAppointment = () => {
    navigate('/doctors');
  };

  const handleSpecialtyClick = (specialty) => {
    navigate(`/doctors?specialty=${specialty.name}`);
  };

  const handleDoctorBook = (doctor) => {
    selectDoctor(doctor);
    navigate(`/doctors/${doctor.id}`);
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-50 to-cyan-50 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            
            {/* Left: Text Content */}
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Your Health, <br />
                <span className="text-blue-600">Our Priority</span>
              </h1>
              
              <p className="text-lg text-gray-700 leading-relaxed">
                Book appointments with trusted doctors instantly. PulsePoint connects you with
                top healthcare professionals at your fingertips. Experience seamless,
                reliable healthcare like never before.
              </p>

              <div className="flex flex-wrap gap-4 pt-6">
                <Button
                  size="lg"
                  onClick={handleBookAppointment}
                  className="text-base"
                >
                  Book Appointment
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => navigate('/about')}
                  className="text-base"
                >
                  Learn More
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap gap-8 pt-8 border-t border-gray-200">
                <div>
                  <p className="text-2xl font-bold text-blue-600">50K+</p>
                  <p className="text-gray-600 text-sm">Happy Patients</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-blue-600">200+</p>
                  <p className="text-gray-600 text-sm">Expert Doctors</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-blue-600">1K+</p>
                  <p className="text-gray-600 text-sm">Appointments Daily</p>
                </div>
              </div>
            </div>

            {/* Right: Hero Image */}
            <div className="flex justify-center">
              <div className="relative w-80 h-80 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-3xl shadow-2xl flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">👨‍⚕️</div>
                  <div className="text-2xl font-bold text-white">Healthcare At Your Fingertips</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Specialties Section */}
      <section id="specialties" className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Browse by Specialty
            </h2>
            <p className="text-lg text-gray-600">
              Find the right doctor for your healthcare needs
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {specialties.map((specialty) => (
              <div
                key={specialty.id}
                onClick={() => handleSpecialtyClick(specialty)}
              >
                <SpecialtyCard
                  specialty={{
                    ...specialty,
                    doctorCount: specialtyCount[specialty.name] || 0,
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Doctors Section */}
      <section id="doctors" className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Meet Our Top Doctors
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Experienced healthcare professionals dedicated to your wellness
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {loadingDoctors ? (
              <div className="col-span-full bg-white rounded-xl shadow-md p-12 text-center">
                <p className="text-xl font-semibold text-gray-800">Loading doctors...</p>
              </div>
            ) : doctors.length === 0 ? (
              <div className="col-span-full bg-white rounded-xl shadow-md p-12 text-center">
                <p className="text-xl font-semibold text-gray-800">No doctors available</p>
              </div>
            ) : (
              topDoctors.map((doctor) => (
                <DoctorCard
                  key={doctor.id}
                  doctor={doctor}
                  onBookClick={handleDoctorBook}
                />
              ))
            )}
          </div>

          {!loadingDoctors && doctors.length > 0 && (
            <div className="flex justify-center mt-10">
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate('/doctors')}
              >
                View All Doctors
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Promotional Banner */}
      <section className="bg-gradient-to-r from-blue-600 to-cyan-500 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6">
            <h3 className="text-3xl md:text-4xl font-bold text-white">
              Experience Seamless Healthcare Booking
            </h3>
            <p className="text-lg text-blue-100 max-w-2xl mx-auto">
              No more waiting in queues. Book your appointment in just a few clicks
              and get expert medical advice whenever you need it.
            </p>
            <Button
              size="lg"
              variant="outline"
              onClick={handleBookAppointment}
              className="bg-white text-blue-600 hover:bg-blue-50 border-white"
            >
              Get Started Now
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose PulsePoint?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: '⚡',
                title: 'Quick Booking',
                description: 'Book appointments in seconds with our simple and intuitive interface',
              },
              {
                icon: '🩺',
                title: 'Verified Doctors',
                description: 'Access to verified and experienced healthcare professionals',
              },
              {
                icon: '💬',
                title: '24/7 Support',
                description: 'Round-the-clock customer support for any queries or concerns',
              },
            ].map((feature, index) => (
              <div key={index} className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-8 text-center shadow-md hover:shadow-lg transition">
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
