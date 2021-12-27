import { useEffect, useState } from 'react';

import NotificationPanel from '@components/organisms/NotificationPanel/NotificationPanel';
import { Deployments } from '@enums/Deployments';
import { NotificationInfo } from '@interfaces/NotificationInfo';

export const useNotification = (type: Deployments) => {
  const [notification, setNotification] = useState<NotificationInfo>();

  useEffect(() => {
    const notification = localStorage.getItem(type);
    if (notification) {
      const notificationData = JSON.parse(notification) as NotificationInfo;
      setNotification(notificationData);
    }
    localStorage.removeItem(type);
  }, [type]);

  const onClose = () => {
    setNotification(undefined);
  };

  const Notification = (
    <NotificationPanel
      show={!!notification}
      title={notification?.title}
      close={onClose}
    >
      <p className="mt-1 text-sm text-gray-500">
        <span className="p-1 m-1 ml-0 text-indigo-900 bg-indigo-100 rounded-md">
          {notification?.deploymentName}
        </span>
        {notification?.message}
      </p>
    </NotificationPanel>
  );

  return { NotificationPanel: Notification };
};
