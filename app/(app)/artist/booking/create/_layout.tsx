import { Stack, router } from 'expo-router';
import AritstHeader from '@components/artist/ArtistHeader';
import { useForm, FormProvider } from 'react-hook-form';
import { ArtistCreateBookingInput } from '@graphql/types';
import { View } from 'react-native';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import Toast from 'react-native-toast-message';
import { toastConfig } from '@utils/toast';

export const unstable_settings = {
  initialRouteName: 'customerInfo',
};

export type ArtistBookingFromValues = ArtistCreateBookingInput & {
  startTime: {
    hours: number;
    minutes: number;
  };
  duration: number; // in hours
};

export default function ArtistBookingCreateLayout() {
  const formMethods = useForm<ArtistBookingFromValues>({
    defaultValues: {
      customerEmail: '',
      title: '',
      startDate: undefined,
      endDate: undefined,
      startTime: {
        hours: undefined,
        minutes: undefined,
      },
    },
  });

  return (
    <>
      <View
        style={{
          paddingTop: 12,
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
      <Toast config={toastConfig} topOffset={25} />
    </>
  );
}
