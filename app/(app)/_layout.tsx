import { useSession } from '@context/auth';
import { GET_USER } from '@graphql/queries/user';
import { useLazyQuery } from '@apollo/client';
import { GetUserQuery } from '@graphql/types';
import { router, Slot } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import ErrorCard from '@components/ErrorCard';

/**
 * We can defer the initialization of the app until we have the user
 * because this is not the root layout
 */

export default function AppLayout() {
  const [isAppReady, setIsAppReady] = useState(false);
  const { session, isLoading: isCheckingSession } = useSession();
  const [fetchUser, { error: errorFetchingUser }] = useLazyQuery<GetUserQuery>(
    GET_USER,
    {
      variables: {
        id: session?.user.id,
      },
    },
  );

  useEffect(() => {
    // want to wait for session to be checked before fetching user
    if (isCheckingSession) return;
    // if no session redirect to sign in
    if (!session) {
      router.replace('/sign-in');
      setIsAppReady(true);
      return;
    }
    // initialize user once we have the session
    fetchUser({
      variables: {
        id: session.user.id,
      },
    }).finally(() => {
      setIsAppReady(true);
    });
  }, [session, isCheckingSession]);

  useEffect(() => {
    if (!isAppReady) return;
    // launch app
    SplashScreen.hideAsync();
  }, [isAppReady]);

  if (errorFetchingUser) {
    return <ErrorCard message="Error fetching user" />;
  }

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <Slot />
    </View>
  );
}
