import 'react-native-url-polyfill/auto';
import { Slot } from 'expo-router';
import { SessionProvider } from '@context/auth';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ApolloProvider } from '@apollo/client';
import apolloClient from '@lib/apolloClient';
import * as SplashScreen from 'expo-splash-screen';
import Toast from 'react-native-toast-message';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

// Keep the splash screen visible while we fetch resources
// we will hide this manually in (app)/_layout.tsx which is rendered next in
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  return (
    <>
      <ApolloProvider client={apolloClient}>
        <SessionProvider>
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
        </SessionProvider>
      </ApolloProvider>
      <Toast />
    </>
  );
}
