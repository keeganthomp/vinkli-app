import { AntDesign } from '@expo/vector-icons';
import { Button } from './ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@web/components/ui/dialog';
import { supabase } from '@lib/supabase';
import { useSession } from '@context/auth';
import apolloClient from '@lib/apolloClient';
import { router } from 'expo-router';

function LogoutButton() {
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
          <Button className='curor-pointer' variant="secondary">Cancel</Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}

export default LogoutButton;
