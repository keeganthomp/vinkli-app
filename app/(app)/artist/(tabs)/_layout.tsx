import { Tabs, Stack } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import theme from '@theme';
import { useStripeTerminal } from '@stripe/stripe-terminal-react-native';
import { useEffect } from 'react';
import { Platform } from 'react-native';
import { SheetProvider } from 'react-native-actions-sheet';

const isWeb = Platform.OS === 'web';

type Route = {
  name: string;
};

const IosTabLayout = () => {
  const insets = useSafeAreaInsets();

  if (isWeb) {
    return null;
  }
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
    <SheetProvider>
      <Tabs
        sceneContainerStyle={{
          backgroundColor: theme.appBackground,
          paddingHorizontal: 14,
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
    </SheetProvider>
  );
};

const WebNavLayout = () => {
  return (
    <Stack
      screenOptions={{
        header: () => null,
      }}
    >
      <Stack.Screen name="bookings" />
      <Stack.Screen name="payments" />
      <Stack.Screen name="profile" />
    </Stack>
  );
};

const NavLayout = () => {
  return isWeb ? <WebNavLayout /> : <IosTabLayout />;
};

export default NavLayout;
