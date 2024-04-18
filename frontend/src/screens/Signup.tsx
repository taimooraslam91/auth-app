import RegisterForm from '@/components/auth/register-form';

function Register() {
  return (
    <div className='flex h-full flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800'>
      <RegisterForm />
    </div>
  );
}

export default Register;
