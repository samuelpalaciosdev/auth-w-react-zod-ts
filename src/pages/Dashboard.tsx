import { Button } from 'react-daisyui';
import { useNavigate } from 'react-router-dom';
import { logout } from '../services/auth';
import { useAppStore } from '../store/store';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout(navigate);
  };

  const user = useAppStore((state) => state.user);

  return (
    <>
      <h1 className='text-5xl font-bold'>
        Welcome to your dashboard{' '}
        <span className='text-teal-400 mt-2 block'>{`${user.name} :)`}</span>
      </h1>

      <div className='submit-btn mt-5'>
        <Button onClick={handleLogout} color='accent' style={{ textTransform: 'initial' }}>
          Logout
        </Button>
      </div>
    </>
  );
};
export default Dashboard;
