import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';


const images = [
  '/images/image1.jpeg',
  '/images/slide2.jpeg',
  '/images/slide3.jpeg',
  '/images/slide4.jpg',
  '/images/slide5.jpg',
];

const HeroSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const slideTimer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);

    return () => clearInterval(slideTimer);
  }, []);

  return (
    <>
      <div className="flex justify-center items-center mt-4 bg-gray-100">
    <div className="relative flex  w-[170vh]  h-[70vh] overflow-hidden rounded-2xl shadow-lg">
     
      <AnimatePresence mode="popLayout">
        <motion.img
          key={images[currentIndex]}
          src={images[currentIndex]}
          alt={`Slide ${currentIndex + 1}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full h-full object-cover"
        />
      </AnimatePresence>

      {/* Dots */}
      <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full ${
              currentIndex === index ? 'bg-white' : 'bg-white/50'
            }`}
          ></button>
        ))}
      </div>
    </div>
    </div>
    
    </>
  );
};

export default HeroSlider;
