import { useQuery } from 'react-query';
import { getAllDidyouknow } from 'services/didyouknowService';

const useRandomDidYouKnow = () => {
  return useQuery('didYouKnow', async () => {
    const data = await getAllDidyouknow();
    return data[Math.floor(Math.random() * data.length)];
  });
};

export default useRandomDidYouKnow;
