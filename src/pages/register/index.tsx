import AuthLayout from 'components/layout/AuthLayout';
import dynamic from 'next/dynamic';
import React from 'react';

const DynamicRegisterForm = dynamic(
  () => import('../../components/register/RegisterForm')
);

const RegisterPage: React.FC = () => {
  return (
    <AuthLayout title="SWC Admin Register">
      <DynamicRegisterForm />
    </AuthLayout>
  );
};

export default RegisterPage;
