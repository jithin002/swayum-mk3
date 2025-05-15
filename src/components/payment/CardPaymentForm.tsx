
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface CardPaymentFormProps {
  cardData: {
    cardNumber: string;
    cardholderName: string;
    expiryDate: string;
    cvv: string;
  };
  setCardData: React.Dispatch<React.SetStateAction<{
    cardNumber: string;
    cardholderName: string;
    expiryDate: string;
    cvv: string;
  }>>;
}

const CardPaymentForm: React.FC<CardPaymentFormProps> = ({ cardData, setCardData }) => {
  // Format card number with spaces after every 4 digits
  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    
    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };
  
  // Format expiry date as MM/YY
  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    
    if (v.length >= 2) {
      return v.slice(0, 2) + (v.length > 2 ? '/' + v.slice(2, 4) : '');
    }
    
    return v;
  };
  
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="cardNumber">Card Number</Label>
        <Input 
          id="cardNumber"
          placeholder="1234 5678 9012 3456"
          value={cardData.cardNumber}
          onChange={(e) => setCardData({...cardData, cardNumber: formatCardNumber(e.target.value)})}
          maxLength={19} // 16 digits + 3 spaces
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="cardholderName">Cardholder Name</Label>
        <Input 
          id="cardholderName"
          placeholder="Name on card"
          value={cardData.cardholderName}
          onChange={(e) => setCardData({...cardData, cardholderName: e.target.value})}
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="expiryDate">Expiry Date</Label>
          <Input 
            id="expiryDate"
            placeholder="MM/YY"
            value={cardData.expiryDate}
            onChange={(e) => setCardData({...cardData, expiryDate: formatExpiryDate(e.target.value)})}
            maxLength={5} // MM/YY format (5 chars)
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="cvv">CVV</Label>
          <Input 
            id="cvv"
            placeholder="123"
            value={cardData.cvv}
            onChange={(e) => {
              const value = e.target.value.replace(/[^\d]/g, '');
              setCardData({...cardData, cvv: value});
            }}
            maxLength={3}
            type="password"
          />
        </div>
      </div>
      
      <div className="bg-gray-50 p-3 rounded-md mt-4">
        <p className="text-xs text-gray-500">
          This is a demo payment form. No real payment will be processed. 
          For testing, use any valid-looking card details.
        </p>
      </div>
    </div>
  );
};

export default CardPaymentForm;
