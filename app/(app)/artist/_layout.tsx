import { Stack } from 'expo-router';
import { StripeTerminalProvider } from '@stripe/stripe-terminal-react-native';
import { GET_STRIPE_TERMINAL_TOKEN } from '@graphql/queries/payments';
import { useLazyQuery } from '@apollo/client';
import ErrorCard from '@components/ErrorCard';
import { StripeTerminalConnectionTokenQuery } from '@graphql/types';

export default function ArtistLayout() {
  const [fetchTerminalToken] = useLazyQuery<StripeTerminalConnectionTokenQuery>(
    GET_STRIPE_TERMINAL_TOKEN,
  );

  const fetchTerminalTokenProvider = async () => {
    
    const { data } = await fetchTerminalToken();
    return data?.stripeTerminalConnectionToken as string;
  };

  return (
    <StripeTerminalProvider
      logLevel="verbose"
      tokenProvider={fetchTerminalTokenProvider}
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
}
