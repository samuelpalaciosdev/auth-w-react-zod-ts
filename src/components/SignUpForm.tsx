import { Button } from 'react-daisyui';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SignUpType, signUpSchema } from '../types/auth';
import InputField from './InputField';
import { forwardRef, useImperativeHandle, useRef } from 'react';

interface SignUpFormProps {
  onSubmit: (data: SignUpType) => Promise<void>;
}

export interface SignUpAPI {
  setErrors: (msg: Record<string, string>) => void;
}

const SignUpForm = forwardRef<SignUpAPI, SignUpFormProps>(({ onSubmit }, ref) => {
  const {
    register,
    handleSubmit,
    setError,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<SignUpType>({
    resolver: zodResolver(signUpSchema),
  });
  const setErrorRef = useRef(setError);
  setErrorRef.current = setError;
  useImperativeHandle(
    ref,
    () => {
      return {
        // setErrors: (msg: Record<string, string>) => {
        //   console.log('setErrors', msg);
        // },
        setErrors: (msg: Record<string, string>) => {
          const message = msg.toString();
          const key = message.split(' ')[0].toLowerCase();
          // console.log(message, key);
          setErrorRef.current(
            key as 'name' | 'lastName' | 'email' | 'password' | 'confirmPassword' | 'role',
            {
              message: message,
            }
          );
        },
      };
    },
    []
  );

  // console.log(errors);
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputField
          id='name'
          label='First name'
          placeholder='John'
          inputProps={register('name')}
          error={errors.name?.message as string}
        />
        <InputField
          id='lastName'
          label='Last name'
          placeholder='Doe'
          inputProps={register('lastName')}
          error={errors.lastName?.message as string}
        />
        <InputField
          id='email'
          type='text'
          label='Email'
          placeholder='Email'
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
        <InputField
          id='confirmPassword'
          type='password'
          label='Confirm password'
          placeholder='Password'
          inputProps={register('confirmPassword')}
          error={errors.confirmPassword?.message as string}
        />

        <div className='submit-btn mt-4'>
          <Button type='submit' color='primary'>
            {isSubmitting ? 'Hold up' : ' Submit :)'}
          </Button>
        </div>
      </form>
    </>
  );
});
export default SignUpForm;
