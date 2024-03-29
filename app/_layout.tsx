import './global.css';
import '@components/sheets';

import { Slot, Navigator } from 'expo-router';
import { SessionProvider } from '@context/auth';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ApolloProvider } from '@apollo/client';
import { StatusBar, Platform } from 'react-native';
import apolloClient from '@lib/apolloClient';
import * as SplashScreen from 'expo-splash-screen';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import { useEffect } from 'react';
import Toast from 'react-native-toast-message';
import { toastConfig } from '@utils/toast';
import { useWindowDimensions } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useApolloClientDevTools } from '@dev-plugins/apollo-client';
import breakpoints from '@const/breakpoints';
import { StripeProvider } from '@stripe/stripe-react-native';
import theme from '@theme';
import { SheetProvider } from 'react-native-actions-sheet';

const { EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY, EXPO_PUBLIC_MERCHANT_ID } =
  process.env;

export { ErrorBoundary } from 'expo-router';

// Keep the splash screen visible while we fetch resources
// we will hide this manually in (app)/_layout.tsx which is rendered next in
SplashScreen.preventAutoHideAsync();

const isWeb = Platform.OS === 'web';

// we do not want to render the gesture handler root view on web
const AppWrapper = ({ children }: { children: React.ReactNode }) => {
  if (isWeb) return <Navigator>{children}</Navigator>;
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {children}
    </GestureHandlerRootView>
  );
};

export default function RootLayout() {
  useApolloClientDevTools(apolloClient);
  const { width } = useWindowDimensions();

  useEffect(() => {
    StatusBar.setBarStyle('dark-content');
  }, []);

  const isSmallBrowser = isWeb && width < breakpoints.md;

  const getWidth = () => {
    if (!isWeb) return '100%';
    if (isSmallBrowser) return '100%';
    // larger web browsers
    return 750;
  };

  return (
    <AppWrapper>
      <ApolloProvider client={apolloClient}>
        <SessionProvider>
          {/* <StripeProvider
          publishableKey={EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY as string}
          merchantIdentifier={EXPO_PUBLIC_MERCHANT_ID as string}
          // urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
        > */}
          <ActionSheetProvider>
            <SafeAreaProvider
              style={{
                flex: 1,
                width: getWidth(),
                alignSelf: 'center',
                paddingTop: isWeb ? 16 : 0,
                paddingHorizontal: isWeb ? 12 : 0,
                backgroundColor: theme.appBackground,
              }}
            >
              <SheetProvider>
                <Slot />
              </SheetProvider>
            </SafeAreaProvider>
          </ActionSheetProvider>
          {/* </StripeProvider> */}
        </SessionProvider>
      </ApolloProvider>
      <Toast topOffset={isWeb ? 16 : 55} config={toastConfig} />
    </AppWrapper>
  );
}
