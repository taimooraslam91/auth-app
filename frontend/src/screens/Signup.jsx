import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

function Login() {
  return (
    <Card>
      <CardHeader className='space-y-1 text-left'>
        <CardTitle className='text-2xl'>Create an account</CardTitle>
        <CardDescription>
          Enter your email below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent className='grid gap-4'>
        <div className='grid gap-2'>
          <Label htmlFor='name'>Name</Label>
          <Input id='name' type='text' placeholder='Jone Doe' />
        </div>
        <div className='grid gap-2'>
          <Label htmlFor='email'>Email</Label>
          <Input id='email' type='email' placeholder='m@example.com' />
        </div>
        <div className='grid gap-2'>
          <Label htmlFor='password'>Password</Label>
          <Input id='password' type='password' />
        </div>
      </CardContent>
      <CardFooter>
        <Button className='w-full'>Create account</Button>
      </CardFooter>
    </Card>
  );
}

export default Login;
