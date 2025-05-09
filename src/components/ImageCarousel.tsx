
import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const images = [
  "/lovable-uploads/7ac79e1a-32a9-4be0-b5fe-daccedb94e1f.png",
  "/lovable-uploads/009bbf96-f771-498c-9c6c-230ae4756456.png",
  "/lovable-uploads/02a620f8-4e01-43f1-b72e-9cb0bc8254c9.png",
  "/lovable-uploads/00540110-545d-4558-bfea-ed795a87a2da.png"
];

const ImageCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);
  
  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };
  
  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      (prevIndex + 1) % images.length
    );
  };
  
  return (
    <div className="relative rounded-lg overflow-hidden h-48 mb-4">
      <div 
        className="flex transition-transform duration-500 ease-in-out h-full"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Food item ${index + 1}`}
            className="w-full h-full object-cover flex-shrink-0"
          />
        ))}
      </div>
      
      <button 
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/50 rounded-full p-1.5"
        onClick={goToPrevious}
        aria-label="Previous image"
      >
        <ChevronLeft size={20} className="text-swayum-orange" />
      </button>
      
      <button 
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/50 rounded-full p-1.5"
        onClick={goToNext}
        aria-label="Next image"
      >
        <ChevronRight size={20} className="text-swayum-orange" />
      </button>
      
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full ${
              index === currentIndex ? "bg-swayum-orange" : "bg-white/50"
            }`}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;
