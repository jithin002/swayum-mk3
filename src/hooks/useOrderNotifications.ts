
import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useAuth } from '@/context/AuthContext';

export const useOrderNotifications = () => {
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    const channel = supabase
      .channel('order-status-changes')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'orders',
          filter: `user_id=eq.${user.id}`
        },
        (payload) => {
          const newStatus = payload.new.status;
          const oldStatus = payload.old.status;
          
          if (newStatus !== oldStatus) {
            handleStatusChange(newStatus, payload.new.ref_id);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  const handleStatusChange = (status: string, refId: string) => {
    switch (status) {
      case 'preparing':
        toast.success('🍳 Your order is being prepared!', {
          description: `Order ${refId} is now in the kitchen.`
        });
        break;
      case 'ready':
        toast.success('🔔 Your order is ready for pickup!', {
          description: `Order ${refId} is waiting for you at the counter.`,
          duration: 10000,
        });
        break;
      case 'completed':
        toast.success('✅ Order completed!', {
          description: `Thank you for collecting order ${refId}!`
        });
        break;
      default:
        toast.info('📦 Order status updated', {
          description: `Order ${refId} status: ${status}`
        });
    }
  };
};
