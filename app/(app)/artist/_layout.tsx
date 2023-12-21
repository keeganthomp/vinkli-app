import { Stack } from 'expo-router';
import { StripeTerminalProvider } from '@stripe/stripe-terminal-react-native';
import { GET_STRIPE_TERMINAL_TOKEN } from '@graphql/queries/payments';
import { useLazyQuery } from '@apollo/client';
import { StripeTerminalConnectionTokenQuery } from '@graphql/types';
import { Platform } from 'react-native';

const isIos = Platform.OS === 'ios';
const isWeb = Platform.OS === 'web';

const IosArtistLayout = () => {
  const [fetchTerminalToken] = useLazyQuery<StripeTerminalConnectionTokenQuery>(
    GET_STRIPE_TERMINAL_TOKEN,
  );

  if (isWeb) {
    return null;
  }

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
        <Stack.Screen name="booking/create" />
        <Stack.Screen name="booking/[bookingId]/index" />
        <Stack.Screen
          name="booking/[bookingId]/collect-payment"
          options={{
            presentation: 'modal',
          }}
        />
      </Stack>
    </StripeTerminalProvider>
  );
};

const WebArtistLayout = () => {
  return (
    <>
      <Stack
        screenOptions={{
          header: () => null,
        }}
      >
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="booking/create" />
        <Stack.Screen name="booking/[bookingId]/index" />
        <Stack.Screen
          name="booking/[bookingId]/collect-payment"
          options={{
            presentation: 'modal',
          }}
        />
      </Stack>
    </>
  );
};

const ArtistLayout = () => {
  return isWeb ? <WebArtistLayout /> : <IosArtistLayout />;
};

export default ArtistLayout;
