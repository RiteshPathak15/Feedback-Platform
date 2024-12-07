import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import axios from "axios"; // Make sure this is imported if you're using axios for API calls

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [username, setUsername] = useState("");

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = async () => {
    try {
      await axios.post("/api/v1/users/logout", null, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      localStorage.removeItem("accessToken");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  // Fetch user data to get the username
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("/api/v1/users/profile", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });
        setUsername(response.data.user.username);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <nav className="flex items-center justify-between p-4 bg-white shadow-md relative">
      {/* Logo and Desktop Links */}
      <div className="flex items-center space-x-8">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-900">
          b:
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-6 text-blue-900">
          <Link to="/" className="hover:text-blue-700 transition duration-300">
            Home
          </Link>
          <Link
            to="/How_it_Work"
            className="hover:text-blue-700 transition duration-300"
          >
            How to Work
          </Link>
          <Link
            to="/Products"
            className="hover:text-blue-700 transition duration-300"
          >
            Products
          </Link>

          <Link
            to="order-history"
            className="hover:text-blue-700 transition duration-300"
          >
            Order-History
          </Link>
        </div>
      </div>

      {/* Profile Dropdown and Desktop Right Side */}
      <div className="hidden md:flex items-center space-x-6">
        <Link
          to="/Contact"
          className="text-blue-500 hover:text-blue-700 transition duration-300"
        >
          Contact Us
        </Link>
        <Link
          to="/about"
          className="text-blue-500 hover:text-blue-700 transition duration-300"
        >
          About Us
        </Link>
        <Link
          to="/SignInPage"
          className="text-blue-500 hover:text-blue-700 transition duration-300"
        >
          Log in
        </Link>

        {/* Profile Button with Dropdown */}
        {username && (
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition duration-300"
            >
              {username}
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-md w-48 z-50">
                <Link
                  to="/ProfileInformation"
                  className="block px-4 py-2 text-blue-900 hover:bg-blue-100"
                  onClick={() => setDropdownOpen(false)}
                >
                  User Information
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left block px-4 py-2 text-blue-900 hover:bg-blue-100"
                >
                  Log Out
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Hamburger Menu for Mobile */}
      <div className="md:hidden flex items-center">
        <button
          onClick={toggleMenu}
          className="text-blue-900 focus:outline-none"
        >
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-md z-40">
          <div className="flex flex-col items-center py-4 space-y-2">
            <Link
              to="/"
              className="text-blue-900 hover:text-blue-700 transition duration-300"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/How_it_Work"
              className="text-blue-900 hover:text-blue-700 transition duration-300"
              onClick={() => setIsOpen(false)}
            >
              How to Work
            </Link>
            <Link
              to="/Products"
              className="text-blue-900 hover:text-blue-700 transition duration-300"
              onClick={() => setIsOpen(false)}
            >
              Products
            </Link>

            <Link
              to="/order-history"
              className="text-blue-900 hover:text-blue-700 transition duration-300"
              onClick={() => setIsOpen(false)}
            >
              Order History
            </Link>
            <Link
              to="/Contact"
              className="text-blue-500 hover:text-blue-700 transition duration-300"
              onClick={() => setIsOpen(false)}
            >
              Contact Us
            </Link>
            <Link
              to="/SignInPage"
              className="text-blue-500 hover:text-blue-700 transition duration-300"
              onClick={() => setIsOpen(false)}
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
