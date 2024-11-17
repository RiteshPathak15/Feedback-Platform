import React from "react";

const HeroSection = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-600 relative">
      {/* Background Image */}
      <img
        src="src/assets/bg_design.png"
        alt="Hero Section"
        className="w-screen h-screen object-cover"
      />

      {/* Overlay Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white">
        <h1 className="text-4xl font-bold mb-6">
          Everything you love about TryIt – and so much more.
        </h1>
        <button className="px-8 py-3 bg-blue-800 rounded-full shadow-md hover:bg-blue-700 transition">
          Join the community now
        </button>
      <img
        src="src/assets/footer_img.png"
        alt="Hero Section"
        className="w-fit max-h-96 p-4"
      />
      </div>

    </div>
  );
};

export default HeroSection;
