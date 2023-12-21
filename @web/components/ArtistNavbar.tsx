import { Link, Navigator } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';

import { cn } from '../utils';

export function Navbar({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const { state } = Navigator.useContext();
  const selected = state.routes[state.index].name;
  return (
    <nav
      className={cn(
        'flex items-center space-x-4 lg:space-x-6 w-full justify-between',
        className,
      )}
      {...props}
    >
      <div className='flex items-center space-x-4 lg:space-x-6'>
        <Link
          href="/artist/bookings"
          className={cn(
            'text-sm transition-colors hover:text-primary',
            selected !== 'index' && 'text-muted-foreground',
          )}
        >
          Bookings
        </Link>
        <Link
          href="/artist/payments"
          className={cn(
            'text-sm transition-colors hover:text-primary',
            selected !== 'customers' && 'text-muted-foreground',
          )}
        >
          Payments
        </Link>
        <Link
          href="/artist/profile"
          className={cn(
            'text-sm transition-colors hover:text-primary',
            selected !== 'products' && 'text-muted-foreground',
          )}
        >
          Profile
        </Link>
      </div>
      <div className="justify-self-end cursor-pointer">
        <AntDesign name="logout" size={18} color="#68748B" />
      </div>
    </nav>
  );
}
