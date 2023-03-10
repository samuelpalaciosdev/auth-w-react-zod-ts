import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm, { LoginAPI } from '../components/LoginForm';
import { login } from '../services/auth';
import { LoginType } from '../types/auth';

const Login = () => {
  const navigate = useNavigate();
  const loginFormRef = useRef<LoginAPI>(null);

  const handleLogin = async (data: LoginType) => {
    await login(data, loginFormRef, navigate);
  };

  return (
    <>
      <h1 className='text-3xl font-bold'>Login :D</h1>
      <LoginForm ref={loginFormRef} onSubmit={handleLogin} />
    </>
  );
};
export default Login;
