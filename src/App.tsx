import { useState } from 'react';
import './App.css';
import SignUp from './pages/SignUp';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className='App'>
      <h1 className='text-3xl font-bold underline'>Hello world!</h1>
      <SignUp />
    </div>
  );
}

export default App;
