import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import { PrivateRoutes, PublicRoutes } from './types';
import { AuthGuard } from './guards';
import { RoutesWithNotFound } from './utilities';
import { Suspense, lazy } from 'react';

const SignUp = lazy(() => import('./pages/SignUp'));
const Dashboard = lazy(() => import('./pages/Dashboard'));

function App() {
  return (
    <div className='App'>
      <Suspense fallback={<h1 className='text-2xl'>Loading...</h1>}>
        <BrowserRouter>
          <RoutesWithNotFound>
            <Route path={PublicRoutes.REGISTER} element={<SignUp />} />
            <Route path='/' element={<Navigate to={PrivateRoutes.DASHBOARD} />} />
            <Route path='*' element={<NotFound />} />
            <Route path={PublicRoutes.LOGIN} element={<Login />} />
            <Route element={<AuthGuard />}>
              <Route path={PrivateRoutes.DASHBOARD} element={<Dashboard />} />
            </Route>
          </RoutesWithNotFound>
        </BrowserRouter>
      </Suspense>
    </div>
  );
}

export default App;
