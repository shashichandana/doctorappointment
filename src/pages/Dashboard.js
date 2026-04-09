import React from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

function Dashboard() {
  const menuItems = ["Dashboard", "Appointments", "Doctors", "Profile"];
  const currentYear = new Date().getFullYear();

  return (
    <div>
      <Header user="User" />

      <div style={{ display: "flex" }}>
        <Sidebar menu={menuItems} />

        <main style={{ flex: 1, padding: "20px" }}>
          <h1>Dashboard</h1>
          <p>Welcome to your dashboard!</p>
        </main>
      </div>

      <Footer year={currentYear} />
    </div>
  );
}

export default Dashboard;