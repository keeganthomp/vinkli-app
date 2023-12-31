import { View, Keyboard } from 'react-native';
import Button from '@components/Button';
import FormNumberInput from '@components/inputs/FormNumberInput';
import { useForm } from 'react-hook-form';
import { useMutation } from '@apollo/client';
import { ARTIST_UPDATE_BOOKING_STATUS } from '@graphql/mutations/booking';
import {
  ArtistUpdateBookingStatusMutation,
  BookingStatus,
} from '@graphql/types';
import Toast from 'react-native-toast-message';

type PostBookingFormValues = {
  duration: string;
};

type Props = {
  bookingId: String;
  closeModal: () => void;
};

const PostBookingForm = ({ bookingId, closeModal }: Props) => {
  const [updateBookingStatus] = useMutation<ArtistUpdateBookingStatusMutation>(
    ARTIST_UPDATE_BOOKING_STATUS,
  );
  const {
    control,
    handleSubmit,
    formState: { isValid, isSubmitting },
  } = useForm<PostBookingFormValues>({
    defaultValues: {
      duration: '',
    },
  });

  const submitPostForm = async (data: PostBookingFormValues) => {
    Keyboard.dismiss();
    const isDurationNumber = !isNaN(Number(data.duration));
    if (!isDurationNumber) {
      console.log('Duration is not a number');
      return;
    }
    try {
      await updateBookingStatus({
        variables: {
          id: bookingId,
          status: BookingStatus.Completed,
          duration: Number(data.duration),
        },
      });
      Toast.show({
        type: 'success',
        text1: 'Booking completed',
        text2: 'You can now collect payment',
      });
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: error?.message || 'Error updating booking status',
      });
    } finally {
      closeModal();
    }
  };

  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        paddingHorizontal: 12,
      }}
    >
      <FormNumberInput
        disabled={isSubmitting}
        control={control}
        label="How many hours was the session?"
        name="duration"
        placeholder="3 hours"
        inputMode="numeric"
        labelStyle={{
          fontSize: 18,
          textAlign: 'center',
          paddingBottom: 8,
        }}
        style={{
          fontSize: 18,
          textAlign: 'center',
        }}
        containerStyle={{
          marginBottom: 18,
        }}
        rules={{
          required: 'Duration is required',
          min: {
            value: 1,
            message: 'Duration must be at least 1 hour',
          },
        }}
      />
      <Button
        disabled={!isValid || isSubmitting}
        label="Complete Booking"
        onPress={handleSubmit(submitPostForm)}
      />
    </View>
  );
};

export default PostBookingForm;
