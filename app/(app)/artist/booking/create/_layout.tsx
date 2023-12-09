import { Stack, router } from 'expo-router';
import AritstHeader from '@components/artist/ArtistHeader';
import { useForm, FormProvider } from 'react-hook-form';
import { ArtistCreateBookingInput } from '@graphql/types';
import { View } from 'react-native';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import Toast from 'react-native-toast-message';
import { toastConfig } from '@utils/toast';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TimeOption } from '@utils/time';

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
        <AritstHeader title="Create Booking" canGoBack onBackPress={router.back} />
      </View>
      <BottomSheetModalProvider>
        <FormProvider {...formMethods}>
          <Stack
            screenOptions={{
              header: () => null,
              contentStyle: {
                paddingTop: 14,
                paddingHorizontal: 12,
              },
            }}
          >
            <Stack.Screen name="customerInfo" />
            <Stack.Screen name="appointmentInfo" />
            <Stack.Screen name="tattooInfo" />
          </Stack>
        </FormProvider>
      </BottomSheetModalProvider>
      <Toast config={toastConfig} topOffset={55} />
    </>
  );
}
