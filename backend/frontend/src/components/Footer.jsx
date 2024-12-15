import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-100 p-10 text-blue-600">
      <div className="container mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
        {/* Platform Section */}
        <div>
          <h4 className="font-bold mb-4">Platform</h4>
          <ul className="space-y-2">
            <li>
              <Link to="/How_it_Work">How It Works</Link>
            </li>
            <li>
              <Link to="/Contact">Contact</Link>
            </li>
            <li>
              <Link to="/SignInPage">Sign In</Link>
            </li>
            <li>
              <Link to="/SignUpPage">Sign Up</Link>
            </li>
            <li>
              <Link to="/Products">Products</Link>
            </li>
            <li>
              <Link to="/cart">Cart</Link>
            </li>
          </ul>
        </div>

        {/* Resources Section */}
        <div>
          <h4 className="font-bold mb-4">Resources</h4>
          <ul className="space-y-2">
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/order-history">Order History</Link>
            </li>
            <li>
              <Link to="/ProfileInformation">Profile</Link>
            </li>
          </ul>
        </div>

        {/* Company Section */}
        <div>
          <h4 className="font-bold mb-4">Company</h4>
          <ul className="space-y-2">
            <li>
              <Link to="/about">About Us</Link>
            </li>
            <li>
              <Link to="/How_it_Work">FAQs</Link>
            </li>
          </ul>
        </div>

        {/* Client Services & Support Section */}
        <div>
          <h4 className="font-bold mb-4">Client Services & Support</h4>
          <ul className="space-y-2">
            <li>
              <Link to="/Contact">Customer Support</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto mt-8 flex justify-between items-center text-xs text-gray-500">
        <p>© atharvaSawant. All rights reserved.</p>
        <ul className="flex space-x-4">
          <li>
            <Link to="/legal">Legal</Link>
          </li>
          <li>
            <Link to="/privacy">Privacy</Link>
          </li>
          <li>
            <Link to="/terms">Terms</Link>
          </li>
        </ul>
        <div className="flex space-x-4">
          <Link to="/facebook" target="_blank">
            <i className="fab fa-facebook"></i>
          </Link>
          <Link to="/x" target="_blank">
            <i className="fab fa-x"></i>
          </Link>
          <Link to="/linkedin" target="_blank">
            <i className="fab fa-linkedin"></i>
          </Link>
          <Link to="/instagram" target="_blank">
            <i className="fab fa-instagram"></i>
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
