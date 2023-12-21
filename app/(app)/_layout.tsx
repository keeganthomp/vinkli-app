import '@components/sheets';

import { useSession } from '@context/auth';
import { GET_USER } from '@graphql/queries/user';
import { useLazyQuery } from '@apollo/client';
import { GetUserQuery } from '@graphql/types';
import { router, Slot, Stack, usePathname } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, Platform } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import ErrorCard from '@components/Error';
import { Navbar } from '@web/components/ArtistNavbar';

const isWeb = Platform.OS === 'web';

/**
 * We can defer the initialization of the app until we have the user
 * because this is not the root layout
 */

export default function IosAppLayout() {
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
      router.push('/sign-in');
      SplashScreen.hideAsync();
      return;
    }
    // initialize user once we have the session
    fetchUser({
      variables: {
        id: session.user.id,
      },
    })
      .catch((err) => console.log('oops', err))
      .finally(() => {
        SplashScreen.hideAsync();
      });
  }, [session, isCheckingSession]);

  if (errorFetchingUser) {
    return <ErrorCard message="Error fetching user" />;
  }

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      {isWeb && <Navbar />}
      <Slot/>
    </View>
  );
}
