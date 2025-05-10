
import React from "react";
import { Link } from "react-router-dom";

const BackToMenuButton: React.FC = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 z-40">
      <Link 
        to="/menu"
        className="block w-full py-3 px-4 bg-swayum-orange text-white rounded-lg font-semibold text-center"
      >
        Back to Menu
      </Link>
    </div>
  );
};

export default BackToMenuButton;
