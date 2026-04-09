import React, { createContext, useState, useEffect } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [appointmentDetails, setAppointmentDetails] = useState({
    date: null,
    timeSlot: null,
    patientName: '',
    age: '',
    problemDescription: '',
  });
  const [loading, setLoading] = useState(false);

  // Initialize auth state from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('user');
      }
    }
  }, []);

  // Login function
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    setAppointmentDetails({
      date: null,
      timeSlot: null,
      patientName: '',
      age: '',
      problemDescription: '',
    });
  };

  // Update selected doctor
  const selectDoctor = (doctor) => {
    setSelectedDoctor(doctor);
  };

  // Update appointment details
  const updateAppointmentDetails = (details) => {
    setAppointmentDetails((prev) => ({
      ...prev,
      ...details,
    }));
  };

  // Reset appointment details
  const resetAppointmentDetails = () => {
    setAppointmentDetails({
      date: null,
      timeSlot: null,
      patientName: '',
      age: '',
      problemDescription: '',
    });
  };

  const value = {
    user,
    login,
    logout,
    selectedDoctor,
    selectDoctor,
    appointmentDetails,
    updateAppointmentDetails,
    resetAppointmentDetails,
    loading,
    setLoading,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
