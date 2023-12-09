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
import { useMemo, useState, useRef } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { router } from 'expo-router';
import theme from '@theme';
import { BookingStatus } from '@graphql/types';
import BookingCard from '@components/bookings/BookingCard';
import { bookingStatusMap } from '@const/maps';
import Modal from '@components/modals/Modal';
import { BottomSheetModal } from '@gorhom/bottom-sheet';

const validFilterStatuses = [
  BookingStatus.Completed,
  BookingStatus.Confirmed,
  BookingStatus.Cancelled,
];

const bookingStatusArr = Object.values(BookingStatus);
const validBookingStatuses = bookingStatusArr.filter((status) =>
  validFilterStatuses.includes(status),
);

type StatusFilterProps = {
  status: BookingStatus;
  onPress: (status: BookingStatus) => void;
  isActive?: boolean;
};

type FiltersProps = {
  activeFilter?: BookingStatus;
  onSelect: (status: BookingStatus) => void;
};

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

const StatusFilter = ({ status, onPress, isActive }: StatusFilterProps) => {
  const handlePress = () => {
    onPress(status);
  };
  return (
    <Pressable
      onPress={handlePress}
      style={{
        width: '100%',
        borderRadius: 4,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 12,
      }}
    >
      <Text
        style={{
          fontSize: 12,
          textTransform: 'uppercase',
          color: isActive ? '#fff' : '#000',
        }}
      >
        {bookingStatusMap[status]}
      </Text>
    </Pressable>
  );
};

const Filters = ({ activeFilter, onSelect }: FiltersProps) => (
  <View
    style={{
      display: 'flex',
      alignItems: 'center',
      paddingBottom: 14,
    }}
  >
    {validBookingStatuses.map((status) => (
      <StatusFilter
        key={status}
        status={status}
        onPress={onSelect}
        isActive={activeFilter === status}
      />
    ))}
  </View>
);

export default function ArtistBookings() {
  const insets = useSafeAreaInsets();
  const filterModalRef = useRef<BottomSheetModal>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [activeFilter, setActiveFilter] = useState<BookingStatus>();
  const {
    data: bookingData,
    loading: loadingBookings,
    error: bookingError,
    refetch,
  } = useQuery<ArtistBookingsQuery>(GET_ARTIST_BOOKINGS);

  const bookings = bookingData?.artistBookings || [];

  const openFilterModal = () => {
    filterModalRef.current?.present();
  };

  const handleStatusFilterSelect = (status: BookingStatus) => {
    if (activeFilter === status) {
      setActiveFilter(undefined);
    } else {
      setActiveFilter(status);
    }
  };

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
          // stickyHeaderIndices={[0]}
          // ListHeaderComponent={() => (
          //   <Pressable onPress={openFilterModal}>
          //     <Text>Select Filters</Text>
          //   </Pressable>
          // )}
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
            paddingTop: 10,
            paddingBottom: 44,
          }}
        />
      )}
      {/* Filters Modal */}
      <Modal ref={filterModalRef}>
        <Filters onSelect={handleStatusFilterSelect} />
      </Modal>
    </View>
  );
}
