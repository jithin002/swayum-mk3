
import React from "react";

interface CollectionCodeProps {
  code: string;
}

const CollectionCode: React.FC<CollectionCodeProps> = ({ code }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-5 mb-6">
      <h3 className="text-lg font-semibold mb-3">Collection Code</h3>
      <div className="flex justify-center mb-4">
        <div className="border-2 border-swayum-orange p-4 rounded-md">
          <span className="text-3xl font-bold text-swayum-orange">{code}</span>
        </div>
      </div>
      <p className="text-center font-semibold">Show this code when picking up your order</p>
    </div>
  );
};

export default CollectionCode;
