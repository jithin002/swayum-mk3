
import { TimeSlot } from "@/types";
import { format, parse, addMinutes } from "date-fns";

// Generate time slots with 15-minute intervals within a 2-hour window
export const generateTimeSlots = (): TimeSlot[] => {
  const now = new Date();
  const slots: TimeSlot[] = [];
  
  // Round current time to next 15 min interval
  const minutes = now.getMinutes();
  const remainder = minutes % 15;
  const roundedMinutes = remainder === 0 ? minutes : minutes + (15 - remainder);
  
  const startTime = new Date(now);
  startTime.setMinutes(roundedMinutes, 0, 0);
  
  // Generate slots for 2 hours (8 slots of 15 minutes)
  for (let i = 0; i < 8; i++) {
    const slotTime = addMinutes(startTime, i * 15);
    slots.push({
      time: format(slotTime, "h:mm a"),
      available: true
    });
  }
  
  return slots;
};

// Format time slots for display
export const formatTimeSlot = (timeSlot: string): string => {
  try {
    // Try to parse and format the time
    const parsedTime = parse(timeSlot, "h:mm a", new Date());
    return format(parsedTime, "h:mm a");
  } catch (error) {
    // If parsing fails, return the original string
    return timeSlot;
  }
};
