import { SignUpAPI } from '../components/SignUpForm';
import { SignUpType } from '../types/auth';

const baseUrl = 'https://ecommerce-api-ts.cyclic.app/api';
const authUrl = `${baseUrl}/auth`;

export const register = async (
  data: SignUpType,
  signUpFormRef: React.RefObject<SignUpAPI>,
  navigate: (path: string) => void
) => {
  // console.log('Handled submit yesss!!', data);
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
  } else {
    navigate('/login');
    await new Promise((resolve) => setTimeout(resolve, 500));
  }

  // console.log(resData);
};
