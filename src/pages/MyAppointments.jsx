import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AppContext } from '../context/AppContext';

const API_BASE_URL = 'http://localhost:5001';

const MyAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancelingId, setCancelingId] = useState(null);
  const [error, setError] = useState(null);
  const { user } = useContext(AppContext);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = localStorage.getItem('authToken') || localStorage.getItem('token');
        if (!token) {
          setLoading(false);
          return;
        }

        const response = await axios.get(`${API_BASE_URL}/api/appointments/user`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.success) {
          setAppointments(response.data.appointments);
        } else {
          setError('Unable to load appointments.');
        }
      } catch (error) {
        console.error('Error fetching appointments:', error);
        setError(
          error.response?.data?.message ||
            error.message ||
            'Failed to load appointments.'
        );
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchAppointments();
    } else {
      setLoading(false);
    }
  }, [user]);

  const handleCancel = async (appointmentId) => {
    const token = localStorage.getItem('authToken') || localStorage.getItem('token');
    if (!token) {
      alert('Please login to cancel appointments.');
      return;
    }

    setCancelingId(appointmentId);

    try {
      let response;

      try {
        response = await axios.delete(
          `${API_BASE_URL}/api/appointments/${appointmentId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } catch (deleteError) {
        if (deleteError.response?.status === 404) {
          response = await axios.put(
            `${API_BASE_URL}/api/appointments/${appointmentId}/cancel`,
            null,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
        } else {
          throw deleteError;
        }
      }

      if (response.data.success) {
        setAppointments((prev) => prev.filter((appt) => appt._id !== appointmentId));
        alert('Appointment cancelled successfully');
      } else {
        alert(response.data.message || 'Failed to cancel appointment');
      }
    } catch (error) {
      console.error('Error cancelling appointment:', error);
      alert(
        error.response?.data?.message ||
          error.message ||
          'Failed to cancel appointment'
      );
    } finally {
      setCancelingId(null);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-screen">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">My Appointments</h1>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">My Appointments</h1>

      {error ? (
        <div className="text-center">
          <p className="text-red-600">{error}</p>
        </div>
      ) : appointments.length === 0 ? (
        <div className="text-center">
          <p className="text-gray-600">No appointments booked yet</p>
        </div>
      ) : (
        <div className="space-y-4">
          {appointments.map((appointment) => (
            <div key={appointment._id} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-between items-start gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Dr. {appointment.doctor?.name}
                  </h3>
                  <p className="text-gray-600">{appointment.doctor?.specialty}</p>
                  <p className="text-gray-600">
                    {new Date(appointment.date).toLocaleDateString()} at {appointment.time}
                  </p>
                  <p className="text-sm text-gray-500 capitalize">Status: {appointment.status}</p>
                </div>
                <div className="flex items-center">
                  <button
                    type="button"
                    onClick={() => handleCancel(appointment._id)}
                    disabled={
                      appointment.status === 'cancelled' ||
                      cancelingId === appointment._id
                    }
                    className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                      appointment.status === 'cancelled'
                        ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        : 'bg-red-600 text-white hover:bg-red-700'
                    }`}
                  >
                    {appointment.status === 'cancelled'
                      ? 'Cancelled'
                      : cancelingId === appointment._id
                      ? 'Cancelling...'
                      : 'Cancel'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyAppointments;