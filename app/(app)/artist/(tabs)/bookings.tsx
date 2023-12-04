import {
  View,
  FlatList,
  ActivityIndicator,
  Text,
  RefreshControl,
  Pressable,
} from 'react-native';
import ArtistHeader from '@components/artist/ArtistHeader';
import { useQuery } from '@apollo/client';
import { ArtistBookingsQuery, Booking } from '@graphql/types';
import { GET_ARTIST_BOOKINGS } from '@graphql/queries/booking';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { router } from 'expo-router';
import theme from '@theme';

import BookingCard from '@components/bookings/BookingCard';

const NoBookings = () => (
  <View
    style={{
      paddingTop: 24,
    }}
  >
    <Text
      style={{
        textAlign: 'center',
      }}
    >
      You have no Bookings
    </Text>
  </View>
);

export default function ArtistBookings() {
  const insets = useSafeAreaInsets();
  const [refreshing, setRefreshing] = useState(false);
  const {
    data: bookingData,
    loading: loadingBookings,
    error: bookingError,
    refetch,
  } = useQuery<ArtistBookingsQuery>(GET_ARTIST_BOOKINGS);

  const bookings = bookingData?.artistBookings || [];

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const goCreateBooking = () => {
    router.push('/artist/booking/create');
  };

  return (
    <View
      style={{
        flex: 1,
        paddingTop: insets.top,
      }}
    >
      <ArtistHeader
        title="Bookings"
        rightComponent={
          <Pressable
            style={{
              backgroundColor: theme.accentGray,
              width: 32,
              height: 32,
              borderRadius: 8,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={goCreateBooking}
          >
            <AntDesign name="plus" size={17} color="black" />
          </Pressable>
        }
      />
      {loadingBookings ? (
        <View
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <ActivityIndicator
            style={{
              marginTop: 20,
            }}
            color="black"
          />
        </View>
      ) : (
        <FlatList
          ListEmptyComponent={NoBookings}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          data={bookings}
          renderItem={({ item: booking }) => (
            <BookingCard
              booking={booking}
              href={`/artist/booking/${booking.id}`}
            />
          )}
          keyExtractor={(item: Booking) => item.id}
          ItemSeparatorComponent={() => <View style={{ height: 28 }} />}
          contentContainerStyle={{
            paddingTop: 14,
            paddingBottom: 44,
          }}
        />
      )}
    </View>
  );
}
