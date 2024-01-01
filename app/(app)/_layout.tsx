import { Stack } from 'expo-router';
import { GET_STRIPE_TERMINAL_TOKEN } from '@graphql/queries/payments';
import { useLazyQuery } from '@apollo/client';
import { StripeTerminalConnectionTokenQuery } from '@graphql/types';
import { ActivityIndicator, Platform, View } from 'react-native';
import { useSession } from '@context/auth';
import { Redirect } from 'expo-router';
import { Navbar } from '@web/components/Navbar';
import { useQuery } from '@apollo/client';
import { CheckIfUserOnboardedQuery } from '@graphql/types';
import { CHECK_IF_USER_ONBOARDED } from '@graphql/queries/user';
import ErrorCard from '@components/Error';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

const isIos = Platform.OS === 'ios';
const isWeb = Platform.OS === 'web';

/**
 * This will error on web, so we need to conditionally import it
 * for native only
 */
let StripeTerminalProvider: React.ComponentType<any>;
if (!isWeb) {
  StripeTerminalProvider =
    require('@stripe/stripe-terminal-react-native').StripeTerminalProvider;
}

export const unstable_settings = {
  initialRouteName: '(tabs)',
};

const IosLayout = () => {
  const [fetchTerminalToken] = useLazyQuery<StripeTerminalConnectionTokenQuery>(
    GET_STRIPE_TERMINAL_TOKEN,
  );

  // if (isWeb) return null;

  const fetchTerminalTokenProvider = async () => {
    if (!isIos) return;
    const { data } = await fetchTerminalToken();
    return data?.stripeTerminalConnectionToken as string;
  };
  return (
    <StripeTerminalProvider
      logLevel="verbose"
      tokenProvider={async () => {
        const tok = await fetchTerminalTokenProvider();
        return tok as string;
      }}
    >
      <Stack
        screenOptions={{
          header: () => null,
        }}
      >
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="artist/[artistId]" />
        <Stack.Screen name="booking/create" />
        <Stack.Screen name="booking/[bookingId]/index" />
        <Stack.Screen name="booking/[bookingId]/collect-payment" />
      </Stack>
    </StripeTerminalProvider>
  );
};

const WebLayout = () => {
  return (
    <>
      <Navbar />
      <Stack
        screenOptions={{
          header: () => null,
        }}
      >
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="artist/[artistId]" />
        <Stack.Screen name="booking/create" />
        <Stack.Screen name="booking/[bookingId]/index" />
        <Stack.Screen name="booking/[bookingId]/collect-payment" />
      </Stack>
    </>
  );
};

const AppLayout = () => {
  const { session, isLoading: isLoadingSession } = useSession();
  const {
    data: userOnboardedData,
    loading: isCheckingOboardingStatus,
    error: errorCheckingUserStatus,
  } = useQuery<CheckIfUserOnboardedQuery>(CHECK_IF_USER_ONBOARDED, {
    skip: !session,
    variables: {
      phone: session?.user?.phone,
    },
    fetchPolicy: 'cache-and-network',
  });

  useEffect(() => {
    if (isLoadingSession || isCheckingOboardingStatus) return;
    SplashScreen.hideAsync();
  }, [isLoadingSession, isCheckingOboardingStatus]);

  if (isLoadingSession || isCheckingOboardingStatus)
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
        }}
      >
        <ActivityIndicator />
      </View>
    );

  if (!session) return <Redirect href="/sign-in" />;

  if (errorCheckingUserStatus)
    return (
      <ErrorCard
        message={errorCheckingUserStatus.message || 'Error fetching user info'}
      />
    );

  const isOnboarded = userOnboardedData?.checkIfUserOnboarded;

  if (!isOnboarded) return <Redirect href="/register" />;

  return isWeb ? <WebLayout /> : <IosLayout />;
};

export default AppLayout;
