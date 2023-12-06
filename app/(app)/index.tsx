import { useSession } from '@context/auth';
import { GET_USER } from '@graphql/queries/user';
import { useQuery } from '@apollo/client';
import { GetUserQuery } from '@graphql/types';
import { router } from 'expo-router';
import { useEffect } from 'react';
import ErrorCard from '@components/Error';

/**
 * This entry point is used to initialize the app
 * It checks the current user and redirects to the appropriate page
 * There should always be a session and a user in cache at this point
 * See (app)_layout.tsx which is called before this renders
 */

export default function AppInit() {
  const { session } = useSession();
  const { data: userData, error: errorFetchingUser } = useQuery<GetUserQuery>(
    GET_USER,
    {
      variables: {
        id: session?.user.id,
      },
      skip: !session,
    },
  );

  console.log('in aoo init', userData);

  useEffect(() => {
    const directUser = async () => {
      const currentUser = userData?.user;
      if (!currentUser) return;
      switch (currentUser.userType) {
        case 'ARTIST':
          router.replace('/artist/bookings');
          break;
        case 'CUSTOMER':
          router.replace('/customer/bookings');
          break;
        // should never happen at this point - but a sanity check
        default:
          console.log('Unknown user type at app entry');
          router.replace('/sign-in');
          break;
      }
    };
    directUser();
  }, [userData]);

  if (errorFetchingUser) {
    console.log('Error fetching user in (app)/index.tsx', errorFetchingUser);
    return <ErrorCard message="Error fetching user" />;
  }

  return null;
}
