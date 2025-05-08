
import React, { useState, useEffect } from "react";
import { TimeSlot } from "@/types";
import { generateTimeSlots } from "@/services/timeSlotService";

interface TimeSlotSelectorProps {
  onSelectTimeSlot: (time: string) => void;
  selectedTime: string | null;
}

const TimeSlotSelector: React.FC<TimeSlotSelectorProps> = ({ onSelectTimeSlot, selectedTime }) => {
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);

  useEffect(() => {
    // Generate time slots when component mounts
    const slots = generateTimeSlots();
    setTimeSlots(slots);
  }, []);

  return (
    <div className="my-4">
      <h3 className="text-lg font-semibold mb-3 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-swayum-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Select Pickup Time
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {timeSlots.map((slot, index) => (
          <button
            key={index}
            className={`time-slot-btn ${
              selectedTime === slot.time
                ? "active"
                : slot.available
                ? "bg-white border-gray-300"
                : "inactive"
            }`}
            onClick={() => slot.available && onSelectTimeSlot(slot.time)}
            disabled={!slot.available}
          >
            {slot.time}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TimeSlotSelector;
