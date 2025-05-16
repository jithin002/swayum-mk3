
import { TimeSlot } from "@/types";
import { format, addMinutes, parse, isAfter } from "date-fns";
import { v4 as uuidv4 } from "uuid";

// Function to generate time slots for pickup
export const generateTimeSlots = (startTime: string = "11:00", endTime: string = "20:00", intervalMinutes: number = 30): TimeSlot[] => {
  const timeSlots: TimeSlot[] = [];
  const now = new Date();
  
  // Parse the start and end times
  const startDate = parse(startTime, "HH:mm", new Date());
  const endDate = parse(endTime, "HH:mm", new Date());
  
  let currentTime = startDate;
  
  while (currentTime <= endDate) {
    const timeString = format(currentTime, "HH:mm");
    const slotDate = parse(timeString, "HH:mm", now);
    
    // Set availability based on whether the slot is in the future
    const isAvailable = isAfter(slotDate, now);
    
    timeSlots.push({
      id: uuidv4(),
      time: timeString,
      available: isAvailable
    });
    
    currentTime = addMinutes(currentTime, intervalMinutes);
  }
  
  return timeSlots;
};

// Function to format a time slot for display
export const formatTimeSlot = (timeString: string): string => {
  try {
    // If the timeString is in 24-hour format (e.g., "14:30"), convert it to 12-hour format
    const [hours, minutes] = timeString.split(':').map(Number);
    
    if (isNaN(hours) || isNaN(minutes)) {
      return timeString; // Return original if parsing fails
    }
    
    const period = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12; // Convert 0 to 12 for 12 AM
    
    return `${formattedHours}:${minutes.toString().padStart(2, '0')} ${period}`;
  } catch (error) {
    console.error("Error formatting time slot:", error);
    return timeString; // Return original if any error occurs
  }
};
