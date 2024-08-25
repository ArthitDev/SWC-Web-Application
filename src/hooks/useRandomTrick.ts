import { useQuery } from 'react-query';
import { getAllTricks } from 'services/trickService';

const useRandomTrick = () => {
  return useQuery('trick', async () => {
    const data = await getAllTricks();
    return data[Math.floor(Math.random() * data.length)];
  });
};

export default useRandomTrick;
