import { useCallback } from 'react';
import { Button, Input } from 'react-daisyui';
import { useForm, Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import signUpSchema from '../types/auth';
import InputField from './InputField';

type FormValues = {
  name: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = useCallback((data: unknown) => {
    console.log(`Submitted!`, data);
  }, []);

  console.log(errors);
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

        <div className='submit-btn'>
          <Button type='submit'>Submit :)</Button>
        </div>
      </form>
    </>
  );
};
export default SignUpForm;
