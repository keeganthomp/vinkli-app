import { View, Text, Pressable, Platform } from 'react-native';
import { router } from 'expo-router';
import theme from '@theme';
import { BookingStatus } from '@graphql/types';
import { bookingStatusMap } from '@const/maps';
import { MaterialIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import ArtistScreenHeader from '@components/artist/ArtistScreenHeader';
import { AntDesign } from '@expo/vector-icons';

const isWeb = Platform.OS === 'web';

type Props = {
  activeFilter?: BookingStatus;
  openFilterModal: () => void;
};

type FilterButtonProps = {
  activeFilter?: BookingStatus;
  onPress: () => void;
};

const BUTTON_SIZE = 30;

const NewBookingButton = ({ onPress }: { onPress: () => void }) => {
  return (
    <Pressable
      style={{
        // backgroundColor: theme.accentGray,
        width: BUTTON_SIZE,
        height: BUTTON_SIZE,
        borderRadius: 8,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onPress={onPress}
    >
      <Feather name="plus" size={24} color="#333" />
    </Pressable>
  );
};

const FilterButton = ({ activeFilter, onPress }: FilterButtonProps) => {
  return (
    <Pressable
      style={{
        width: BUTTON_SIZE,
        height: BUTTON_SIZE,
        borderRadius: 8,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      onPress={onPress}
    >
      {/* Indication dot when filter is active */}
      {activeFilter && (
        <View
          style={{
            width: 8,
            height: 8,
            borderRadius: 100,
            backgroundColor: theme.red,
            position: 'absolute',
            top: 3,
            right: 2,
            zIndex: 1,
          }}
        />
      )}
      <MaterialIcons name="filter-list" size={24} color="#333" />
    </Pressable>
  );
};

export default function BookingListHeader({
  activeFilter,
  openFilterModal,
}: Props) {
  const goCreateBooking = () => {
    router.push('/artist/booking/create');
  };

  return (
    <>
      <ArtistScreenHeader
        title="Bookings"
        leftComponent={
          <FilterButton onPress={openFilterModal} activeFilter={activeFilter} />
        }
        rightComponent={<NewBookingButton onPress={goCreateBooking} />}
      />
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingTop: 10,
          paddingBottom: 10,
          paddingHorizontal: isWeb ? 0 : 12,
        }}
      >
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 35,
            color: '#333',
          }}
        >
          {activeFilter ? bookingStatusMap[activeFilter] : 'Upcoming'}
        </Text>
        {isWeb && (
          <Pressable
            onPress={goCreateBooking}
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Text
              style={{
                marginRight: 3,
              }}
            >
              Create Booking
            </Text>
            <AntDesign name="plus" size={18} color="black" />
          </Pressable>
        )}
      </View>
    </>
  );
}
