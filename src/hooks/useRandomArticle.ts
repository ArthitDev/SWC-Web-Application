import { useQuery } from 'react-query';

import { getOnlyArticles } from '@/services/articleService';

const getRandomWounds = (articles: any[], count: number) => {
  const shuffled = [...articles].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

const useRandomWound = () => {
  const { data, error, isLoading } = useQuery(
    ['onlyarticles'],
    getOnlyArticles,
    {
      staleTime: 1000 * 60 * 5, // ข้อมูลยังถือว่าสดใหม่อยู่เป็นเวลา 5 นาที
      cacheTime: 1000 * 60 * 10, // เก็บข้อมูลไว้ใน cache เป็นเวลา 10 นาที
      refetchOnWindowFocus: false, // ปิดการ refetch เมื่อ focus ที่หน้าต่าง
    }
  );

  const randomArticles = data ? getRandomWounds(data.data, 7) : [];

  return { randomArticles, isLoading, error };
};

export default useRandomWound;
