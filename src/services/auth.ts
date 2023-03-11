import { LoginAPI } from '../components/LoginForm';
import { SignUpAPI } from '../components/SignUpForm';
import { LoginType, SignUpType } from '../types/auth';
import { toast } from 'react-toastify';

export const register = async (
  data: SignUpType,
  signUpFormRef: React.RefObject<SignUpAPI>,
  navigate: (path: string) => void
) => {
  // console.log('Handled submit yesss!!', data);
  const res = await fetch(`api/auth/register`, {
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
    toast('Registration successful!', {
      type: 'success',
    });
    navigate('/login');
    await new Promise((resolve) => setTimeout(resolve, 500));
  }

  console.log(resData);
};

export const login = async (
  data: LoginType,
  signUpFormRef: React.RefObject<LoginAPI>,
  navigate: (path: string) => void
) => {
  // console.log('Handled submit yesss!!', data);
  const res = await fetch(`api/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: data.email,
      password: data.password,
    }),
  });

  const resData = await res.json();

  if (resData.status !== 'success') {
    // console.log('Error in login', resData.msg);
    signUpFormRef.current?.setErrors(resData.msg);
    return;
  } else {
    toast('Login successful!', {
      type: 'success',
    });
    navigate('/dashboard');
    await new Promise((resolve) => setTimeout(resolve, 500));
    console.log(resData);
    return resData;
  }

  // console.log(resData);
};

// export const loginData = () => {
//   return useMutation()
// }

export const logout = async (navigate: (path: string) => void) => {
  const res = await fetch(`api/auth/logout`, {
    method: 'GET',
  });

  if (res.status === 200) {
    toast('Logged out successfuly!', {
      type: 'success',
    });
    navigate('/login');
    await new Promise((resolve) => setTimeout(resolve, 500));
  } else {
    console.log('Error', res.statusText);
  }
};
