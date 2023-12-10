import { View, Text, Pressable } from 'react-native';
import theme from '@theme';
import { BookingStatus } from '@graphql/types';
import { bookingStatusMap } from '@const/maps';
import { Ionicons } from '@expo/vector-icons';

const validFilterStatuses = [
  BookingStatus.Completed,
  BookingStatus.Confirmed,
  BookingStatus.Cancelled,
  BookingStatus.Pending,
];

const bookingStatusArr = Object.values(BookingStatus);
const validBookingStatuses = bookingStatusArr.filter((status) =>
  validFilterStatuses.includes(status),
);

type StatusFilterProps = {
  status: BookingStatus;
  onPress: (status: BookingStatus) => void;
  isActive?: boolean;
  isLast?: boolean;
};

type FiltersProps = {
  activeFilter?: BookingStatus;
  onSelect: (status: BookingStatus) => void;
  clearFilter: () => void;
};

const FilterOption = ({
  status,
  onPress,
  isActive,
  isLast,
}: StatusFilterProps) => {
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
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: isLast ? 0 : 1,
        borderBottomColor: '#eeeeee',
        height: 50,
      }}
    >
      <Text
        style={{
          fontSize: 15,
          fontWeight: isActive ? '500' : '300',
        }}
      >
        {bookingStatusMap[status]}
      </Text>
      {isActive && (
        <Ionicons
          style={{
            marginLeft: 8,
          }}
          name="checkmark"
          size={17}
          color="black"
        />
      )}
    </Pressable>
  );
};

const BookingFilters = ({ activeFilter, onSelect, clearFilter }: FiltersProps) => (
  <View
    style={{
      display: 'flex',
      alignItems: 'center',
      paddingHorizontal: 16,
    }}
  >
    <Text
      style={{
        fontWeight: '300',
        fontSize: 12,
      }}
    >
      Select status to filter
    </Text>
    {validBookingStatuses.map((status) => (
      <FilterOption
        key={status}
        status={status}
        onPress={onSelect}
        isActive={activeFilter === status}
      />
    ))}
    {activeFilter && (
      <Pressable
        onPress={clearFilter}
        style={{
          paddingVertical: 14,
        }}
      >
        <Text
          style={{
            color: theme.alert,
          }}
        >
          Clear
        </Text>
      </Pressable>
    )}
  </View>
);

export default BookingFilters
