import React from "react";
import GoogleIcon from '../assets/react.svg'; // Update with actual paths
import FacebookIcon from '../assets/react.svg';
import AppleIcon from '../assets/react.svg';

const DirectSign = () => {
  return (
    <div>
      {/* Social Sign-In Buttons */}
      <div className="space-y-2">
        <button className="w-full bg-white border border-gray-300 text-gray-700 font-semibold py-2 rounded-md flex items-center justify-center space-x-2 hover:bg-gray-100">
          <img src={GoogleIcon} alt="Google" className="w-5 h-5" />
          <span>Sign in with Google</span>
        </button>
        <button className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md flex items-center justify-center space-x-2 hover:bg-blue-700">
          <img src={FacebookIcon} alt="Facebook" className="w-5 h-5" />
          <span>Sign in with Facebook</span>
        </button>
        <button className="w-full bg-black text-white font-semibold py-2 rounded-md flex items-center justify-center space-x-2 hover:bg-gray-800">
          <img src={AppleIcon} alt="Apple" className="w-5 h-5" />
          <span>Sign in with Apple</span>
        </button>
      </div>
    </div>
  );
};

export default DirectSign;
