import { Text, View, ActivityIndicator, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { GET_CUSTOMER_BOOKING } from '@graphql/queries/booking';
import { useQuery } from '@apollo/client';
import { Booking, CustomerBookingQuery } from '@graphql/types';
import Label from '@components/InputLabel';
import { Image } from 'expo-image';

export default function CustomerBookingDetail() {
  const { bookingId } = useLocalSearchParams();
  const {
    data: bookingData,
    loading,
    error,
  } = useQuery<CustomerBookingQuery>(GET_CUSTOMER_BOOKING, {
    variables: {
      id: bookingId,
    },
  });

  if (loading) {
    return (
      <View>
        <ActivityIndicator />
      </View>
    );
  }

  const booking = bookingData?.customerBooking as Booking;

  const SPACING = 20;

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <Image
        source={{ uri: booking.imageUrls[0] }}
        style={{
          width: '100%',
          height: '40%',
        }}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: 12,
          paddingHorizontal: 16,
        }}
      >
        <View
          style={{
            paddingBottom: SPACING,
          }}
        >
          <Label label="Status" />
          <Text>{booking.status}</Text>
        </View>
        <View
          style={{
            paddingBottom: SPACING,
          }}
        >
          <Label label="Title" />
          <Text>{booking.title}</Text>
        </View>
        <View
          style={{
            paddingBottom: SPACING,
          }}
        >
          <Label label="Description" />
          <Text>{booking.description || 'N/A'}</Text>
        </View>
        <View
          style={{
            paddingBottom: SPACING,
          }}
        >
          <Label label="Style" />
          <Text>{booking.tattooStyle || 'N/A'}</Text>
        </View>
        <View
          style={{
            paddingBottom: SPACING,
          }}
        >
          <Label label="Black & Gray or Color" />
          <Text>{booking.tattooColor || 'N/A'}</Text>
        </View>
      </ScrollView>
    </View>
  );
}
