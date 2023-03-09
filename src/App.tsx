import { useState } from 'react';
import SignUpForm from './components/SignUpForm';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className='App'>
      <h1 className='text-3xl font-bold underline'>Hello world!</h1>
      <SignUpForm />
    </div>
  );
}

export default App;
