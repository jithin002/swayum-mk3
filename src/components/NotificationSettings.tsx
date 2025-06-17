
import React from 'react';
import { useNotifications } from '@/context/NotificationContext';
import { Switch } from '@/components/ui/switch';
import { Bell, Volume2 } from 'lucide-react';

const NotificationSettings: React.FC = () => {
  const { notificationsEnabled, toggleNotifications, soundEnabled, toggleSound } = useNotifications();

  return (
    <div className="bg-white rounded-lg shadow-md p-5 mb-6">
      <h3 className="text-lg font-semibold mb-4 flex items-center">
        <Bell className="mr-2 h-5 w-5" />
        Notification Settings
      </h3>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Bell className="h-4 w-4 text-gray-500" />
            <div>
              <label className="text-sm font-medium">Order Notifications</label>
              <p className="text-xs text-gray-500">Get notified when your order status changes</p>
            </div>
          </div>
          <Switch
            checked={notificationsEnabled}
            onCheckedChange={toggleNotifications}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Volume2 className="h-4 w-4 text-gray-500" />
            <div>
              <label className="text-sm font-medium">Sound Alerts</label>
              <p className="text-xs text-gray-500">Play sound for important notifications</p>
            </div>
          </div>
          <Switch
            checked={soundEnabled}
            onCheckedChange={toggleSound}
            disabled={!notificationsEnabled}
          />
        </div>
      </div>
    </div>
  );
};

export default NotificationSettings;
