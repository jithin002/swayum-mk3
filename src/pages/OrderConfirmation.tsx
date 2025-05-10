
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useOrder } from "@/context/OrderContext";
import { useCart } from "@/context/CartContext";
import OrderHeader from "@/components/order/OrderHeader";
import OrderConfirmationBanner from "@/components/order/OrderConfirmationBanner";
import OrderDetails from "@/components/order/OrderDetails";
import OrderTracking from "@/components/order/OrderTracking";
import OrderItems from "@/components/order/OrderItems";
import CollectionCode from "@/components/order/CollectionCode";
import BackToMenuButton from "@/components/order/BackToMenuButton";

const OrderConfirmation: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getOrderById, updateOrderStatus, collectOrder } = useOrder();
  const { clearCart } = useCart();
  const navigate = useNavigate();
  const [order, setOrder] = useState(getOrderById(id || ""));

  useEffect(() => {
    if (!order) {
      navigate("/menu");
      return;
    }

    // Simulate order progress for demonstration
    const preparation = setTimeout(() => {
      updateOrderStatus(order.id, { preparation: true });
      setOrder(getOrderById(order.id));
    }, 8000);

    const readyForPickup = setTimeout(() => {
      updateOrderStatus(order.id, { readyForPickup: true });
      setOrder(getOrderById(order.id));
    }, 15000);

    return () => {
      clearTimeout(preparation);
      clearTimeout(readyForPickup);
    };
  }, [order, navigate, updateOrderStatus, getOrderById]);

  if (!order) return null;

  const handleCollectOrder = async (code: string): Promise<boolean> => {
    const success = await collectOrder(order.id, code);
    
    if (success) {
      clearCart(); // Clear the cart after successful collection
      
      // Update the local order
      setOrder(getOrderById(order.id));
    }
    
    return success;
  };

  return (
    <div className="min-h-screen flex flex-col pb-24">
      <OrderHeader />
      
      <main className="flex-1 p-4">
        <OrderConfirmationBanner orderId={order.id} />
        <OrderDetails order={order} onCollectOrder={handleCollectOrder} />
        <OrderTracking status={order.status} />
        <OrderItems items={order.items} totalAmount={order.totalAmount} />
        {order.orderCode && <CollectionCode code={order.orderCode} />}
      </main>
      
      <BackToMenuButton />
    </div>
  );
};

export default OrderConfirmation;
