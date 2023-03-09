import { useCallback } from 'react';
import { Button, Input } from 'react-daisyui';
import { useForm, Resolver } from 'react-hook-form';

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
        <div className='form-control w-full max-w-xs'>
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
        </div>
        {errors.email?.message && <p className='text-red-500'>{errors.email?.message as string}</p>}

        <div className='submit-btn'>
          <Button type='submit'>Submit :)</Button>
        </div>
      </form>
    </>
  );
};
export default SignUpForm;
