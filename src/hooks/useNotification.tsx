import { useEffect, useState } from 'react';

import NotificationPanel from '@components/organisms/NotificationPanel/NotificationPanel';
import { Deployments } from '@enums/Deployments';

export const useNotification = (deployName: Deployments) => {
  const [name, setName] = useState<string | null>(null);

  useEffect(() => {
    setName(localStorage.getItem(deployName));
    localStorage.removeItem(deployName);
  }, [deployName]);

  const onClose = () => {
    setName(null);
  };

  const Notification = (
    <NotificationPanel
      show={!!name}
      title="Node has been created"
      close={onClose}
    >
      <p className="mt-1 text-sm text-gray-500">
        <span className="p-1 m-1 ml-0 text-indigo-900 bg-indigo-100 rounded-md">
          {name}
        </span>
        {deployName} has been created successfully, and will be up and running
        in few seconds.
      </p>
    </NotificationPanel>
  );

  return { name, onClose, NotificationPanel: Notification };
};
