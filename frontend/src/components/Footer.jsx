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
              <Link to="/sampling">Sampling</Link>
            </li>
            <li>
              <Link to="/creator-partnerships">Creator Partnerships</Link>
            </li>
            <li>
              <Link to="/qa">Questions & Answers</Link>
            </li>
            <li>
              <Link to="/retail-syndication">Retail Syndication</Link>
            </li>
            <li>
              <Link to="/digital-activations">
                In-store & Digital Activations
              </Link>
            </li>
            <li>
              <Link to="/services">Services</Link>
            </li>
            <li>
              <Link to="/affable-ai">TestifyIt Affable.ai</Link>
            </li>
          </ul>
        </div>

        {/* Resources Section */}
        <div>
          <h4 className="font-bold mb-4">Resources</h4>
          <ul className="space-y-2">
            <li>
              <Link to="/resources-hub">Resources Hub</Link>
            </li>
            <li>
              <Link to="/blog">Blog</Link>
            </li>
            <li>
              <Link to="/case-studies">Case Studies</Link>
            </li>
            <li>
              <Link to="/what-is-ugc">What is UGC?</Link>
            </li>
          </ul>
        </div>

        {/* Company Section */}
        <div>
          <h4 className="font-bold mb-4">Company</h4>
          <ul className="space-y-2">
            <li>
              <Link to="/about">About TestifyIt</Link>
            </li>
            <li>
              <Link to="/advantage">The TestifyIt Advantage</Link>
            </li>
            <li>
              <Link to="/How_it_Work">FAQs</Link>
            </li>
            <li>
              <Link to="/trust">Trust</Link>
            </li>
            <li>
              <Link to="/careers">Careers</Link>
            </li>
            <li>
              <Link to="/press">Press</Link>
            </li>
            <li>
              <Link to="/events">TestifyIt Events</Link>
            </li>
            <li>
              <Link to="/product-updates">Product Updates</Link>
            </li>
          </ul>
        </div>

        {/* Client Services & Support Section */}
        <div>
          <h4 className="font-bold mb-4">Client Services & Support</h4>
          <ul className="space-y-2">
            <li>
              <Link to="/customer-support">Customer Support</Link>
            </li>
            <li>
              <Link to="/knowledge-base">Knowledge Base</Link>
            </li>
            <li>
              <Link to="/developers">Developers</Link>
            </li>
            <li>
              <Link to="/system-status">System Status</Link>
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
            <Link to="/authenticity">Authenticity</Link>
          </li>
          <li>
            <Link to="/terms">Terms</Link>
          </li>
          <li>
            <Link to="/cookie-settings">Cookie Settings</Link>
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
