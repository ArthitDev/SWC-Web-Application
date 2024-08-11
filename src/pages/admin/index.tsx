import dynamic from 'next/dynamic';
import React from 'react';

const DynamicDashboardPanel = dynamic(
  () => import('components/admin/DashboardPanel')
);

const DashboardPage: React.FC = () => {
  return <DynamicDashboardPanel />;
};

export default DashboardPage;
