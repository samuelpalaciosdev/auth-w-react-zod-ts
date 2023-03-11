import { useMutation } from '@tanstack/react-query';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm, { LoginAPI } from '../components/LoginForm';
import { login, useLoginMutation } from '../services/auth';
import { LoginType } from '../types/auth';

const Login = () => {
  const navigate = useNavigate();
  const loginFormRef = useRef<LoginAPI>(null);
  const [isLoading, setIsLoading] = useState(false);

  const loginMutation = useLoginMutation(loginFormRef, navigate, setIsLoading);

  const handleLogin = async (data: LoginType) => {
    setIsLoading(true);
    await loginMutation.mutateAsync(data);
  };

  return (
    <>
      <h1 className='text-3xl font-bold'>Welcome Back</h1>
      <h1 className='text-2xl mt-2 mb-2'>
        We're <span className='text-teal-400'>happy</span> to see you here :)
      </h1>
      <LoginForm ref={loginFormRef} onSubmit={handleLogin} isLoading={isLoading} />
    </>
  );
};
export default Login;
