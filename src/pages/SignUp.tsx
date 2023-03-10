import SignUpForm, { SignUpAPI } from '../components/SignUpForm';
import { useRef } from 'react';
import { SignUpType } from '../types/auth';
import { useNavigate } from 'react-router-dom';
import { register } from '../services/auth';

const SignUp = () => {
  const navigate = useNavigate();
  const signUpFormRef = useRef<SignUpAPI>(null);

  const handleRegister = async (data: SignUpType) => {
    await register(data, signUpFormRef, navigate);
  };

  return (
    <>
      <h1 className='text-3xl font-bold'>Register :)</h1>
      <SignUpForm ref={signUpFormRef} onSubmit={handleRegister} />
    </>
  );
};
export default SignUp;
