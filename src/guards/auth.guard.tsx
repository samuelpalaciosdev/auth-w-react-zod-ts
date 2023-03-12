import { Navigate, Outlet } from 'react-router-dom';
import { useAppStore } from '../store/store';
import { PublicRoutes } from '../types';
import { responseUser, responseUserSchema } from '../types';

const AuthGuard = () => {
  const user = useAppStore((state) => state.user);
  const isValidUser = responseUserSchema.safeParse(user);

  if (!isValidUser.success) {
    console.log('Invalid user', isValidUser.error);
  } else {
    console.log('Valid user', isValidUser.success);
  }

  return isValidUser.success ? <Outlet /> : <Navigate replace to={PublicRoutes.LOGIN} />;
};

export default AuthGuard;
