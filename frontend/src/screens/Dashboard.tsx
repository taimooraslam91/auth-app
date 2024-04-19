import React, { useState } from 'react';
import Sidebar from '@/components/dashboard/sidebar';

function Dashboard({ children }: any) {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <div className='flex h-full flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800 p-5 '>
      <div className='lg:hidden flex items-center justify-between w-full bg-white rounded-xl p-7 mb-4'>
        <h5 className='block antialiased tracking-normal font-sans text-xl font-semibold leading-snug text-blue-800'>
          FlockAI
        </h5>
        <svg
          onClick={() => setShowMenu(!showMenu)}
          width='40px'
          height='40px'
          viewBox='0 0 24 24'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <g id='SVGRepo_bgCarrier' strokeWidth='0'></g>
          <g
            id='SVGRepo_tracerCarrier'
            strokeLinecap='round'
            strokeLinejoin='round'
          ></g>
          <g id='SVGRepo_iconCarrier'>
            <g id='Menu / Menu_Alt_01'>
              <path
                id='Vector'
                d='M12 17H19M5 12H19M5 7H19'
                stroke='#292929'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              ></path>
            </g>
          </g>
        </svg>
      </div>
      <div className='h-full flex w-full'>
        <Sidebar showMenu={showMenu} />
        <div className='h-full w-full bg-white rounded-xl p-7 overflow-auto'>
          {children}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
