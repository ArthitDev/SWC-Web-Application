import { useQuery } from 'react-query';
import { getAllTricks } from 'services/trickService';

import useRefetchWebSocket from './useRefetchWebSocket';

const useRandomTricks = () => {
  useRefetchWebSocket('trick', 'UPDATE_TRICK');

  return useQuery(
    'trick',
    async () => {
      const allTricks = await getAllTricks();
      if (allTricks.length === 0) {
        throw new Error('No tricks available');
      }
      const selectedTricks: any[] | PromiseLike<any[]> = [];
      while (
        selectedTricks.length < 5 &&
        selectedTricks.length < allTricks.length
      ) {
        const randomTrick =
          allTricks[Math.floor(Math.random() * allTricks.length)];
        if (!selectedTricks.some((trick) => trick.id === randomTrick.id)) {
          selectedTricks.push(randomTrick);
        }
      }
      return selectedTricks;
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

export default useRandomTricks;
