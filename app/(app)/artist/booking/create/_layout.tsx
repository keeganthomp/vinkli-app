import { Stack, router } from 'expo-router';
import AritstHeader from '@components/artist/ArtistScreenHeader';
import { useForm, FormProvider } from 'react-hook-form';
import { ArtistCreateBookingInput } from '@graphql/types';
import { View, Platform } from 'react-native';
import Toast from 'react-native-toast-message';
import { toastConfig } from '@utils/toast';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TimeOption } from '@utils/time';
import theme from '@theme';
import { SheetProvider } from 'react-native-actions-sheet';

const isWeb = Platform.OS === 'web';

export const unstable_settings = {
  initialRouteName: 'customerInfo',
};

export type ArtistBookingFromValues = ArtistCreateBookingInput & {
  duration: number; // in hours
  startTime: TimeOption;
};

export default function ArtistBookingCreateLayout() {
  const insets = useSafeAreaInsets();
  const formMethods = useForm<ArtistBookingFromValues>({
    defaultValues: {
      customerEmail: '',
      title: '',
      startDate: undefined,
      endDate: undefined,
      startTime: undefined,
    },
  });

  return (
    <>
      <View
        style={{
          paddingTop: insets.top,
        }}
      >
        <AritstHeader
          title="Create Booking"
          canGoBack
          onBackPress={router.back}
        />
      </View>
      <SheetProvider>
        <FormProvider {...formMethods}>
          <Stack
            screenOptions={{
              header: () => null,
              contentStyle: {
                paddingTop: 14,
                paddingHorizontal: 12,
                backgroundColor: theme.appBackground,
              },
            }}
          >
            <Stack.Screen name="generalInfo" />
            <Stack.Screen name="tattooInfo" />
            <Stack.Screen name="dateAndTime" />
          </Stack>
        </FormProvider>
      </SheetProvider>
      <Toast config={toastConfig} topOffset={isWeb ? 16 : 55} />
    </>
  );
}
