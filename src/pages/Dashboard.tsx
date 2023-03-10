import { Button } from 'react-daisyui';
import { useNavigate } from 'react-router-dom';
import { logout } from '../services/auth';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout(navigate);
  };

  return (
    <>
      <h1 className='text-3xl font-bold underline'>Dashboard :)</h1>
      <div className='submit-btn mt-4'>
        <Button onClick={handleLogout} color='primary'>
          Logout
        </Button>
      </div>
    </>
  );
};
export default Dashboard;
