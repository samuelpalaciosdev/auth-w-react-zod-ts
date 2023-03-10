import SignUpForm, { SignUpAPI } from '../components/SignUpForm';
import { useRef } from 'react';
import { SignUpType } from '../types/auth';

const SignUp = () => {
  const baseUrl = 'https://ecommerce-api-ts.cyclic.app/api';
  const authUrl = `${baseUrl}/auth`;

  const signUpFormRef = useRef<SignUpAPI>(null);

  const register = async (data: SignUpType) => {
    console.log('Handled submit yesss!!', data);
    const res = await fetch(`${authUrl}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: data.name,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
      }),
    });

    const resData = await res.json();

    if (resData.status !== 'success') {
      // console.log('Error in register', resData.msg);
      signUpFormRef.current?.setErrors(resData.msg);
      return;
    }

    console.log(resData);
  };
  return (
    <>
      <SignUpForm ref={signUpFormRef} onSubmit={register} />
    </>
  );
};
export default SignUp;
