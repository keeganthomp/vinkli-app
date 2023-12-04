import { View } from 'react-native';
import { ArtistCreateBookingMutation } from '@graphql/types';
import { CREATE_ARTIST_BOOKING } from '@graphql/mutations/booking';
import { useMutation } from '@apollo/client';
import { router } from 'expo-router';
import ArtistBookingForm from '@components/artist/ArtistBookingForm';
import { BOOKING_FRAGMENT } from '@graphql/fragments/booking';
import theme from '@theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AritstHeader from '@components/artist/ArtistHeader';
import Toast from 'react-native-toast-message';
import { ArtistBookingFromValues } from '@components/artist/ArtistBookingForm';

export default function ArtistBookingCreate() {
  const insets = useSafeAreaInsets();

  const [createBooking] = useMutation<ArtistCreateBookingMutation>(
    CREATE_ARTIST_BOOKING,
    {
      update(cache, { data }) {
        const newBooking = data?.artistCreateBooking;
        cache.modify({
          fields: {
            artistBookings(existingBookings = []) {
              const newBookingRef = cache.writeFragment({
                data: newBooking,
                fragment: BOOKING_FRAGMENT,
              });
              return [newBookingRef, ...existingBookings];
            },
          },
        });
      },
    },
  );

  const handleCreateBooking = async (data: ArtistBookingFromValues) => {
    const { date: selectedDate, time, ...bookingFormValues } = data;
    try {
      const selectedDateObj = new Date(selectedDate);
      selectedDateObj.setHours(time.hours);
      selectedDateObj.setMinutes(time.minutes);
      const createFormInput = {
        ...bookingFormValues,
        date: selectedDate ? selectedDateObj.getTime() : undefined,
      };
      const { data: newBookingData } = await createBooking({
        variables: {
          input: createFormInput,
        },
      });
      const newBooking = newBookingData?.artistCreateBooking;
      Toast.show({
        type: 'success',
        text1: 'Created new booking!',
        text2: `You can access the booking in your bookings list`,
      });
      router.replace(`/artist/booking/${newBooking?.id}`);
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: 'Error creating booking',
        text2: error.message,
      });
    }
  };

  return (
    <View
      style={{
        flex: 1,
        paddingTop: insets.top,
        backgroundColor: theme.appBackground,
      }}
    >
      <AritstHeader
        canGoBack
        title="Create Booking"
        onBackPress={router.back}
      />
      <ArtistBookingForm onSubmit={handleCreateBooking} />
    </View>
  );
}
