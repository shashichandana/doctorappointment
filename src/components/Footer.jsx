import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Footer Component - Application footer with links and info
 */
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-12">
          
          {/* Brand Section */}
          <div className="col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">P</span>
              </div>
              <span className="text-2xl font-bold text-blue-400">PulsePoint</span>
            </div>
            <p className="text-gray-400 text-sm">
              Your trusted healthcare platform for easy doctor appointments.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-blue-400 transition">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/doctors" className="hover:text-blue-400 transition">
                  Doctors
                </Link>
              </li>
              <li>
                <a href="#about" className="hover:text-blue-400 transition">
                  About Us
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-blue-400 transition">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="col-span-1">
            <h4 className="text-white font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#faq" className="hover:text-blue-400 transition">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#help" className="hover:text-blue-400 transition">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#privacy" className="hover:text-blue-400 transition">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#terms" className="hover:text-blue-400 transition">
                  Terms & Conditions
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-span-1">
            <h4 className="text-white font-semibold mb-4">Get in Touch</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start space-x-2">
                <span>📧</span>
                <span>support@pulsepoint.com</span>
              </li>
              <li className="flex items-start space-x-2">
                <span>📞</span>
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-start space-x-2">
                <span>📍</span>
                <span>123 Health Street, Medical City, MC 12345</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 py-8">
          {/* Social Links */}
          <div className="flex justify-center space-x-6 mb-6">
            <a href="#facebook" className="text-gray-400 hover:text-blue-400 transition text-2xl">
              f
            </a>
            <a href="#twitter" className="text-gray-400 hover:text-blue-400 transition text-2xl">
              𝕏
            </a>
            <a href="#linkedin" className="text-gray-400 hover:text-blue-400 transition text-2xl">
              in
            </a>
            <a href="#instagram" className="text-gray-400 hover:text-blue-400 transition text-2xl">
              📷
            </a>
          </div>

          {/* Copyright */}
          <p className="text-center text-gray-500 text-sm">
            © {currentYear} PulsePoint. All rights reserved. | Designed with ❤️ for Healthcare
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
