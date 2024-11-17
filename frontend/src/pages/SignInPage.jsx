import React from 'react';
import { Link } from 'react-router-dom';
import Mobile1 from '../assets/Mobile1.png'; // Adjust paths as needed
import Mobile2 from '../assets/Mobile2.png';
import DirectSign from '../components/DirectSign';

const SignInPage = () => {
    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle sign-in logic here
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
                <h1 className="text-2xl font-semibold mb-4 text-center">Your next favorite thing is here</h1>
                <button className="bg-white text-purple-800 font-semibold px-6 py-2 rounded-full mt-4">
                    Get the Influenster App
                </button>
            </div>

            {/* Right Side: Sign-In Form Section */}
            <div className="md:w-1/2 w-full bg-gray-100 flex flex-col items-center justify-center p-10">
                <div className="max-w-md w-full">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Sign in to your account</h2>
                    <p className="text-center text-gray-500 mb-4">
                        Not a member? <Link to="/SignUpPage" className="text-purple-600 hover:underline">Sign Up</Link>
                    </p>

                    {/* Sign-In Form */}
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <input 
                            type="email" 
                            placeholder="Username or email" 
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                        />
                        <input 
                            type="password" 
                            placeholder="Password" 
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                        />
                        <div className="text-right">
                            <a href="/forgot-password" className="text-purple-600 hover:underline text-sm">Forgot password?</a>
                        </div>
                        <button 
                            type="submit" 
                            className="w-full bg-purple-600 text-white font-semibold py-2 rounded-md hover:bg-purple-700">
                            Sign In
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="flex items-center my-4">
                        <div className="flex-grow border-t border-gray-300"></div>
                        <span className="mx-4 text-gray-500">or</span>
                        <div className="flex-grow border-t border-gray-300"></div>
                    </div>
                    <DirectSign/>
                </div>
            </div>
        </div>
    );
};

export default SignInPage;
