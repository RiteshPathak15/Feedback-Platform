import React from "react";
import backgroundImage from "../assets/bg_image.png";
import mainImage from "../assets/more_personal.png";
import mainImage2 from "../assets/More_reviews.png";
import mainImage3 from "../assets/More_samples.png";
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      {/* Header Section */}
      <section
        className="relative flex items-center justify-center h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="absolute inset-0 bg-white bg-opacity-30"></div>
        <div className="relative z-10 text-center max-w-3xl px-6">
          <h1 className="text-4xl font-bold text-blue-900 md:text-6xl leading-tight">
            TestifyIt is joining Influenster.
          </h1>
          <p className="mt-4 text-lg text-gray-700">
            Your next favorite thing is here.
          </p>
          <button className="mt-6 px-8 py-3 border border-blue-500 text-blue-500 rounded-full hover:bg-blue-100 transition duration-300 transform hover:scale-105">
            <Link to="SignInPage">Join the community now</Link>
          </button>
        </div>
      </section>

      {/* More Personal Section 1 */}
      <div className="flex flex-col md:flex-row items-center justify-center py-16 bg-white bg-opacity-90 max-w-5xl mx-auto space-x-0 md:space-x-8">
        <img
          src={mainImage}
          alt="Personalized Recommendations"
          className="w-full md:w-1/2 h-auto object-cover rounded-lg shadow-md transform transition-transform duration-300 hover:scale-105"
        />
        <div className="mt-6 md:mt-0 md:w-1/2 text-center md:text-left">
          <h2 className="text-3xl font-bold text-blue-900">More personal.</h2>
          <p className="text-lg text-gray-600 mt-2">
            Get exclusive product recommendations based on your individual
            interests.
          </p>
        </div>
      </div>

      {/* More Personal Section 2 */}
      <div className="flex flex-col md:flex-row items-center justify-center bg-white bg-opacity-90 max-w-5xl mx-auto space-x-0 md:space-x-8">
        <div className="mt-6 md:mt-0 md:w-1/2 text-center md:text-left">
          <h2 className="text-3xl font-bold text-blue-900">More reviews.</h2>
          <p className="text-lg text-gray-600 mt-2">
            From must-trys to gotta-avoids. Discover the truth about over 54
            million products and services.
          </p>
        </div>
        <img
          src={mainImage2}
          alt="Product Reviews"
          className="w-full md:w-1/2 h-auto object-cover rounded-lg shadow-md transform transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* More Personal Section 3 */}
      <div className="flex flex-col md:flex-row items-center justify-center py-5 bg-white bg-opacity-90 max-w-5xl mx-auto space-x-0 md:space-x-8">
        <img
          src={mainImage3}
          alt="Product Samples"
          className="w-full md:w-1/2 h-auto object-cover rounded-lg shadow-md transform transition-transform duration-300 hover:scale-105"
        />
        <div className="mt-6 md:mt-0 md:w-1/2 text-center md:text-left">
          <h2 className="text-3xl font-bold text-blue-900">More samples.</h2>
          <p className="text-lg text-gray-600 mt-2">
            Start qualifying almost immediately for VoxBoxes and other sampling
            campaigns.
          </p>
        </div>
      </div>

      {/* Final Section */}
      <div className="flex items-center justify-center min-h-screen bg-blue-600 relative">
        <img
          src="src/assets/bg_design.png"
          alt="Hero Section"
          className="w-screen h-screen object-cover"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white">
          <h1 className="text-4xl font-bold mb-6 md:text-5xl">
            Everything you love about TestifyIt – and so much more.
          </h1>
          <button className="px-8 py-3 bg-blue-800 rounded-full shadow-md hover:bg-blue-700 transition transform hover:scale-105">
            Join the community now
          </button>
          <img
            src="src/assets/footer_img.png"
            alt="Footer Section"
            className="w-fit max-h-96 p-4"
          />
        </div>
      </div>
    </>
  );
}

export default Home;
