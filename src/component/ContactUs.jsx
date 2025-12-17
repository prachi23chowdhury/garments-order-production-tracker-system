import React from "react";
import { FaCircle, FaMailchimp, FaPhone } from "react-icons/fa";

const ContactUs = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white shadow-lg rounded-lg max-w-4xl w-full grid md:grid-cols-2">
        
        {/* Left Side - Info */}
        <div className="bg-gray-900 text-white p-8 rounded-t-lg md:rounded-l-lg md:rounded-tr-none">
          <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
          <p className="mb-6 text-blue-100">
            Please contact us if you have any questions or need assistance
          </p>

          <div className="space-y-4">
            <p><FaCircle/> Address: Dhaka, Bangladesh</p>
            <p><FaPhone/> Phone: +880 1234 567890</p>
            <p><FaMailchimp/> Email: support@example.com</p>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="p-8">
          <h3 className="text-2xl font-semibold mb-6">Send a Message</h3>

          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                placeholder="Your Name"
                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                placeholder="Your Email"
                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Message</label>
              <textarea
                rows="4"
                placeholder="Your Message"
                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-gray-900 text-white py-2 rounded-md hover:bg-blue-700 transition"
            >
              Send Message
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default ContactUs;
