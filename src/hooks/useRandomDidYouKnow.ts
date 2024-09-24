import { useQuery } from 'react-query';
import { getAllDidyouknow } from 'services/didyouknowService';

import useRefetchWebSocket from './useRefetchWebSocket';

const useRandomDidYouKnow = () => {
  useRefetchWebSocket('didYouKnow', 'UPDATE_DIDYOUKNOW');

  return useQuery(
    'didYouKnow',
    async () => {
      const AllDidyouknows = await getAllDidyouknow(); // เรียกข้อมูลโดยใช้ pagination
      if (AllDidyouknows.length === 0) {
        throw new Error('No DidYouKnow available');
      }
      const selectedDidYouKnows: any[] | PromiseLike<any[]> = [];
      while (
        selectedDidYouKnows.length < 5 &&
        selectedDidYouKnows.length < AllDidyouknows.length
      ) {
        const randomDidyouknow =
          AllDidyouknows[Math.floor(Math.random() * AllDidyouknows.length)];
        if (
          !selectedDidYouKnows.some(
            (didyouknow) => didyouknow.id === randomDidyouknow.id
          )
        ) {
          selectedDidYouKnows.push(randomDidyouknow);
        }
      }
      return selectedDidYouKnows;
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
