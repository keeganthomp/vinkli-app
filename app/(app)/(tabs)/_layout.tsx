import { Tabs, Stack } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useStripeTerminal as useStripeTerminalType } from '@stripe/stripe-terminal-react-native';
import theme from '@theme';
import { useEffect } from 'react';
import { ActivityIndicator, Platform } from 'react-native';
import { FETCH_CURRENT_USER } from '@graphql/queries/user';
import { useQuery } from '@apollo/client';
import { GetUserQuery } from '@graphql/types';

const isWeb = Platform.OS === 'web';

let useStripeTerminal: typeof useStripeTerminalType;
if (!isWeb) {
  useStripeTerminal =
    require('@stripe/stripe-terminal-react-native').useStripeTerminal;
}

type Route = {
  name: string;
};

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: 'bookings',
};

const IosTabLayout = () => {
  const insets = useSafeAreaInsets();

  if (isWeb) return null;

  const { initialize: initializeStripeTerm } = useStripeTerminal();

  useEffect(() => {
    initializeStripeTerm()
      .then(() => {
        console.log('Stripe Terminal Initialized');
      })
      .catch((error) => {
        console.log('Stripe Terminal Error', error);
      });
  }, []);

  return (
    <Tabs
      sceneContainerStyle={{
        backgroundColor: theme.appBackground,
        paddingHorizontal: 7,
      }}
      screenOptions={({ route }: { route: Route }) => {
        const shouldHideTabBar = route.name.startsWith('booking/');
        return {
          tabBarActiveTintColor: '#333',
          tabBarInactiveTintColor: '#c6c6c6',
          tabBarStyle: {
            paddingTop: isWeb ? 20 : 4,
            paddingBottom: isWeb ? insets.bottom + 30 : insets.bottom,
            transform: shouldHideTabBar ? [{ translateY: 100 }] : [],
            borderTopWidth: 0,
          },
          header: () => null,
        };
      }}
    >
      <Tabs.Screen
        name="bookings"
        options={{
          tabBarLabel: 'Bookings',
        }}
      />
      <Tabs.Screen
        name="payments"
        options={{
          tabBarLabel: 'Payments',
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarLabel: 'Profile',
          lazy: false,
        }}
      />
    </Tabs>
  );
};

const WebNavLayout = () => {
  return (
    <Stack
      screenOptions={{
        header: () => null,
        contentStyle: {
          backgroundColor: theme.appBackground,
        },
      }}
    >
      <Stack.Screen name="bookings" />
      <Stack.Screen name="payments" />
      <Stack.Screen name="profile" />
    </Stack>
  );
};

const ScreenLayout = () => {
  // fetching this here to cache it as early as possible
  useQuery<GetUserQuery>(FETCH_CURRENT_USER);

  return isWeb ? <WebNavLayout /> : <IosTabLayout />;
};

export default ScreenLayout;
