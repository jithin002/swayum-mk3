
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useOrder } from "@/context/OrderContext";
import { useCart } from "@/context/CartContext";
import { supabase } from "@/integrations/supabase/client";
import OrderHeader from "@/components/order/OrderHeader";
import OrderConfirmationBanner from "@/components/order/OrderConfirmationBanner";
import OrderDetails from "@/components/order/OrderDetails";
import OrderTracking from "@/components/order/OrderTracking";
import OrderItems from "@/components/order/OrderItems";
import BackToMenuButton from "@/components/order/BackToMenuButton";
import NotificationSettings from "@/components/NotificationSettings";
import { toast } from "sonner";
import { Check, Clock } from "lucide-react";
import CollectionCode from "@/components/order/CollectionCode";

const OrderConfirmation: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { clearCart } = useCart();
  const navigate = useNavigate();
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      navigate("/menu");
      return;
    }

    const fetchOrder = async () => {
      try {
        setLoading(true);
        // Fetch order data from Supabase where ref_id matches the id parameter
        const { data, error } = await supabase
          .from('orders')
          .select(`
            id, 
            ref_id, 
            total_amount, 
            created_at, 
            status, 
            pickup_time, 
            order_code,
            collected,
            order_items(*)
          `)
          .eq('ref_id', id)
          .maybeSingle();

        if (error || !data) {
          console.error("Error fetching order:", error);
          toast.error("Could not find your order. Redirecting to menu.");
          setTimeout(() => navigate("/menu"), 2000);
          return;
        }

        // Transform the data to match our Order type
        const formattedOrder = {
          id: data.ref_id,
          refId: data.ref_id,
          internalId: data.id,
          items: data.order_items ? data.order_items.map((item: any) => ({
            id: item.item_id?.toString() || "",
            name: item.item_name,
            price: Number(item.price),
            quantity: item.quantity,
            description: "",
            image: "/placeholder.svg",
            category: "",
            isVegetarian: false,
            available: true,
            maxQuantity: 4
          })) : [],
          totalAmount: Number(data.total_amount),
          orderDate: new Date(data.created_at).toLocaleDateString(),
          pickupTime: data.pickup_time || "",
          status: {
            received: true,
            preparation: data.status === 'preparing' || data.status === 'ready' || data.status === 'completed',
            readyForPickup: data.status === 'ready' || data.status === 'completed',
            completed: data.status === 'completed' || data.collected,
          },
          orderCode: data.order_code || "",
          rawStatus: data.status
        };

        setOrder(formattedOrder);

        // Real-time subscription for order updates
        const channel = supabase
          .channel(`order-${data.id}`)
          .on(
            'postgres_changes',
            {
              event: 'UPDATE',
              schema: 'public',
              table: 'orders',
              filter: `id=eq.${data.id}`
            },
            (payload) => {
              const newStatus = payload.new.status;
              const collected = payload.new.collected;
              
              // Update the order state with new status
              setOrder((prevOrder: any) => ({
                ...prevOrder,
                status: {
                  received: true,
                  preparation: newStatus === 'preparing' || newStatus === 'ready' || newStatus === 'completed',
                  readyForPickup: newStatus === 'ready' || newStatus === 'completed',
                  completed: newStatus === 'completed' || collected,
                },
                rawStatus: newStatus
              }));
            }
          )
          .subscribe();

        // Cleanup subscription on unmount
        return () => {
          supabase.removeChannel(channel);
        };
        
      } catch (error) {
        console.error("Error in order fetch:", error);
        toast.error("An error occurred while fetching your order");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-swayum-orange"></div>
        <p className="mt-4 text-gray-600">Loading your order...</p>
      </div>
    );
  }

  if (!order) return null;

  return (
    <div className="min-h-screen flex flex-col pb-24">
      <OrderHeader />

      <main className="flex-1 p-4">
        <OrderConfirmationBanner orderId={order.id} />
        <OrderDetails order={order} />
        <OrderTracking status={order.status} />
        <OrderItems items={order.items} totalAmount={order.totalAmount} />
        {/* CollectionCode, visible if order.orderCode exists */}
        {order.orderCode && (
          <CollectionCode code={order.orderCode} />
        )}
        <NotificationSettings />
      </main>

      <BackToMenuButton />
    </div>
  );
};

export default OrderConfirmation;
