import React from "react";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      
      {/* Hero Section */}
      <div className="bg-gray-900 text-white py-20 text-center px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          About Us
        </h1>
        <p className="max-w-2xl mx-auto text-blue-100">
          We create modern and quality web solutions that help your business move forward.
        </p>
      </div>

      {/* Content Section */}
      <div className="max-w-6xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-10">
        
        {/* Left - Text */}
        <div>
          <h2 className="text-3xl font-bold mb-4">Who We Are</h2>
          <p className="text-gray-700 mb-4">
            We are a team of experienced developers who build web and applications using React, Node.js, and modern technologies.
          </p>
          <p className="text-gray-700">
            Our goal is to provide simple, fast and secure digital solutions that solve our clients' business problems.
          </p>
        </div>

        {/* Right - Image */}
        <div className="flex items-center justify-center">
          <img
            src="https://via.placeholder.com/400x300"
            alt="About Us"
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-10">
          
          <div className="bg-gray-50 p-8 rounded-lg shadow">
            <h3 className="text-2xl font-semibold mb-3">Our Mission</h3>
            <p className="text-gray-600">
              Creating high-quality software for clients that is user-friendly and beneficial in the long run.
            </p>
          </div>

          <div className="bg-gray-50 p-8 rounded-lg shadow">
            <h3 className="text-2xl font-semibold mb-3">Our Vision</h3>
            <p className="text-gray-600">
              To establish itself as a world-class tech solution provider from Bangladesh.
            </p>
          </div>

        </div>
      </div>

      {/* Team Section */}
      <div className="py-16 bg-gray-100">
        <h2 className="text-3xl font-bold text-center mb-10">Our Team</h2>

        <div className="max-w-6xl mx-auto px-4 grid sm:grid-cols-2 md:grid-cols-3 gap-8">
          
          {["John Doe", "Jane Smith", "Alex Rahman"].map((name, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow text-center"
            >
              <img
                src="https://via.placeholder.com/150"
                alt={name}
                className="w-24 h-24 mx-auto rounded-full mb-4"
              />
              <h4 className="text-xl font-semibold">{name}</h4>
              <p className="text-gray-500">Frontend Developer</p>
            </div>
          ))}

        </div>
      </div>

    </div>
  );
};

export default AboutUs;
