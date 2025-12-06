import React from "react";
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
import logo from "../../public/assest/thread.jpg";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-base-200 text-base-content p-10 mt-10">
      
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* LOGO + DESCRIPTION */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <img src={logo} alt="Logo" className="h-16 w-16 rounded-full" />
            <h2 className="text-2xl font-bold">StitchSync</h2>
          </div>
          <p className="text-gray-600 leading-6">
            StitchSync is your complete Garments Order & Production Tracking System.
            Manage orders, track progress, and supervise production effortlessly.
          </p>
        </div>

        {/* USEFUL LINKS */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Useful Links</h3>
          <ul className="space-y-2 text-gray-700">
            <li><a className="hover:text-blue-500">Home</a></li>
            <li><a className="hover:text-blue-500">All Products</a></li>
            <li><a className="hover:text-blue-500">About Us</a></li>
            <li><a className="hover:text-blue-500">Contact</a></li>
          </ul>
        </div>

        {/* SUPPORT */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Customer Support</h3>
          <ul className="space-y-2 text-gray-700">
            <li><a className="hover:text-blue-500">Help Center</a></li>
            <li><a className="hover:text-blue-500">FAQ</a></li>
            <li><a className="hover:text-blue-500">Terms & Conditions</a></li>
            <li><a className="hover:text-blue-500">Privacy Policy</a></li>
          </ul>
        </div>

        {/* CONTACT INFO + SOCIAL ICONS (MOVED HERE) */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Contact Info</h3>
          <ul className="space-y-2 text-gray-700 mb-4">
            <li>Email: support@stitchsync.com</li>
            <li>Phone: +880 1234 567 890</li>
            <li>Location: Dhaka, Bangladesh</li>
          </ul>

          {/* SOCIAL ICONS MOVED HERE */}
          <div className="flex gap-4 mt-3 text-2xl">
            <a href="https://www.facebook.com/" className="hover:text-blue-600 transition"><FaFacebook /></a>
            <a href="https://www.instagram.com/" className="hover:text-pink-600 transition"><FaInstagram /></a>
            <a href="https://x.com/" className="hover:text-blue-500 transition"><FaXTwitter /></a>
            <a href="https://www.youtube.com" className="hover:text-red-600 transition"><FaYoutube /></a>
            <a href="https://www.linkedin.com" className="hover:text-blue-700 transition"><FaLinkedin /></a>
          </div>
        </div>

      </div>

      {/* COPYRIGHT */}
      <div className="text-center mt-10 border-t pt-4 text-gray-600 font-black">
        © 2025 StitchSync. All Rights Reserved.
      </div>

    </footer>
  );
};

export default Footer;
