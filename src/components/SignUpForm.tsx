import { useCallback } from 'react';
import { Button, Input } from 'react-daisyui';
import { useForm, Resolver } from 'react-hook-form';
import InputField from './InputField';

type FormValues = {
  name: string;
  lastName: string;
  email: string;
  password: string;
};

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = useCallback((data: unknown) => {
    console.log(`Submitted!`, data);
  }, []);

  console.log(errors);
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* <div className='form-control w-full max-w-xs'>
          <label htmlFor='email' className='label'>
            <span className='label-text'>Email</span>
          </label>
          <Input
            type='text'
            id='email'
            size='md'
            color='ghost'
            placeholder='@'
            {...register('email', { required: 'Email is required' })}
          />
          {errors.email?.message && (
            <p className='text-red-500'>{errors.email?.message as string}</p>
          )}
        </div> */}

        <InputField
          id='email'
          type='text'
          label='Email'
          placeholder='Email'
          inputProps={register('email', { required: 'Email is required' })}
          error={errors.email?.message as string}
        />

        <div className='form-control w-full max-w-xs'>
          <label htmlFor='password' className='label'>
            <span className='label-text'>Password</span>
          </label>
          <Input
            type='password'
            id='password'
            size='md'
            color='ghost'
            placeholder='@'
            {...register('password', { required: 'Password is required' })}
          />
          {errors.password?.message && (
            <p className='text-red-500'>{errors.password?.message as string}</p>
          )}
        </div>
        <div className='form-control w-full max-w-xs'>
          <label htmlFor='confirmPassword' className='label'>
            <span className='label-text'>Confirm password</span>
          </label>
          <Input
            type='confirmPassword'
            id='password'
            size='md'
            color='ghost'
            placeholder='@'
            {...register('confirmPassword', { required: 'Confirm Password is required' })}
          />
          {errors.confirmPassword?.message && (
            <p className='text-red-500'>{errors.confirmPassword?.message as string}</p>
          )}
        </div>

        <div className='submit-btn'>
          <Button type='submit'>Submit :)</Button>
        </div>
      </form>
    </>
  );
};
export default SignUpForm;
