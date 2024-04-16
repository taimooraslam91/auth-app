import { Outlet } from 'react-router-dom';
import { useState } from 'react';

function App() {
  return (
    <main className='py-3'>
      <Outlet />
    </main>
  );
}

export default App;
