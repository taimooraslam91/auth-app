import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

function Home() {
  const navigate = useNavigate();
  return (
    <div className='flex h-full flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800'>
      <h1 className='text-3xl font-semibold text-sky-100 mb-4'>Home</h1>
      <Button onClick={() => navigate('login')}>Sign in</Button>
    </div>
  );
}

export default Home;
