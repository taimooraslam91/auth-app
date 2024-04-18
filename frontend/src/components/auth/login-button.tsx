import { useNavigate } from 'react-router-dom';

interface LoginButtonProps {
  children: React.ReactNode;
  mode?: 'modal' | 'redirect';
  asChild?: boolean;
}

function LoginButton({
  children,
  mode = 'redirect',
  asChild,
}: LoginButtonProps) {
  const navigate = useNavigate();

  const onClick = () => {
    navigate('/login');
  };
  return (
    <span onClick={onClick} className='cursor-pointer'>
      {children}
    </span>
  );
}

export default LoginButton;
