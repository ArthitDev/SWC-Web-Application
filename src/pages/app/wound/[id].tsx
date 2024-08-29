import WoundDetail from 'components/app/wound/WoundDetail';
import { useRouter } from 'next/router';
import React from 'react';

const WoundDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;

  if (!id) return null;

  return <WoundDetail id={id as string} />;
};

export default WoundDetailPage;
