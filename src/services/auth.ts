import { LoginAPI } from '../components/LoginForm';
import { SignUpAPI } from '../components/SignUpForm';
import { LoginType, SignUpType } from '../types/auth';
import { toast } from 'react-toastify';
import { useMutation } from '@tanstack/react-query';
import { useAppStore } from '../store/store';

const baseUrl = 'https://ecommerce-api-ts.cyclic.app/api';

const appStore = useAppStore.getState();
const { setUser, setIsLoggedIn, logoutUser } = appStore;

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

  // console.log(resData);
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
    credentials: 'include',
  });

  const resData = await res.json();

  if (resData.status !== 'success') {
    // console.log('Error in login', resData.msg);
    signUpFormRef.current?.setErrors(resData.msg);
    return;
  } else {
    await new Promise((resolve) => setTimeout(resolve, 500));
    // console.log(resData);
    return resData;
  }

  // console.log(resData);
};

export const useLoginMutation = (
  signUpFormRef: React.RefObject<LoginAPI>,
  navigate: (path: string) => void,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) =>
  useMutation(async (data: LoginType) => login(data, signUpFormRef, navigate), {
    onSuccess: (data) => {
      // console.log(data.user);
      setUser(data.user);
      setIsLoggedIn(true);
      navigate('/dashboard');

      setIsLoading(false);
      toast('Login successful!', {
        type: 'success',
      });
    },
    onError: (error) => {
      // console.log(error);
      setIsLoading(false);
    },
  });

export const logout = async (navigate: (path: string) => void) => {
  // Delete refresh token from server
  const res = await fetch(`api/auth/logout`, {
    method: 'DELETE',
    credentials: 'include',
  });

  if (res.status === 200) {
    // Clear cookies and local storage
    localStorage.removeItem('user');
    // Update state and navigate to login page
    setIsLoggedIn(false);
    navigate('/login');
    toast('Logged out successfully!', {
      type: 'success',
    });
  } else {
    console.log('Error', res.statusText);
  }
};
