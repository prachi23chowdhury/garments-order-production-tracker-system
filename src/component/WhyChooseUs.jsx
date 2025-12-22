import { motion } from "framer-motion";
import { FaTruckFast, FaShieldHalved, FaStar, FaDollarSign } from "react-icons/fa6";

const features = [
  {
    icon: <FaTruckFast />,
    title: "Fast Delivery",
    desc: "Quick & reliable product delivery across the country.",
  },
  {
    icon: <FaDollarSign />,
    title: "Best Price",
    desc: "Competitive pricing with no hidden charges.",
  },
  {
    icon: <FaShieldHalved />,
    title: "Secure Payment",
    desc: "100% secure and encrypted payment system.",
  },
  {
    icon: <FaStar />,
    title: "Trusted Quality",
    desc: "Verified products and trusted sellers.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="py-16 bg-base-100">
      <div className="max-w-7xl mx-auto px-4">
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-center mb-12"
        >
          Why Choose Us
        </motion.h2>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="p-6 rounded-2xl shadow-md bg-base-200 text-center cursor-pointer"
            >
              <div className="text-4xl text-primary mb-4 flex justify-center">
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-sm opacity-80">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
