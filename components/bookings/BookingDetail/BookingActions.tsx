import { View, Pressable, Text } from 'react-native';
import {
  Booking,
  BookingStatus,
  ArtistUpdateBookingStatusMutation,
} from '@graphql/types';
import { useMutation } from '@apollo/client';
import { ARTIST_UPDATE_BOOKING_STATUS } from '@graphql/mutations/booking';
import Toast from 'react-native-toast-message';
import { router } from 'expo-router';
import { useMemo } from 'react';
import { Ionicons } from '@expo/vector-icons';

type Props = {
  booking: Booking;
  onBookingComplete: () => void;
};

type PartialBookingStatusMap = {
  [K in BookingStatus]?: BookingStatus | string;
};

// map for label
const buttonLabelStatusMap: PartialBookingStatusMap = {
  [BookingStatus.Pending]: 'Confirm',
  [BookingStatus.Confirmed]: 'Mark Complete',
  [BookingStatus.Completed]: 'Collect Payment',
  [BookingStatus.Cancelled]: 'Confirm',
};

// map for verbiage
const verbiageMap: PartialBookingStatusMap = {
  [BookingStatus.Pending]: 'Peending',
  [BookingStatus.Confirmed]: 'Confirmed',
  [BookingStatus.Completed]: 'Completed',
  [BookingStatus.Cancelled]: 'Cancelled',
};

// map to update status from current status
const actionStatusMap: PartialBookingStatusMap = {
  [BookingStatus.Cancelled]: BookingStatus.Confirmed,
  [BookingStatus.Rejected]: BookingStatus.Confirmed,
  [BookingStatus.Pending]: BookingStatus.Confirmed,
  [BookingStatus.Confirmed]: BookingStatus.Completed,
};

const ActionButton = ({
  status,
  onPress,
}: {
  status: BookingStatus;
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
        height: 40,
        borderRadius: 6,
        backgroundColor: '#333',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text
        style={{
          fontSize: 14,
          color: '#fff',
          fontWeight: '500',
        }}
      >
        {buttonLabelStatusMap[status]}
      </Text>
    </Pressable>
  );
};

const BookingActions = ({ booking, onBookingComplete }: Props) => {
  const [updateBookingStatus] = useMutation<ArtistUpdateBookingStatusMutation>(
    ARTIST_UPDATE_BOOKING_STATUS,
  );

  const isPaid = useMemo(() => {
    return booking?.paymentReceived;
  }, [booking?.paymentReceived]);

  const handleBookingAction = async () => {
    const currentStatus = booking.status;

    // if currently complete go to collect payment
    if (currentStatus === BookingStatus.Completed) {
      router.push(`/artist/booking/${booking.id}/collect-payment`);
      return;
    }

    const newStatus = actionStatusMap[booking.status];

    // if marking complete - open post booking form
    if (newStatus === BookingStatus.Completed) {
      onBookingComplete();
      return;
    }

    // handle rest of status updates
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
          verbiageMap[newStatus as BookingStatus]
        }`,
      });
    } catch (err) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: `Error updating status to ${
          verbiageMap[newStatus as BookingStatus]
        }`,
      });
      console.log('Error updating status', err);
    }
  };

  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 12,
      }}
    >
      {isPaid ? (
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            borderWidth: 1,
            borderColor: '#333',
            borderRadius: 6,
            width: '100%',
            justifyContent: 'center',
            height: 40
          }}
        >
          <Text
            style={{
              fontSize: 14,
              color: '#333',
              fontWeight: 'bold',
            }}
          >
            Payment Received
          </Text>
          <Ionicons
            style={{
              marginLeft: 12,
            }}
            name="checkmark-circle-sharp"
            size={20}
            color="#333"
          />
        </View>
      ) : (
        <ActionButton status={booking.status} onPress={handleBookingAction} />
      )}
    </View>
  );
};

export default BookingActions;
