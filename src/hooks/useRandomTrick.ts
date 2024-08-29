import { useQuery } from 'react-query';
import { getAllTricks } from 'services/trickService';

import useRefetchWebSocket from './useRefetchWebSocket';

const useRandomTrick = () => {
  useRefetchWebSocket('trick', 'UPDATE_TRICK');

  return useQuery(
    'trick',
    async () => {
      const data = await getAllTricks();
      return data[Math.floor(Math.random() * data.length)];
    },
    {
      staleTime: 1000 * 60 * 5,
      cacheTime: 1000 * 60 * 10,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      refetchInterval: 1000 * 60 * 5,
    }
  );
};

export default useRandomTrick;
