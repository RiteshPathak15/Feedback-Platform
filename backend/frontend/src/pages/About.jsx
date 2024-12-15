import React from "react";

const About = () => {
  return (
    <div className="bg-gray-50 text-gray-800 font-sans">
      <main className="max-w-6xl mx-auto mt-10 p-6">
        {/* About Us Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-blue-500 mb-4">About Us</h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            Welcome to Feedback Management System, your trusted platform for
            sharing honest reviews and earning exciting rewards. Our mission is
            to empower both businesses and customers by enabling a transparent
            feedback loop. Whether you're a customer looking to share your
            experience or a business eager to grow through actionable insights,
            we’ve got you covered.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold text-blue-500 mb-2">
                Our Vision
              </h3>
              <p className="text-gray-600">
                To create a world where feedback drives innovation and customer
                satisfaction is the ultimate goal. Together, we aim to build
                products and services that genuinely serve users' needs.
              </p>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold text-blue-500 mb-2">
                Our Commitment
              </h3>
              <p className="text-gray-600">
                We promise to prioritize user satisfaction by maintaining a fair
                and user-friendly platform. Every valid review you submit helps
                improve products and rewards you in return.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Us Section */}
        <section>
          <h2 className="text-3xl font-bold text-blue-500 mb-4">
            Contact Us
          </h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            Have questions, feedback, or just want to get in touch? We’re here
            to assist you. Check out the details below to find the best way to
            reach us or learn more about how we can help.
          </p>

          {/* Contact Details */}
          <div className="space-y-6 mb-10">
            <div className="flex items-center space-x-4">
              <img
                src="https://cdn-icons-png.flaticon.com/512/552/552486.png"
                alt="Phone"
                className="w-8 h-8"
              />
              <p className="text-gray-700 text-lg">Phone: +1 234 567 890</p>
            </div>
            <div className="flex items-center space-x-4">
              <img
                src="https://cdn-icons-png.flaticon.com/512/732/732200.png"
                alt="Email"
                className="w-8 h-8"
              />
              <p className="text-gray-700 text-lg">
                Email: support@feedbacksystem.com
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <img
                src="https://cdn-icons-png.flaticon.com/512/747/747376.png"
                alt="Location"
                className="w-8 h-8"
              />
              <p className="text-gray-700 text-lg">
                Address: 123 Feedback Lane, San Francisco, CA
              </p>
            </div>
          </div>

          {/* Social Media Links */}
          <div className="mb-10">
            <h3 className="text-2xl font-bold text-blue-500 mb-4">
              Follow Us
            </h3>
            <p className="text-gray-600 mb-4">
              Stay updated with our latest updates and announcements by
              following us on social media:
            </p>
            <div className="flex space-x-6">
              <a
                href="#"
                target="_blank"
                className="text-gray-700 hover:text-blue-500"
                rel="noopener noreferrer"
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/512/733/733547.png"
                  alt="Facebook"
                  className="w-8 h-8"
                />
              </a>
              <a
                href="#"
                target="_blank"
                className="text-gray-700 hover:text-blue-500"
                rel="noopener noreferrer"
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/512/733/733558.png"
                  alt="Twitter"
                  className="w-8 h-8"
                />
              </a>
              <a
                href="#"
                target="_blank"
                className="text-gray-700 hover:text-blue-500"
                rel="noopener noreferrer"
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/512/733/733579.png"
                  alt="Instagram"
                  className="w-8 h-8"
                />
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default About;
