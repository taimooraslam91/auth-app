import { logout } from '@/slices/authSlice';
import { useLogoutMutation } from '@/slices/usersApiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';

function sidebar({ showMenu }: any) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall]: any = useLogoutMutation();
  const { userInfo } = useSelector((state: any) => state.auth);

  const isAdmin = userInfo?.isAdmin;

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate('/login');
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div
      className={cn(
        'lg:relative lg:flex absolute flex-col bg-clip-border rounded-xl bg-white text-gray-700 h-full w-full max-w-[20rem] p-4 shadow-xl shadow-blue-900/5 me-5 lg:left-auto left-0 top-0 z-10 transition-transform duration-300 ease-in-out lg:translate-x-0',
        showMenu ? 'translate-x-0' : '-translate-x-full'
      )}
    >
      <div className='mb-2 p-4'>
        <h5 className='block antialiased tracking-normal font-sans text-xl font-semibold leading-snug text-blue-800'>
          FlockAI
        </h5>
      </div>
      <nav className='flex flex-col gap-1 min-w-[240px] p-2 font-sans text-base font-normal'>
        <NavLink role='button' to='/dashboard' className='nav-item'>
          <div className='grid place-items-center mr-4'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              fill='currentColor'
              aria-hidden='true'
              className='h-5 w-5'
            >
              <path
                fillRule='evenodd'
                d='M2.25 2.25a.75.75 0 000 1.5H3v10.5a3 3 0 003 3h1.21l-1.172 3.513a.75.75 0 001.424.474l.329-.987h8.418l.33.987a.75.75 0 001.422-.474l-1.17-3.513H18a3 3 0 003-3V3.75h.75a.75.75 0 000-1.5H2.25zm6.04 16.5l.5-1.5h6.42l.5 1.5H8.29zm7.46-12a.75.75 0 00-1.5 0v6a.75.75 0 001.5 0v-6zm-3 2.25a.75.75 0 00-1.5 0v3.75a.75.75 0 001.5 0V9zm-3 2.25a.75.75 0 00-1.5 0v1.5a.75.75 0 001.5 0v-1.5z'
                clipRule='evenodd'
              ></path>
            </svg>
          </div>
          Dashboard
        </NavLink>
        <NavLink role='button' to='/product' className='nav-item'>
          <div className='grid place-items-center mr-4'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              fill='currentColor'
              aria-hidden='true'
              className='h-5 w-5'
            >
              <path
                fillRule='evenodd'
                d='M7.5 6v.75H5.513c-.96 0-1.764.724-1.865 1.679l-1.263 12A1.875 1.875 0 004.25 22.5h15.5a1.875 1.875 0 001.865-2.071l-1.263-12a1.875 1.875 0 00-1.865-1.679H16.5V6a4.5 4.5 0 10-9 0zM12 3a3 3 0 00-3 3v.75h6V6a3 3 0 00-3-3zm-3 8.25a3 3 0 106 0v-.75a.75.75 0 011.5 0v.75a4.5 4.5 0 11-9 0v-.75a.75.75 0 011.5 0v.75z'
                clipRule='evenodd'
              ></path>
            </svg>
          </div>
          Products
        </NavLink>
        {isAdmin && (
          <NavLink role='button' to='/users' className='nav-item'>
            <div className='grid place-items-center mr-4'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                fill='currentColor'
                aria-hidden='true'
                className='h-5 w-5'
              >
                <path
                  fillRule='evenodd'
                  d='M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z'
                  clipRule='evenodd'
                ></path>
              </svg>
            </div>
            Users
          </NavLink>
        )}
        <div role='button' className='nav-item' onClick={logoutHandler}>
          <div className='grid place-items-center mr-4'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              fill='currentColor'
              aria-hidden='true'
              className='h-5 w-5'
            >
              <path
                fillRule='evenodd'
                d='M12 2.25a.75.75 0 01.75.75v9a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM6.166 5.106a.75.75 0 010 1.06 8.25 8.25 0 1011.668 0 .75.75 0 111.06-1.06c3.808 3.807 3.808 9.98 0 13.788-3.807 3.808-9.98 3.808-13.788 0-3.808-3.807-3.808-9.98 0-13.788a.75.75 0 011.06 0z'
                clipRule='evenodd'
              ></path>
            </svg>
          </div>
          Log Out
        </div>
      </nav>
    </div>
  );
}

export default sidebar;
