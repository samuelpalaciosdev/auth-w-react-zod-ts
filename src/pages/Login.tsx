import { useMutation } from '@tanstack/react-query';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm, { LoginAPI } from '../components/LoginForm';
import { login } from '../services/auth';
import { LoginType } from '../types/auth';

const Login = () => {
  const navigate = useNavigate();
  const loginFormRef = useRef<LoginAPI>(null);

  const loginMutation = useMutation((data: LoginType) => login(data, loginFormRef, navigate), {
    onSuccess: (data) => {
      const loggedInUser = data.user;
      console.log(loggedInUser);
    },
  });

  const handleLogin = async (data: LoginType) => {
    await loginMutation.mutateAsync(data);
  };

  return (
    <>
      <h1 className='text-3xl font-bold'>Welcome Back</h1>
      <h1 className='text-2xl mt-2 mb-2'>
        We're <span className='text-teal-400'>happy</span> to see you here :)
      </h1>
      <LoginForm ref={loginFormRef} onSubmit={handleLogin} />
    </>
  );
};
export default Login;
