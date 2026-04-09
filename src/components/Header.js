import React from 'react';

function Header({ user }) {
  return (
    <header className="header">
      <h2 className="logo">MediCare</h2>

      <nav>
        <ul className="nav-links">
          <li>Dashboard</li>
          <li>Appointments</li>
          <li>Doctors</li>
          <li>Profile</li>
        </ul>
      </nav>

      <div className="user-info">
        <span>Welcome, {user}</span>
      </div>
    </header>
  );
}

export default Header;
