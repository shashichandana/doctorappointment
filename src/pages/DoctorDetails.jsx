import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { timeSlots } from '../utils/dummyData';
import Button from '../components/Button';
import { AppContext } from '../context/AppContext';

const DoctorDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, selectDoctor, updateAppointmentDetails } = useContext(AppContext);

  const [doctor, setDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/api/doctors/${id}`);
        const fetchedDoctor = response.data.doctor;
        setDoctor({ ...fetchedDoctor, id: fetchedDoctor._id });
      } catch (err) {
        if (err.response && err.response.status === 404) {
          setError('Doctor not found.');
        } else {
          setError('Failed to load doctor details.');
          console.error('Doctor fetch error:', err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDoctor();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-screen">
        <div className="text-center bg-white rounded-xl shadow-md p-12">
          <p className="text-xl font-semibold text-gray-800">Loading doctor details...</p>
        </div>
      </div>
    );
  }

  if (error || !doctor) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-screen">
        <div className="text-center bg-white rounded-xl shadow-md p-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Doctor not found</h1>
          <p className="text-gray-600 mb-6">{error || 'The requested doctor could not be found.'}</p>
          <Button onClick={() => navigate('/doctors')}>Back to Doctors</Button>
        </div>
      </div>
    );
  }

  // Generate next 7 days
  const nextDays = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return date;
  });

  const handleBookAppointment = () => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (!selectedDate || !selectedTime) {
      alert('Please select a date and time slot');
      return;
    }

    selectDoctor(doctor);
    updateAppointmentDetails({
      date: selectedDate,
      timeSlot: selectedTime,
    });

    navigate('/appointment', {
      state: {
        doctor,
        date: selectedDate,
        time: selectedTime,
      },
    });
  };

  const todayDateStr = new Date().toISOString().split('T')[0];
  const isToday = selectedDate === todayDateStr;

  const parseSlotToDate = (slot) => {
    const [timePart, modifier] = slot.split(' ');
    const [hourStr, minuteStr] = timePart.split(':');
    let hours = parseInt(hourStr, 10);
    const minutes = parseInt(minuteStr, 10);

    if (modifier === 'PM' && hours !== 12) {
      hours += 12;
    }
    if (modifier === 'AM' && hours === 12) {
      hours = 0;
    }

    const slotDate = new Date(`${selectedDate}T00:00:00`);
    slotDate.setHours(hours, minutes, 0, 0);
    return slotDate;
  };

  const isSlotDisabled = (slot) => {
    if (!isToday) return false;
    const slotDate = parseSlotToDate(slot);
    return slotDate < new Date();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-screen">
      {/* Back Button */}
      <button
        onClick={() => navigate('/doctors')}
        className="mb-8 text-blue-600 hover:text-blue-800 font-semibold flex items-center space-x-2"
      >
        <span>←</span>
        <span>Back to Doctors</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left: Doctor Image and Brief Info */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-md overflow-hidden sticky top-20">
            {/* Doctor Image */}
            <div className="h-80 bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center">
              {doctor.image ? (
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-40 h-40 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white text-6xl font-bold">
                  {doctor.name?.charAt(0).toUpperCase()}
                </div>
              )}
            </div>

            {/* Info */}
            <div className="p-6 space-y-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{doctor.name}</h2>
                <p className="text-blue-600 font-semibold">{doctor.specialty}</p>
              </div>

              <div className="border-t pt-4 space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Experience:</span>
                  <span className="font-semibold text-gray-900">{doctor.experience}+ years</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Consultation Fee:</span>
                  <span className="font-semibold text-gray-900">₹{doctor.fee}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Rating:</span>
                  <span className="font-semibold text-yellow-500">⭐ {doctor.rating}/5.0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Reviews:</span>
                  <span className="font-semibold text-gray-900">{doctor.reviews}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Booking Form */}
        <div className="lg:col-span-2">
          <div className="space-y-8">
            
            {/* Doctor Full Info */}
            <div className="bg-white rounded-xl shadow-md p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">About Doctor</h3>
              <p className="text-gray-700 leading-relaxed mb-4">{doctor.about}</p>
              <p className="text-gray-600">
                <span className="font-semibold">Qualifications:</span> {doctor.degree}
              </p>
            </div>

            {/* Date Selection */}
            <div className="bg-white rounded-xl shadow-md p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Select Date</h3>
              
              <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
                {nextDays.map((date, index) => {
                  const dateStr = date.toISOString().split('T')[0];
                  const isSelected = selectedDate === dateStr;
                  const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
                  const dayNum = date.getDate();

                  return (
                    <button
                      key={index}
                      onClick={() => setSelectedDate(dateStr)}
                      className={`p-3 rounded-lg font-semibold transition duration-200 ${
                        isSelected
                          ? 'bg-blue-600 text-white shadow-lg'
                          : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                      }`}
                    >
                      <div className="text-xs">{dayName}</div>
                      <div className="text-lg">{dayNum}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Time Slot Selection */}
            {selectedDate && (
              <div className="bg-white rounded-xl shadow-md p-8 animate-fadeIn">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Select Appointment Time</h3>
                
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                  {timeSlots.map((time, index) => {
                    const isSelected = selectedTime === time;
                    const disabled = isSlotDisabled(time);

                    return (
                      <button
                        key={index}
                        type="button"
                        onClick={() => !disabled && setSelectedTime(time)}
                        disabled={disabled}
                        className={`p-3 rounded-lg font-semibold transition duration-200 text-sm ${
                          disabled
                            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                            : isSelected
                            ? 'bg-blue-600 text-white shadow-lg'
                            : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                        }`}
                      >
                        {time}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Booking Summary */}
            {selectedDate && selectedTime && (
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-8 border-2 border-blue-200 animate-fadeIn">
                <h4 className="font-semibold text-gray-900 mb-3">Summary</h4>
                <div className="space-y-2 text-sm text-gray-700">
                  <p>
                    <span className="font-semibold">Doctor:</span> {doctor.name}
                  </p>
                  <p>
                    <span className="font-semibold">Specialty:</span> {doctor.specialty}
                  </p>
                  <p>
                    <span className="font-semibold">Date:</span>{' '}
                    {new Date(selectedDate).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                  <p>
                    <span className="font-semibold">Time:</span> {selectedTime}
                  </p>
                  <p className="pt-2 border-t border-blue-200">
                    <span className="font-semibold">Fee:</span> ₹{doctor.fee}
                  </p>
                </div>
              </div>
            )}

            {/* Book Appointment Button */}
            <Button
              size="lg"
              onClick={handleBookAppointment}
              disabled={!selectedDate || !selectedTime}
              className="w-full text-base"
            >
              {user ? 'Proceed to Booking' : 'Login to Book Appointment'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDetails;
