import React from 'react';
import { Link } from 'react-router-dom';
import DirectSign from '../components/DirectSign';

const SignUpPage = () => {
    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle signup logic here (e.g., form validation and API request)
    };

    return (
        <div className="flex flex-col md:flex-row min-h-screen">
            {/* Left Side: Promotion Section */}
            <div className="md:w-1/2 bg-purple-800 text-white flex flex-col items-center justify-center p-10">
                <div className="flex flex-col items-center space-y-4 mb-6">
                    <img 
                        src="src/assets/Mobile1.png" 
                        alt="App Screenshot 1" 
                        className="absolute right-3/4 w-60 rounded-lg shadow-lg"
                    />
                    <img 
                        src="src/assets/Mobile2.png" 
                        alt="App Screenshot 2" 
                        className="w-60 rounded-lg shadow-lg"
                    />
                </div>
                <h1 className="text-2xl font-semibold mb-4 text-center">Join us and explore!</h1>
                <button className="bg-white text-purple-800 font-semibold px-6 py-2 rounded-full mt-4">
                    Get Started with the App
                </button>
            </div>

            {/* Right Side: Sign-Up Form Section */}
            <div className="md:w-1/2 w-full bg-gray-100 flex flex-col items-center justify-center p-10">
                <div className="max-w-md w-full">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Create a new account</h2>
                    <p className="text-center text-gray-500 mb-4">
                        Already a member? <Link to="/SignInPage" className="text-purple-600 hover:underline">Sign In</Link>
                    </p>

                    {/* Sign-Up Form */}
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <input 
                            type="text" 
                            placeholder="Full Name" 
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                            required
                        />
                        <input 
                            type="email" 
                            placeholder="Email" 
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                            required
                        />
                        <input 
                            type="password" 
                            placeholder="Password" 
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                            required
                        />
                        <input 
                            type="password" 
                            placeholder="Confirm Password" 
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                            required
                        />
                        <button 
                            type="submit" 
                            className="w-full bg-purple-600 text-white font-semibold py-2 rounded-md hover:bg-purple-700">
                            Sign Up
                        </button>
                    </form>

                    {/* Terms and Conditions */}
                    <div className="mt-4 text-center text-gray-500 text-sm">
                        By signing up, you agree to our <Link to="/terms" className="text-purple-600 hover:underline">Terms of Service</Link> and <Link to="/privacy" className="text-purple-600 hover:underline">Privacy Policy</Link>.
                    </div>

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

export default SignUpPage;
