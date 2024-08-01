import Layout from 'components/layout/AuthLayout';
import dynamic from 'next/dynamic';
import React from 'react';

const DynamicLoginForm = dynamic(
  () => import('../../components/login/LoginForm')
);

const LoginPage: React.FC = () => {
  return (
    <Layout title="SWC Admin Login">
      <DynamicLoginForm />
    </Layout>
  );
};

export default LoginPage;
