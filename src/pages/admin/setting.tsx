import dynamic from 'next/dynamic';
import React from 'react';

const DynamicSettingPanel = dynamic(
  () => import('components/admin/Setting/SettingPanel')
);

const SettingPage: React.FC = () => {
  return <DynamicSettingPanel />;
};

export default SettingPage;
