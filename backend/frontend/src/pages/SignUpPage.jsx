import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Mobile1 from "./assets/Mobile1.png";
import Mobile2 from "./assets/Mobile2.png";

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const handleInputChange = ({ target: { name, value } }) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Password mismatch check
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post("/api/v1/users/register", formData);
      toast.success(response.data.message);
      setFormData({
        fullname: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      setTimeout(() => {
        navigate("/");
      }, 1000); // Wait 1.5 seconds for toast
    } catch (err) {
      toast.error("Error occurred during signup");
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Left Side: Promotion Section */}
      <div className="md:w-1/2 bg-purple-800 text-white flex flex-col items-center justify-center p-10">
        <div className="flex flex-col items-center space-y-4 mb-6">
          <img
            src={Mobile1}
            alt="App Screenshot 1"
            className="absolute right-3/4 w-60 rounded-lg shadow-lg"
          />
          <img
            src={Mobile2}
            alt="App Screenshot 2"
            className="w-60 rounded-lg shadow-lg"
          />
        </div>
        <h1 className="text-2xl font-semibold mb-4 text-center">
          Join us and explore!
        </h1>
        <button className="bg-white text-purple-800 font-semibold px-6 py-2 rounded-full mt-4">
          Get Started with the App
        </button>
      </div>

      {/* Right Side: Sign-Up Form Section */}
      <div className="md:w-1/2 w-full bg-gray-100 flex flex-col items-center justify-center p-10">
        <div className="max-w-md w-full">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
            Create a new account
          </h2>
          <p className="text-center text-gray-500 mb-4">
            Already a member?{" "}
            <Link to="/SignInPage" className="text-purple-600 hover:underline">
              Sign In
            </Link>
          </p>

          {/* Sign-Up Form */}
          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Full Name"
              name="fullname"
              value={formData.fullname}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
              required
            />
            <input
              type="text"
              placeholder="Username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
              required
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
              required
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
              required
            />
            <input
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
              required
            />
            <button
              type="submit"
              className="w-full bg-purple-600 text-white font-semibold py-2 rounded-md hover:bg-purple-700"
            >
              Sign Up
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-4">
            <div className="flex-grow border-t border-gray-300"></div>
          </div>
          {/* Terms and Conditions */}
          <div className="mt-4 text-center text-gray-500 text-sm">
            By signing up, you agree to our{" "}
            <Link to="/terms" className="text-purple-600 hover:underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link to="/privacy" className="text-purple-600 hover:underline">
              Privacy Policy
            </Link>
            .
          </div>
        </div>
      </div>

      {/* ToastContainer to render the toasts */}
      <ToastContainer />
    </div>
  );
};

export default SignUpPage;
