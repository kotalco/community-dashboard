import { useEffect, useState } from 'react';

export const useNotification = (
  deployName:
    | 'node'
    | 'beaconnode'
    | 'validator'
    | 'peer'
    | 'clusterpeer'
    | 'chainlink'
    | 'polkadot'
) => {
  const [name, setName] = useState<string | null>(null);

  useEffect(() => {
    setName(localStorage.getItem(deployName));
    localStorage.removeItem(deployName);
  }, [deployName]);

  const onClose = () => {
    setName(null);
  };

  return { name, onClose };
};
