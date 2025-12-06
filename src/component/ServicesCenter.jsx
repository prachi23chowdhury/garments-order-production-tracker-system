import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { GiSewingMachine, GiThreePointedShuriken, GiYarn } from "react-icons/gi";

export default function ServicesCenter() {
  const services = [
    {
      icon: <GiSewingMachine className="text-5xl text-green-500 mb-4 drop-shadow-md" />,
      title: "Fabric Dyeing",
      description:
        "Transform your fabrics with vibrant and long-lasting colors using our eco-friendly dyeing techniques.",
    },
    {
      icon: <GiYarn className="text-5xl text-green-500 mb-4 drop-shadow-md" />,
      title: "Satin Weaving",
      description:
        "Our satin weaving process produces smooth, shiny, and luxurious fabrics for premium quality garments.",
    },
    {
      icon: <GiThreePointedShuriken className="text-5xl text-green-500 mb-4 drop-shadow-md" />,
      title: "Digital Fabric Printing",
      description:
        "High-precision digital printing brings your designs to life with stunning clarity and rich color details.",
      dark: true,
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-green-50 to-white">
      <div className="max-w-7xl mx-auto px-6 text-center md:text-left">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-14">
          <div>
            <p className="text-green-600 font-semibold tracking-wide uppercase">Our Services</p>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-snug">
              Delivering The Highest <span className="text-green-500">Quality Fabrics</span>
            </h2>
          </div>

          <button className="mt-6 md:mt-0 bg-green-600 shadow-md text-white px-7 py-3 rounded-xl font-semibold 
            hover:bg-green-700 active:scale-95 transition transform duration-500">
            Explore All
          </button>
        </div>

        {/* Services List */}
        <div className="grid md:grid-cols-3 gap-10">
          {services.map((service, index) => (
            <div
              key={index}
              className={`p-10 rounded-3xl border-[1px] shadow-xl group cursor-pointer transition-all duration-700
                ${
                  service.dark
                    ? "bg-gray-900 text-white border-gray-700 hover:bg-green-700"
                    : "bg-white text-gray-900 border-gray-200 hover:bg-green-50"
                }
                hover:-translate-y-4 hover:shadow-2xl hover:scale-[1.04]
              `}
            >
              <div className="flex justify-center md:justify-start mb-3 group-hover:scale-110 transition duration-500">
                {service.icon}
              </div>

              <h3 className="text-2xl font-semibold mb-3">{service.title}</h3>

              <p className={`leading-relaxed mb-5 ${
                service.dark ? "text-gray-300" : "text-gray-600"
              }`}>
                {service.description}
              </p>

              <a
                href="#"
                className={`flex items-center gap-2 font-medium text-lg transition-all duration-500 
                  group-hover:translate-x-2 ${
                  service.dark
                    ? "text-green-300 hover:text-white"
                    : "text-green-600 hover:text-green-800"
                }`}
              >
                Read More <FaArrowRight className="mt-[2px]" />
              </a>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
