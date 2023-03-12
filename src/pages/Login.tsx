import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import LoginForm, { LoginAPI } from '../components/LoginForm';
import { useLoginMutation } from '../services/auth';
import { PublicRoutes } from '../types';
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

      <p className='mt-4'>
        Don't have an account?{' '}
        <Link to={`/${PublicRoutes.REGISTER}`} className='font-semibold text-teal-400'>
          Register here
        </Link>
      </p>
    </>
  );
};
export default Login;
