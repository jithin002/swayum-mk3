
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useOrderNotifications } from '@/hooks/useOrderNotifications';

interface NotificationContextType {
  notificationsEnabled: boolean;
  toggleNotifications: () => void;
  soundEnabled: boolean;
  toggleSound: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(false);

  // Load preferences from localStorage
  useEffect(() => {
    const savedNotifications = localStorage.getItem('notifications-enabled');
    const savedSound = localStorage.getItem('sound-enabled');
    
    if (savedNotifications !== null) {
      setNotificationsEnabled(JSON.parse(savedNotifications));
    }
    if (savedSound !== null) {
      setSoundEnabled(JSON.parse(savedSound));
    }
  }, []);

  // Save preferences to localStorage
  useEffect(() => {
    localStorage.setItem('notifications-enabled', JSON.stringify(notificationsEnabled));
  }, [notificationsEnabled]);

  useEffect(() => {
    localStorage.setItem('sound-enabled', JSON.stringify(soundEnabled));
  }, [soundEnabled]);

  // Initialize order notifications hook
  useOrderNotifications();

  const toggleNotifications = () => {
    setNotificationsEnabled(!notificationsEnabled);
  };

  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
  };

  return (
    <NotificationContext.Provider
      value={{
        notificationsEnabled,
        toggleNotifications,
        soundEnabled,
        toggleSound,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};
