import { ScrollView } from 'react-native';
import { Booking } from '@graphql/types';
import BookingInfo from '@components/bookings/BookingDetail/BookingInfo';

type Props = {
  booking: Booking;
};

export default function ArtistBookingDetail({ booking }: Props) {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingHorizontal: 12,
        paddingBottom: 150,
        paddingTop: 20,
      }}
    >
      <BookingInfo booking={booking} />
    </ScrollView>
  );
}
