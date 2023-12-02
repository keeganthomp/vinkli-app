import { View, Pressable, Text } from 'react-native';
import {
  Booking,
  BookingStatus,
  ArtistUpdateBookingStatusMutation,
} from '@graphql/types';
import { useMutation } from '@apollo/client';
import { ARTIST_UPDATE_BOOKING_STATUS } from '@graphql/mutations/booking';
import Toast from 'react-native-toast-message';

type Props = {
  booking: Booking;
  openPaymentModal: () => void;
};

type PartialBookingStatusMap = {
  [K in BookingStatus]?: BookingStatus | string;
};

// map for label
const statusFormatMap: PartialBookingStatusMap = {
  [BookingStatus.Pending]: 'Confirm',
  [BookingStatus.Cancelled]: 'Confirm',
  [BookingStatus.Confirmed]: 'Collect Payment',
};

// map to update status from current status
const actionStatusMap: PartialBookingStatusMap = {
  [BookingStatus.Cancelled]: BookingStatus.Confirmed,
  [BookingStatus.Rejected]: BookingStatus.Confirmed,
  [BookingStatus.Pending]: BookingStatus.Confirmed,
  [BookingStatus.Completed]: BookingStatus.Completed,
};

const ActionButton = ({
  currentStatus,
  onPress,
}: {
  currentStatus: BookingStatus;
  onPress: () => void;
}) => {
  const handlePress = () => {
    onPress();
  };

  return (
    <Pressable
      onPress={handlePress}
      style={{
        width: '100%',
        height: 37,
        borderRadius: 6,
        backgroundColor: '#dddddd',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
      }}
    >
      <Text
        style={{
          fontSize: 15,
        }}
      >
        {statusFormatMap[currentStatus]}
      </Text>
    </Pressable>
  );
};

const BookingActions = ({ booking, openPaymentModal }: Props) => {
  const [updateBookingStatus] = useMutation<ArtistUpdateBookingStatusMutation>(
    ARTIST_UPDATE_BOOKING_STATUS,
  );

  const handleUpdateBookingStatus = async () => {
    const currentStatus = booking.status;

    if (currentStatus === BookingStatus.Confirmed) {
      openPaymentModal();
      return;
    }

    const newStatus = actionStatusMap[booking.status];
    try {
      await updateBookingStatus({
        variables: {
          id: booking.id,
          status: newStatus,
        },
      });
      Toast.show({
        type: 'success',
        text1: 'Status updated',
        text2: `Booking status updated to ${
          statusFormatMap[newStatus as BookingStatus]
        }`,
      });
    } catch (err) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: `Error updating status to ${
          statusFormatMap[newStatus as BookingStatus]
        }`,
      });
      console.log('Error updating status', err);
    }
  };

  return (
    <View
      style={{
        paddingHorizontal: 12,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 16,
      }}
    >
      <ActionButton
        currentStatus={booking.status}
        onPress={handleUpdateBookingStatus}
      />
    </View>
  );
};

export default BookingActions;
