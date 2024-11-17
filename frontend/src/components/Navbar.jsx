import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa"; // Icons for the hamburger menu

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="flex items-center justify-between p-4 bg-white shadow-md">
      {/* Left Side - Logo and Links */}
      <div className="flex items-center space-x-8">
        {/* Logo */}
        <div className="text-2xl font-bold text-blue-900">b:</div>

        {/* Navbar Links for Desktop */}
        <div className="hidden md:flex space-x-6 text-blue-900">
          <Link to="/" className="hover:text-blue-700 transition duration-300">
            Home
          </Link>
          <Link
            to="How_it_Work"
            className="hover:text-blue-700 transition duration-300"
          >
            How to Work
          </Link>
          <Link
            to="solutions"
            className="hover:text-blue-700 transition duration-300"
          >
            Solutions
          </Link>
          <Link
            to="#industries"
            className="hover:text-blue-700 transition duration-300"
          >
            Industries
          </Link>
          <Link
            to="#services"
            className="hover:text-blue-700 transition duration-300"
          >
            Services
          </Link>
          <Link
            to="#resources"
            className="hover:text-blue-700 transition duration-300"
          >
            Resources
          </Link>
          <Link
            to="#company"
            className="hover:text-blue-700 transition duration-300"
          >
            Company
          </Link>
        </div>
      </div>

      {/* Right Side - Contact, Login, Language, and Get Started Button */}
      <div className="hidden md:flex items-center space-x-6">
        <Link
          to="Contact"
          className="text-blue-500 hover:text-blue-700 transition duration-300"
        >
          Contact us
        </Link>
        <Link
          to="about"
          className="text-blue-500 hover:text-blue-700 transition duration-300"
        >
          About Us
        </Link>
        <Link
          to="SignInPage"
          className="text-blue-500 hover:text-blue-700 transition duration-300"
        >
          Log in
        </Link>

        {/* Get Started Form */}
        <div className="flex items-center border border-blue-400 rounded-full overflow-hidden">
          <input
            type="email"
            placeholder="Enter your email"
            className="p-2 px-4 outline-none"
          />
          <button className="bg-blue-500 text-white px-6 py-2 hover:bg-blue-600 transition duration-300">
            Get started
          </button>
        </div>
      </div>

      {/* Hamburger Menu for Mobile */}
      <div className="md:hidden flex items-center">
        <button onClick={toggleMenu} className="text-blue-900">
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-md z-10">
          <div className="flex flex-col items-center py-4 space-y-2">
            <Link
              to="/"
              className="text-blue-900 hover:text-blue-700 transition duration-300"
            >
              Home
            </Link>
            <Link
              to="How_it_Work"
              className="text-blue-900 hover:text-blue-700 transition duration-300"
            >
              How to Work
            </Link>
            <Link
              to="solutions"
              className="text-blue-900 hover:text-blue-700 transition duration-300"
            >
              Solutions
            </Link>
            <Link
              to="#industries"
              className="text-blue-900 hover:text-blue-700 transition duration-300"
            >
              Industries
            </Link>
            <Link
              to="#services"
              className="text-blue-900 hover:text-blue-700 transition duration-300"
            >
              Services
            </Link>
            <Link
              to="#resources"
              className="text-blue-900 hover:text-blue-700 transition duration-300"
            >
              Resources
            </Link>
            <Link
              to="#company"
              className="text-blue-900 hover:text-blue-700 transition duration-300"
            >
              Company
            </Link>
            <Link
              to="Contact"
              className="text-blue-500 hover:text-blue-700 transition duration-300"
            >
              Contact us
            </Link>
            <Link
              to="SignInPage"
              className="text-blue-500 hover:text-blue-700 transition duration-300"
            >
              Log in
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
