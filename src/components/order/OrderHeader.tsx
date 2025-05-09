
import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const OrderHeader: React.FC = () => {
  return (
    <div className="swayum-header">
      <Link to="/" className="text-white">
        <ArrowLeft size={24} />
      </Link>
      <h1 className="text-2xl font-bold">Order Confirmed</h1>
      <div className="w-6"></div>
    </div>
  );
};

export default OrderHeader;
