import { Link, Navigator } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';
import { Button } from './ui/button';

import { cn } from '../utils';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@web/components/ui/dialog';
import { Text, View } from 'react-native';
import { supabase } from '@lib/supabase';
import { useSession } from '@context/auth';
import apolloClient from '@lib/apolloClient';
import { router } from 'expo-router';
import { useRef } from 'react';

export function LogoutButton() {
  const { setSession } = useSession();

  const logout = () => {
    supabase.auth.signOut();
    setSession(null);
    apolloClient.clearStore();
    router.replace('/sign-in');
  };

  return (
    <Dialog>
      <DialogTrigger>
        <AntDesign name="logout" size={18} color="#68748B" />
      </DialogTrigger>
      {/* Logout modal */}
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Log out</DialogTitle>
          <DialogDescription>
            Are you sure you want to log out?
          </DialogDescription>
        </DialogHeader>
        <DialogClose asChild>
          <Button onClick={logout} variant="destructive">
            Log out
          </Button>
        </DialogClose>
        <DialogClose asChild>
          <Button variant="secondary">Cancel</Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}

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
      <div className="flex items-center space-x-4 lg:space-x-6">
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
        <LogoutButton />
      </div>
    </nav>
  );
}
