
import React from "react";

/**
 * Fullscreen splash screen with fade animation and centered logo.
 * Uses your provided brand logo, gently fades in and out.
 */
const SplashScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[1000] flex flex-col items-center justify-center w-full h-full bg-white transition-opacity animate-fade-in">
      <img
        src="/lovable-uploads/0dcbf01a-3209-447e-90c0-7e4f688eb578.png"
        alt="Swayum Canteen Logo"
        className="w-44 h-44 md:w-56 md:h-56 rounded-full shadow-lg animate-scale-in"
        draggable={false}
        style={{
          objectFit: "contain",
          background: "white",
        }}
      />
      <h1 className="mt-8 text-3xl font-extrabold text-swayum-orange tracking-tight animate-fade-in">
        Swayum Canteen
      </h1>
      <div className="mt-4">
        <div className="w-10 h-10 border-4 border-swayum-orange border-t-transparent rounded-full animate-spin"></div>
      </div>
    </div>
  );
};

export default SplashScreen;
