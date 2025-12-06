import React from 'react';
import { FaRegLightbulb, FaTools, FaRocket } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function HowItWorks() {
  const steps = [
    {
      icon: <FaRegLightbulb className="text-4xl text-white" />,
      title: "Step 1: Idea",
      description: "Think of your product idea or service you want to offer."
    },
    {
      icon: <FaTools className="text-4xl text-white" />,
      title: "Step 2: Build",
      description: "We help you develop, design, and prepare your solution."
    },
    {
      icon: <FaRocket className="text-4xl text-white" />,
      title: "Step 3: Launch",
      description: "Launch your product and reach your audience effectively."
    },
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <section className="py-20 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-12">How It Works</h2>
        <motion.div 
          className="grid md:grid-cols-3 gap-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition duration-300"
              variants={itemVariants}
            >
              <div className="flex justify-center mb-4">{step.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-300">{step.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
