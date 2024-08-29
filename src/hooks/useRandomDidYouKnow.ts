import { useQuery } from 'react-query';
import { getAllDidyouknow } from 'services/didyouknowService';

import useRefetchWebSocket from './useRefetchWebSocket';

const useRandomDidYouKnow = () => {
  useRefetchWebSocket('didYouKnow', 'UPDATE_DIDYOUKNOW');

  return useQuery(
    'didYouKnow',
    async () => {
      const data = await getAllDidyouknow();
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

export default useRandomDidYouKnow;
