
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import MenuPage from "./pages/MenuPage";
import MenuItemDetail from "./pages/MenuItemDetail";
import CartPage from "./pages/CartPage";
import PaymentGateway from "./pages/PaymentGateway"; 
import OrderConfirmation from "./pages/OrderConfirmation";
import AuthPage from "./pages/AuthPage";
import { CartProvider } from "./context/CartContext";
import { OrderProvider } from "./context/OrderContext";
import { AuthProvider } from "./context/AuthContext";
import { useState } from "react";

const App = () => {
  // Create a new QueryClient instance inside the component
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <CartProvider>
            <OrderProvider>
              <TooltipProvider>
                <Toaster />
                <Sonner />
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/menu" element={<MenuPage />} />
                  <Route path="/menu/:id" element={<MenuItemDetail />} />
                  <Route path="/cart" element={<CartPage />} />
                  <Route path="/payment-gateway" element={<PaymentGateway />} />
                  <Route path="/order-confirmation/:id" element={<OrderConfirmation />} />
                  <Route path="/auth" element={<AuthPage />} />
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </TooltipProvider>
            </OrderProvider>
          </CartProvider>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
