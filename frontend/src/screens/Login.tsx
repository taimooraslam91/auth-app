import LoginForm from '@/components/auth/login-form';

function Login() {
  return (
    <div className='flex h-full flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800'>
      <LoginForm />
    </div>
  );
}

export default Login;
