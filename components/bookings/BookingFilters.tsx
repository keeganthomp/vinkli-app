import { View, Text, Pressable } from 'react-native';
import theme from '@theme';
import { BookingStatus } from '@graphql/types';
import { bookingStatusMap } from '@const/maps';
import { Ionicons } from '@expo/vector-icons';

const bookingStatusFilters: BookingStatus[] = [
  BookingStatus.Pending,
  BookingStatus.Confirmed,
  BookingStatus.Completed,
  BookingStatus.Cancelled,
];

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
          color: '#333',
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

const BookingFilters = ({
  activeFilter,
  onSelect,
  clearFilter,
}: FiltersProps) => (
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
        color: '#333',
      }}
    >
      Select status
    </Text>
    {bookingStatusFilters.map((status) => (
      <FilterOption
        key={status}
        status={status}
        onPress={onSelect}
        isActive={activeFilter === status}
      />
    ))}
    <Pressable
      disabled={!activeFilter}
      onPress={clearFilter}
      style={{
        marginTop: 4,
        paddingVertical: 14,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text
        style={{
          color: !activeFilter ? '#d3d3d3' : theme.red,
        }}
      >
        Cancel
      </Text>
    </Pressable>
  </View>
);

export default BookingFilters;
