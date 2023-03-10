import SignUpForm from '../components/SignUpForm';
import { register } from '../services/auth';
import { SignUpType } from '../types/auth';

const SignUp = () => {
  return (
    <>
      <SignUpForm onSubmit={register} />
    </>
  );
};
export default SignUp;
