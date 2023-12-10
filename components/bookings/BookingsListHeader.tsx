import { View, Text, Pressable } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { router } from 'expo-router';
import theme from '@theme';
import { BookingStatus } from '@graphql/types';
import { bookingStatusMap } from '@const/maps';
import { MaterialIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

type Props = {
  activeFilter?: BookingStatus;
  openFilterModal: () => void;
};

type FilterButtonProps = {
  activeFilter?: BookingStatus;
  onPress: () => void;
};

const NewBookingButton = ({ onPress }: { onPress: () => void }) => {
  return (
    <Pressable
      style={{
        backgroundColor: theme.accentGray,
        width: 32,
        height: 32,
        borderRadius: 8,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onPress={onPress}
    >
      <Feather name="plus" size={20} color="#333" />
    </Pressable>
  );
};

const FilterButton = ({ activeFilter, onPress }: FilterButtonProps) => {
  return (
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
      onPress={onPress}
    >
      {/* Indication dot when filter is active */}
      {activeFilter && (
        <View
          style={{
            width: 8,
            height: 8,
            borderRadius: 100,
            backgroundColor: theme.alert,
            position: 'absolute',
            top: 0,
            right: -2,
          }}
        />
      )}
      <MaterialIcons name="filter-list" size={17} color="black" />
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
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 8,
        paddingTop: 8,
      }}
    >
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <FilterButton activeFilter={activeFilter} onPress={openFilterModal} />
        <Text
          style={{
            paddingLeft: 10,
            fontWeight: 'bold',
            fontSize: 31,
          }}
        >
          {activeFilter ? bookingStatusMap[activeFilter] : 'Upcoming'}
        </Text>
      </View>
      <NewBookingButton onPress={goCreateBooking} />
    </View>
  );
}
