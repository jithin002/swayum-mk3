
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { useOrder } from "@/context/OrderContext";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { CreditCard, IndianRupee, ArrowLeft, Check } from "lucide-react";
import CardPaymentForm from "@/components/payment/CardPaymentForm";
import UpiPaymentForm from "@/components/payment/UpiPaymentForm";

type PaymentMethod = "card" | "upi";

const PaymentGateway: React.FC = () => {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const { createOrder } = useOrder();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("card");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);
  
  // Form data for different payment methods
  const [cardData, setCardData] = useState({
    cardNumber: "",
    cardholderName: "",
    expiryDate: "",
    cvv: "",
  });
  
  const [upiId, setUpiId] = useState("");
  
  // If cart is empty, redirect to cart page
  React.useEffect(() => {
    if (cartItems.length === 0) {
      navigate("/cart");
    }
  }, [cartItems, navigate]);

  const handleProcessPayment = async () => {
    // Validate form based on payment method
    if (paymentMethod === "card") {
      if (!cardData.cardNumber || !cardData.cardholderName || !cardData.expiryDate || !cardData.cvv) {
        toast.error("Please fill all card details");
        return;
      }
      
      if (cardData.cardNumber.replace(/\s/g, "").length !== 16) {
        toast.error("Please enter a valid 16-digit card number");
        return;
      }
      
      if (cardData.cvv.length !== 3) {
        toast.error("Please enter a valid 3-digit CVV");
        return;
      }
    } else if (paymentMethod === "upi") {
      if (!upiId || !upiId.includes("@")) {
        toast.error("Please enter a valid UPI ID");
        return;
      }
    }

    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsPaymentSuccessful(true);
      
      // Show success message
      toast.success("Payment successful!");
      
      // After showing success, process the order
      setTimeout(async () => {
        try {
          if (cartItems.length === 0) {
            navigate("/menu");
            return;
          }
          
          const pickupTime = cartItems[0].pickupTime;
          const totalAmount = getCartTotal();
          
          // Create order
          const order = await createOrder(cartItems, totalAmount, pickupTime);
          
          if (order) {
            clearCart();
            navigate(`/order-confirmation/${order.id}`);
          } else {
            toast.error("Failed to create order");
            navigate("/cart");
          }
        } catch (error) {
          console.error("Error creating order:", error);
          toast.error("Something went wrong, please try again");
          navigate("/cart");
        }
      }, 1500);
    }, 2000);
  };

  const handleGoBack = () => {
    navigate("/cart");
  };

  if (isPaymentSuccessful) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-orange-50 p-4">
        <div className="bg-white rounded-lg shadow-md p-8 max-w-md w-full text-center">
          <div className="flex justify-center mb-6">
            <div className="h-20 w-20 bg-green-100 rounded-full flex items-center justify-center">
              <Check className="h-10 w-10 text-green-500" />
            </div>
          </div>
          <h2 className="text-2xl font-bold mb-2">Payment Successful!</h2>
          <p className="text-gray-600 mb-6">Processing your order...</p>
          <div className="animate-pulse flex justify-center">
            <div className="h-2 w-24 bg-swayum-orange rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-orange-50 pb-20">
      <div className="swayum-header">
        <button onClick={handleGoBack} className="text-white">
          <ArrowLeft className="h-6 w-6" />
        </button>
        <h1 className="text-2xl font-bold">Payment</h1>
        <div className="w-6"></div> {/* Empty div for spacing */}
      </div>
      
      <main className="flex-1 p-4">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Total Amount</h2>
            <div className="flex items-center text-3xl font-bold text-swayum-orange">
              <IndianRupee className="h-6 w-6 mr-1" />
              <span>{getCartTotal()}</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4">Select Payment Method</h3>
          
          <RadioGroup 
            value={paymentMethod} 
            onValueChange={(value) => setPaymentMethod(value as PaymentMethod)}
            className="space-y-4"
          >
            <div className="flex items-center space-x-2 border rounded-md p-3 hover:bg-gray-50">
              <RadioGroupItem value="card" id="card" />
              <Label htmlFor="card" className="flex items-center cursor-pointer flex-1">
                <CreditCard className="h-5 w-5 mr-2" />
                <span>Credit / Debit Card</span>
              </Label>
            </div>
            
            <div className="flex items-center space-x-2 border rounded-md p-3 hover:bg-gray-50">
              <RadioGroupItem value="upi" id="upi" />
              <Label htmlFor="upi" className="flex items-center cursor-pointer flex-1">
                <IndianRupee className="h-5 w-5 mr-2" />
                <span>UPI</span>
              </Label>
            </div>
          </RadioGroup>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4">
            {paymentMethod === "card" ? "Enter Card Details" : "Enter UPI Details"}
          </h3>
          
          {paymentMethod === "card" ? (
            <CardPaymentForm cardData={cardData} setCardData={setCardData} />
          ) : (
            <UpiPaymentForm upiId={upiId} setUpiId={setUpiId} />
          )}
        </div>
      </main>
      
      <div className="fixed bottom-16 left-0 right-0 bg-white border-t p-4 z-40">
        <button 
          className={`w-full py-3 px-4 rounded-lg font-semibold flex items-center justify-center ${
            isProcessing 
              ? 'bg-gray-300'
              : 'bg-swayum-orange text-white'
          }`}
          onClick={handleProcessPayment}
          disabled={isProcessing}
        >
          {isProcessing ? (
            <div className="flex items-center">
              <div className="animate-spin mr-2 h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
              Processing...
            </div>
          ) : (
            <>
              <CreditCard className="mr-2" size={18} />
              Pay Now
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default PaymentGateway;
