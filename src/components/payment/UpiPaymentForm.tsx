
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IndianRupee } from "lucide-react";

interface UpiPaymentFormProps {
  upiId: string;
  setUpiId: React.Dispatch<React.SetStateAction<string>>;
}

const UpiPaymentForm: React.FC<UpiPaymentFormProps> = ({ upiId, setUpiId }) => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="upiId">UPI ID</Label>
        <Input 
          id="upiId"
          placeholder="yourname@upi"
          value={upiId}
          onChange={(e) => setUpiId(e.target.value)}
          className="text-base"
        />
        <p className="text-xs text-gray-500 mt-1">
          Enter your UPI ID (e.g., yourname@okicici, user@ybl)
        </p>
      </div>
      
      <div className="bg-orange-50 p-4 rounded-lg border border-orange-100">
        <div className="flex items-center mb-3">
          <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center mr-3">
            <IndianRupee className="h-5 w-5 text-swayum-orange" />
          </div>
          <div>
            <h4 className="font-medium">UPI Payment</h4>
            <p className="text-sm text-gray-500">Quick, secure payments</p>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mt-2">
          {['@okicici', '@oksbi', '@ybl', '@paytm', '@upi'].map(provider => (
            <button
              key={provider}
              className="bg-white border rounded-full px-3 py-1 text-xs hover:bg-gray-50"
              onClick={() => {
                const username = upiId.split('@')[0] || '';
                setUpiId(username + provider);
              }}
            >
              {provider}
            </button>
          ))}
        </div>
      </div>
      
      <div className="bg-gray-50 p-3 rounded-md">
        <p className="text-xs text-gray-500">
          This is a demo payment form. No real payment will be processed.
          For testing, use any valid-looking UPI ID.
        </p>
      </div>
    </div>
  );
};

export default UpiPaymentForm;
