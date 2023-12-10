import {
  View,
  FlatList,
  ActivityIndicator,
  Text,
  RefreshControl,
} from 'react-native';
import { useQuery } from '@apollo/client';
import { ArtistBookingsQuery, Booking } from '@graphql/types';
import { GET_ARTIST_BOOKINGS } from '@graphql/queries/booking';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useState, useRef } from 'react';
import { BookingStatus } from '@graphql/types';
import BookingCard from '@components/bookings/BookingCard';
import Modal from '@components/modals/Modal';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import ArtistScreenHeader from '@components/artist/ArtistScreenHeader';
import BookingListHeader from '@components/bookings/BookingsListHeader';
import BookingFilters from '@components/bookings/BookingFilters';

const defaultFilters = [BookingStatus.Confirmed];

const NoBookings = ({
  filtersApplied = false,
}: {
  filtersApplied?: boolean;
}) => (
  <View
    style={{
      paddingTop: 24,
    }}
  >
    <Text
      style={{
        textAlign: 'center',
        fontWeight: '300',
      }}
    >
      {filtersApplied
        ? 'No bookings match this criteria'
        : 'No bookings to show'}
    </Text>
  </View>
);

export default function ArtistBookings() {
  const insets = useSafeAreaInsets();
  const filterModalRef = useRef<BottomSheetModal>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [isRefetching, setIsRefetching] = useState(false);
  const [activeFilter, setActiveFilter] = useState<BookingStatus>();
  const {
    data: bookingData,
    loading: loadingBookings,
    error: bookingError,
    refetch,
  } = useQuery<ArtistBookingsQuery>(GET_ARTIST_BOOKINGS, {
    variables: {
      statuses: defaultFilters,
    },
  });

  const bookings = bookingData?.artistBookings || [];

  const openFilterModal = () => {
    if (isRefetching || refreshing || loadingBookings) return;
    filterModalRef.current?.present();
  };

  const closeFilterModal = () => {
    filterModalRef.current?.close();
  };

  const handleClearFilter = async () => {
    closeFilterModal();
    setActiveFilter(undefined);
    setIsRefetching(true);
    // handle refetch based on filter
    await refetch({
      statuses: defaultFilters,
    });
    setIsRefetching(false);
  };

  const handleStatusFilterSelect = async (status: BookingStatus) => {
    closeFilterModal();
    if (activeFilter === status) {
      setActiveFilter(undefined);
    } else {
      setActiveFilter(status);
    }
    // handle refetch based on filter
    setIsRefetching(true);
    await refetch({
      statuses: status ? [status] : defaultFilters,
    });
    setIsRefetching(false);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  return (
    <View
      style={{
        flex: 1,
        paddingTop: insets.top,
      }}
    >
      <>
        <ArtistScreenHeader title="Bookings" />
        <BookingListHeader
          activeFilter={activeFilter}
          openFilterModal={openFilterModal}
        />
        {loadingBookings || isRefetching ? (
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
            ListEmptyComponent={() => (
              <NoBookings filtersApplied={!!activeFilter} />
            )}
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
            ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
            contentContainerStyle={{
              paddingTop: 10,
              paddingBottom: 44,
            }}
          />
        )}
      </>
      {/* Filters Modal */}
      <Modal ref={filterModalRef}>
        <BookingFilters
          activeFilter={activeFilter}
          onSelect={handleStatusFilterSelect}
          clearFilter={handleClearFilter}
        />
      </Modal>
    </View>
  );
}
