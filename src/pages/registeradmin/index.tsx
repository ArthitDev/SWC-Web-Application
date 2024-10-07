import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import React from 'react';
import { parseCookies } from 'utils/nookies';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookies = parseCookies(ctx);
  const { accessToken } = cookies;
  const { refreshToken } = cookies;

  if (accessToken || refreshToken) {
    return {
      redirect: {
        destination: '/admin',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

const DynamicRegisterForm = dynamic(
  () => import('components/register/RegisterForm')
);

const RegisterPage: React.FC = () => {
  return <DynamicRegisterForm />;
};

export default RegisterPage;
