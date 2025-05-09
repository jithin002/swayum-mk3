
import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface CarouselImage {
  src: string;
  alt: string;
}

const ImageCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [images, setImages] = useState<CarouselImage[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Fetch menu items from Supabase to use their images in the carousel
  useEffect(() => {
    const fetchMenuImages = async () => {
      try {
        const { data, error } = await supabase
          .from('menu_items')
          .select('image_url, name')
          .not('image_url', 'is', null);
        
        if (error) {
          console.error("Error fetching carousel images:", error);
          // Use default images as fallback
          setImages([
            { src: "/lovable-uploads/7ac79e1a-32a9-4be0-b5fe-daccedb94e1f.png", alt: "Masala Dosa" },
            { src: "/lovable-uploads/009bbf96-f771-498c-9c6c-230ae4756456.png", alt: "Chicken Biryani" },
            { src: "/lovable-uploads/02a620f8-4e01-43f1-b72e-9cb0bc8254c9.png", alt: "Dal Makhani" },
            { src: "/lovable-uploads/00540110-545d-4558-bfea-ed795a87a2da.png", alt: "Paneer Tikka" }
          ]);
        } else {
          // Transform Supabase data to carousel images
          const fetchedImages = data.map(item => ({
            src: item.image_url || "/placeholder.svg",
            alt: item.name || "Menu item"
          }));
          
          // Use fetched images if available, otherwise use defaults
          setImages(fetchedImages.length > 0 ? fetchedImages : [
            { src: "/lovable-uploads/7ac79e1a-32a9-4be0-b5fe-daccedb94e1f.png", alt: "Masala Dosa" },
            { src: "/lovable-uploads/009bbf96-f771-498c-9c6c-230ae4756456.png", alt: "Chicken Biryani" },
            { src: "/lovable-uploads/02a620f8-4e01-43f1-b72e-9cb0bc8254c9.png", alt: "Dal Makhani" },
            { src: "/lovable-uploads/00540110-545d-4558-bfea-ed795a87a2da.png", alt: "Paneer Tikka" }
          ]);
        }
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch carousel images:", err);
        setLoading(false);
      }
    };
    
    fetchMenuImages();
  }, []);
  
  // Auto-slide functionality
  useEffect(() => {
    if (images.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [images.length]);
  
  const goToPrevious = () => {
    if (images.length === 0) return;
    
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };
  
  const goToNext = () => {
    if (images.length === 0) return;
    
    setCurrentIndex((prevIndex) => 
      (prevIndex + 1) % images.length
    );
  };
  
  if (loading) {
    return <div className="h-48 bg-gray-100 animate-pulse rounded-lg"></div>;
  }
  
  return (
    <div className="relative rounded-lg overflow-hidden h-48 mb-4">
      <div 
        className="flex transition-transform duration-500 ease-in-out h-full"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((image, index) => (
          <img
            key={index}
            src={image.src}
            alt={image.alt}
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
