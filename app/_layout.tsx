import 'react-native-url-polyfill/auto';
import { Slot } from 'expo-router';
import { SessionProvider } from '@context/auth';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ApolloProvider } from '@apollo/client';
import { StatusBar } from 'react-native';
import apolloClient from '@lib/apolloClient';
import * as SplashScreen from 'expo-splash-screen';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { useEffect } from 'react';
import { StripeProvider } from '@stripe/stripe-react-native';
import Toast from 'react-native-toast-message';
import { toastConfig } from '@utils/toast';

const { EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY, EXPO_PUBLIC_MERCHANT_ID } =
  process.env;

// Keep the splash screen visible while we fetch resources
// we will hide this manually in (app)/_layout.tsx which is rendered next in
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useEffect(() => {
    StatusBar.setBarStyle('dark-content');
  }, []);
  return (
    <>
      <ApolloProvider client={apolloClient}>
        <SessionProvider>
          {/* <StripeProvider
          publishableKey={EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY as string}
          merchantIdentifier={EXPO_PUBLIC_MERCHANT_ID as string}
          // urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
        > */}
          <BottomSheetModalProvider>
            <ActionSheetProvider>
              <SafeAreaProvider
                style={{
                  flex: 1,
                  backgroundColor: '#fff',
                }}
              >
                <Slot />
              </SafeAreaProvider>
            </ActionSheetProvider>
          </BottomSheetModalProvider>
          {/* </StripeProvider> */}
        </SessionProvider>
      </ApolloProvider>
      <Toast topOffset={55} config={toastConfig} />
    </>
  );
}
