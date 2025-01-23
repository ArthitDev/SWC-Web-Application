import dynamic from 'next/dynamic';
import React from 'react';

const DynamicContactPanel = dynamic(
  () => import('components/admin/Contact/ContactPanel')
);

const SettingPage: React.FC = () => {
  return <DynamicContactPanel />;
};

export default SettingPage;
