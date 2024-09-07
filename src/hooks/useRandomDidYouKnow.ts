import { useQuery } from 'react-query';
import { getAllDidyouknow } from 'services/didyouknowService';

import useRefetchWebSocket from './useRefetchWebSocket';

const useRandomDidYouKnow = () => {
  useRefetchWebSocket('didYouKnow', 'UPDATE_DIDYOUKNOW');

  return useQuery(
    'didYouKnow',
    async () => {
      const didyouknows = await getAllDidyouknow(); // เรียกข้อมูลโดยใช้ pagination
      if (didyouknows.length === 0) {
        throw new Error('No DidYouKnow available');
      }
      return didyouknows[Math.floor(Math.random() * didyouknows.length)]; // สุ่มเลือก DidYouKnow หนึ่งตัว
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

export default useRandomDidYouKnow;
