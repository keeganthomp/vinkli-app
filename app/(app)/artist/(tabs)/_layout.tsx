import { Tabs } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import theme from '@theme';
import { useStripeTerminal } from '@stripe/stripe-terminal-react-native';
import { useEffect } from 'react';

type Route = {
  name: string;
};

export default function TabLayout() {
  const insets = useSafeAreaInsets();
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
        paddingHorizontal: 12,
      }}
      screenOptions={({ route }: { route: Route }) => {
        const shouldHideTabBar = route.name.startsWith('booking/');
        return {
          tabBarActiveTintColor: '#333',
          tabBarInactiveTintColor: '#c6c6c6',
          tabBarStyle: {
            paddingTop: 4,
            paddingBottom: insets.bottom,
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
        name="payment"
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
}
