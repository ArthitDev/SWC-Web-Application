import { useQuery } from 'react-query';
import { getAllTricks } from 'services/trickService';

import useRefetchWebSocket from './useRefetchWebSocket';

const useRandomTrick = () => {
  useRefetchWebSocket('trick', 'UPDATE_TRICK');

  return useQuery(
    'trick',
    async () => {
      const tricks = await getAllTricks();
      if (tricks.length === 0) {
        throw new Error('No tricks available');
      }
      return tricks[Math.floor(Math.random() * tricks.length)];
    },
    {
      staleTime: 1000 * 60 * 5, // 5 นาที
      cacheTime: 1000 * 60 * 10, // 10 นาที
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      refetchInterval: 1000 * 60 * 5, // 5 นาที
    }
  );
};

export default useRandomTrick;
