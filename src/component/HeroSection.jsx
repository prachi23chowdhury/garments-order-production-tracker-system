import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const images = [
  'https://templatekit.jegtheme.com/textilery/wp-content/uploads/sites/122/2021/07/woman-working-in-textile-industry-7.jpg',
  'https://templatekit.jegtheme.com/textilery/wp-content/uploads/sites/122/2021/07/worker-in-textile-industry-sewing-2.jpg',
  'https://templatekit.jegtheme.com/textilery/wp-content/uploads/sites/122/2021/07/sewing-machines-nobody-cloth-industry.jpg',
  'https://templatekit.jegtheme.com/textilery/wp-content/uploads/sites/122/2021/07/woman-working-in-textile-industry-3.jpg'
];

export default function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  

  useEffect(() => {
  const interval = setInterval(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  }, 5000);
  return () => clearInterval(interval);
}, []);
  return (
    <section className="relative overflow-hidden">
      {/* Animated background images with motion */}
      <AnimatePresence>
  <motion.div
    key={currentIndex}
    className="absolute inset-0 bg-cover bg-center" // <-- এটা must
    style={{ backgroundImage: `url(${images[currentIndex]})` }}
    initial={{ opacity: 0, scale: 1.1 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 1.1 }}
    transition={{ duration: 1.5 }}
    aria-hidden="true"
  />
</AnimatePresence>


      {/* Overlay for better contrast */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent dark:from-black/70" />

      <div className="relative max-w-7xl mx-auto px-6 py-24 md:py-32 lg:py-40">
        <div className="max-w-2xl text-center mx-auto">
          <motion.h1
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white drop-shadow-md dark:text-white"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
          >
            Your Product, Your Story
          </motion.h1>

          <motion.p
            className="mt-4 text-lg sm:text-xl text-white/90 dark:text-white/85"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            A short, meaningful sentence that explains what you offer.
          </motion.p>

          <motion.div
            className="mt-8 flex justify-center gap-4 flex-wrap"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
          >
            <a
              href="#"
              className="inline-flex items-center justify-center rounded-lg px-6 py-3 text-base font-semibold bg-white text-black shadow-lg hover:scale-[1.02] transform transition"
            >
              View Product
            </a>

            <a
              href="#"
              className="inline-flex items-center justify-center rounded-lg px-6 py-3 text-base font-medium bg-white/20 text-white ring-1 ring-white/30 hover:bg-white/10 transition"
            >
              Book a Product
            </a>
          </motion.div>

          <motion.p
            className="mt-6 text-sm text-white/70"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
          >
            Free returns • 30-day money-back guarantee
          </motion.p>
        </div>
      </div>
    </section>
  );
}
