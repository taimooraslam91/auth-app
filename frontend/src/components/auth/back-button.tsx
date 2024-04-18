import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface BackButtonProps {
  href: string;
  label: string;
}

export const BackButton = ({ href, label }: BackButtonProps) => {
  return (
    <Button variant='link' className='font-normal w-full' size='sm' asChild>
      <Link to={href}>{label}</Link>
    </Button>
  );
};
