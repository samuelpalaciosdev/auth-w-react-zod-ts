import { LoginAPI } from '../components/LoginForm';
import { SignUpAPI } from '../components/SignUpForm';
import { LoginType, SignUpType } from '../types/auth';
import { toast } from 'react-toastify';
import { useMutation } from '@tanstack/react-query';
import { useAppStore } from '../store/store';

const baseUrl = 'https://ecommerce-api-ts-zod-express.cyclic.app/api';

const appStore = useAppStore.getState();
const { setUser, setIsLoggedIn, logoutUser } = appStore;

export const register = async (
  data: SignUpType,
  signUpFormRef: React.RefObject<SignUpAPI>,
  navigate: (path: string) => void
) => {
  // console.log('Handled submit yesss!!', data);
  const res = await fetch(`${baseUrl}/auth/register`, {
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
  const res = await fetch(`${baseUrl}/auth/login`, {
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
    onSuccess: async (data) => {
      // console.log(data.user);
      setIsLoggedIn(true);
      const currentUser = await getCurrentUser();
      // * If user found, then set the userState and go to dashboard
      if (currentUser) {
        setUser(data.user);
        navigate('/dashboard');
        toast('Login successful!', {
          type: 'success',
        });
      } else {
        setIsLoading(false);
      }
    },
    onError: (error) => {
      setIsLoading(false);
    },
  });

export const getCurrentUser = async () => {
  const res = await fetch(`${baseUrl}/users/me`, {
    method: 'GET',
    credentials: 'include',
  });

  const data = await res.json();

  if (data.status !== 'success') {
    console.log('Error getting current user', data.msg);
    return;
  } else {
    console.log('Current user is: ', data.user);
    // console.log('Response status', res.status);
    return data;
  }
};

export const generateNewRefreshToken = async () => {
  const res = await fetch(`${baseUrl}/auth/refresh`, {
    method: 'POST',
    credentials: 'include',
  });

  const data = await res.json();

  if (data.status !== 'success') {
    console.log('Error in generateRefreshToken', data.msg);
    return;
  } else {
    // console.log(data);
    return data;
  }
};

export const logout = async (navigate: (path: string) => void) => {
  // Delete refresh token from server
  const res = await fetch(`${baseUrl}/auth/logout`, {
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
