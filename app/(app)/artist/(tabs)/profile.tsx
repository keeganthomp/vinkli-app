import { View, Button, ActivityIndicator, Pressable } from 'react-native';
import ArtistHeader from '@components/artist/ArtistHeader';
import { useSession } from '@context/auth';
import { router } from 'expo-router';
import { supabase } from '@lib/supabase';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import apolloClient from '@lib/apolloClient';
import { useMutation } from '@apollo/client';
import { GEN_STRIPE_CONNECT_ONBOARDING_LINK } from '@graphql/mutations/user';
import {
  GenerateStripeConnectOnboardingLinkMutation,
  ArtistQuery,
} from '@graphql/types';
import { useEffect } from 'react';
import * as Linking from 'expo-linking';
import { GET_ARTIST } from '@graphql/queries/user';
import { useQuery } from '@apollo/client';
import ErrorCard from '@components/ErrorCard';
import { AntDesign } from '@expo/vector-icons';
import { useActionSheet } from '@expo/react-native-action-sheet';
import { useIsFocused } from '@react-navigation/native';
import ArtistRatesForm from '@components/artist/ArtistRatesForm';

export default function ArtistProfile() {
  const insets = useSafeAreaInsets();
  const { showActionSheetWithOptions } = useActionSheet();
  const { setSession } = useSession();
  const [genStripeConnectOnboardingLink] =
    useMutation<GenerateStripeConnectOnboardingLinkMutation>(
      GEN_STRIPE_CONNECT_ONBOARDING_LINK,
    );
  const {
    data: artistData,
    error: errorFetchingUser,
    loading: fetchingUser,
    refetch,
  } = useQuery<ArtistQuery>(GET_ARTIST);

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      refetch();
    }
  }, [isFocused]);

  const logout = () => {
    supabase.auth.signOut();
    setSession(null);
    apolloClient.clearStore();
    router.replace('/sign-in');
  };

  const openActionSheet = () => {
    const options = ['Logout', 'Cancel'];
    const destructiveButtonIndex = 0;
    const cancelButtonIndex = 1;
    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        destructiveButtonIndex,
      },
      (selectedIndex) => {
        switch (selectedIndex) {
          case destructiveButtonIndex:
            logout();
            break;
          case cancelButtonIndex:
          // Canceled
        }
      },
    );
  };

  const goStripeConnect = async () => {
    try {
      const { data } = await genStripeConnectOnboardingLink();
      const url = data?.generateStripeConnectOnboardingLink;
      if (url) {
        Linking.openURL(url);
      } else {
        console.log('no url returned!');
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  if (fetchingUser)
    return (
      <View
        style={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <ActivityIndicator />
      </View>
    );

  if (errorFetchingUser) {
    return <ErrorCard message="Error fetching user" />;
  }

  const user = artistData?.artist;
  const hasOnboarded = user?.hasOnboardedToStripe;

  return (
    <View
      style={{
        flex: 1,
        paddingTop: insets.top,
      }}
    >
      <ArtistHeader
        title="Profile"
        rightComponent={
          <Pressable
            style={{
              width: 32,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={openActionSheet}
          >
            <AntDesign name="logout" size={18} color="#333" />
          </Pressable>
        }
      />
      {!hasOnboarded && (
        <Button title="Stripe Connect" onPress={goStripeConnect} />
      )}
      <ArtistRatesForm artist={user} />
    </View>
  );
}
