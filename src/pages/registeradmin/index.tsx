import dynamic from 'next/dynamic';
import React from 'react';

const DynamicRegisterForm = dynamic(
  () => import('components/register/RegisterForm')
);

const RegisterPage: React.FC = () => {
  return <DynamicRegisterForm />;
};

export default RegisterPage;
