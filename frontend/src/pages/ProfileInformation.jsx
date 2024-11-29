import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaUser, FaEnvelope, FaStar, FaCheckCircle } from "react-icons/fa"; // Importing icons from react-icons

function ProfileInformation() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("/api/v1/users/profile", {
          headers: {
            Authorization: `Bearer FeedbackAccessToken`, // Token should be dynamically fetched if needed
          },
        });
        setUser(response.data.user);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  if (!user) {
    return <div className="text-center text-xl">Loading...</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto p-6">
      {/* User Information Title */}
      <h1 className="col-span-full text-3xl font-bold text-center text-gray-800 mb-8">
        User Information
      </h1>

      {/* Username Card */}
      <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center">
        <FaUser className="text-3xl text-blue-500 mb-4" />
        <h3 className="text-xl font-semibold text-gray-700">Username</h3>
        <p className="text-lg text-gray-500 mt-2">{user.username}</p>
      </div>

      {/* Full Name Card */}
      <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center">
        <FaUser className="text-3xl text-blue-500 mb-4" />
        <h3 className="text-xl font-semibold text-gray-700">Full Name</h3>
        <p className="text-lg text-gray-500 mt-2">{user.fullname}</p>
      </div>

      {/* Email Card */}
      <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center">
        <FaEnvelope className="text-3xl text-gray-500 mb-4" />
        <h3 className="text-xl font-semibold text-gray-700">Email</h3>
        <p className="text-lg text-gray-500 mt-2">{user.email}</p>
      </div>

      {/* Reward Points Card */}
      <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center">
        <FaStar className="text-3xl text-yellow-400 mb-4" />
        <h3 className="text-xl font-semibold text-gray-700">Reward Points</h3>
        <p className="text-lg text-gray-500 mt-2">{user.rewardPoints} Points</p>
      </div>

      {/* Premium User Status Card */}
      <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center">
        <FaCheckCircle
          className={`text-3xl ${
            user.isPremium ? "text-green-500" : "text-gray-500"
          } mb-4`}
        />
        <h3 className="text-xl font-semibold text-gray-700">User Status</h3>
        <p className="text-lg text-gray-500 mt-2">
          {user.isPremium ? "Premium User" : "Regular User"}
        </p>
      </div>
    </div>
  );
}

export default ProfileInformation;
