import React from 'react';
import AuthLayout from '../components/auth/AuthLayout';
import RegisterForm from '../components/auth/RegisterForm';

const Register = () => {
  return (
    <AuthLayout 
      title="Create an account" 
      subtitle="Get your personalized news recommendations today"
    >
      <RegisterForm />
    </AuthLayout>
  );
};

export default Register;
