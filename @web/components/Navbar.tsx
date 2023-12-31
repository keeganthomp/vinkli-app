import { Link, Navigator, LinkProps } from 'expo-router';
import LogoutButton from './LogoutButton';
import { useSession } from '@context/auth';
import { FETCH_CURRENT_USER } from '@graphql/queries/user';
import { useQuery } from '@apollo/client';
import { useMemo } from 'react';
import { GetUserQuery } from '@graphql/types';
import { cn } from '../utils';

type Link = {
  href: string;
  label: string;
};

type NavLinkProps = LinkProps<string> & {
  label: string;
  selected?: boolean;
};

const CUSTOMER_NAV_LINKS: Link[] = [
  {
    href: '/(app)/(tabs)/bookings',
    label: 'Bookings',
  },
];
const ARTIST_NAV_LINKS: Link[] = [
  {
    href: '/(app)/(tabs)/bookings',
    label: 'Bookings',
  },
  {
    href: '/(app)/(tabs)/payments',
    label: 'Payments',
  },
  {
    href: '/(app)/(tabs)/profile',
    label: 'Profile',
  },
];

const Navlink = ({ href, label, selected }: NavLinkProps) => {
  return (
    <Link
      href={href}
      className={cn(
        'text-sm transition-colors hover:text-primary',
        selected && 'text-muted-foreground',
      )}
    >
      {label}
    </Link>
  );
};

export function Navbar({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const { session } = useSession();
  const { data: userData, loading } = useQuery<GetUserQuery>(
    FETCH_CURRENT_USER,
    {
      skip: !session,
    },
  );
  const { state } = Navigator.useContext();
  const selected = state.routes[state.index].name;

  const links = useMemo(() => {
    const user = userData?.user;
    switch (user?.userType) {
      case 'CUSTOMER':
        return CUSTOMER_NAV_LINKS;
      case 'ARTIST':
        return ARTIST_NAV_LINKS;
      default:
        return [];
    }
  }, [session, userData]);

  return (
    <nav
      className={cn(
        'flex items-center justify-end px-4 space-x-4 lg:space-x-6 w-full pb-4',
        className,
      )}
      {...props}
    >
      <div className="flex items-center space-x-4 lg:space-x-6">
        {links.map((link) => (
          <Navlink
            key={link.href}
            href={link.href as any}
            label={link.label}
            selected={selected === link.href}
          />
        ))}
      </div>
      {session && (
        <div className="pl-4">
          <LogoutButton />
        </div>
      )}
    </nav>
  );
}
