import { Button } from 'react-daisyui';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginType, loginSchema } from '../types/auth';
import InputField from './InputField';
import { forwardRef, useImperativeHandle, useRef } from 'react';

interface LoginFormProps {
  onSubmit: (data: LoginType) => Promise<void>;
  isLoading: boolean;
}

export interface LoginAPI {
  setErrors: (msg: Record<string, string>) => void;
}

const LoginForm = forwardRef<LoginAPI, LoginFormProps>(({ onSubmit, isLoading }, ref) => {
  const {
    register,
    handleSubmit,
    setError,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<LoginType>({
    resolver: zodResolver(loginSchema),
  });
  const setErrorRef = useRef(setError);
  setErrorRef.current = setError;

  // const onSubmitForm = (data: LoginType) => {
  //   console.log(data);
  // };

  useImperativeHandle(
    ref,
    () => {
      return {
        setErrors: (msg: Record<string, string>) => {
          const message = msg.toString();
          if (message === 'Invalid credentials') {
            const newObj = { email: '', password: '' };
            // setErrorRef.current()
            Object.entries(newObj).forEach(([key, value]) => {
              setErrorRef.current(key as 'email' | 'password', {
                message: message,
              });
            });
          }
        },
      };
    },
    []
  );

  console.log(errors);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputField
          id='email'
          label='Email'
          placeholder='@'
          inputProps={register('email')}
          error={errors.email?.message as string}
        />
        <InputField
          id='password'
          type='password'
          label='Password'
          placeholder='Password'
          inputProps={register('password')}
          error={errors.password?.message as string}
        />
        <div className='submit-btn mt-4'>
          <Button
            type='submit'
            color='accent'
            style={{ textTransform: 'initial' }}
            disabled={isLoading}
          >
            {isLoading ? 'Hold up' : 'Sign in'}
          </Button>
        </div>
      </form>
    </>
  );
});
export default LoginForm;
