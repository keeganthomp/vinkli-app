import {
  View,
  Keyboard,
  Text,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { useFormContext } from 'react-hook-form';
import { useCallback, useMemo, useState } from 'react';
import moment from 'moment';
import FormModalInput from '@components/inputs/FormModalInput';
import Button from '@components/Button';
import { router } from 'expo-router';
import { ArtistBookingFromValues } from './_layout';
import { TimeOption } from '@utils/time';
import { useMutation } from '@apollo/client';
import { ArtistCreateBookingMutation } from '@graphql/types';
import { CREATE_ARTIST_BOOKING } from '@graphql/mutations/booking';
import Toast from 'react-native-toast-message';
import { BOOKING_FRAGMENT } from '@graphql/fragments/booking';
import { SheetManager } from 'react-native-actions-sheet';
import sheetIds from '@const/sheets';
import { DatePicker as WebDatePicker } from '@web/components/DatePicker';

const isWeb = Platform.OS === 'web';

export default function ArtistBookingAppointmentInfo() {
  const [isSubmitting, setSubmitting] = useState(false);
  const { watch, setValue, handleSubmit } =
    useFormContext<ArtistBookingFromValues>();
  // const startDateModalRef = useRef<BottomSheetModal>(null);
  // const timeModalRef = useRef<BottomSheetModal>(null);
  const [createBooking] = useMutation<ArtistCreateBookingMutation>(
    CREATE_ARTIST_BOOKING,
    {
      update(cache, { data }) {
        const newBooking = data?.artistCreateBooking;
        cache.modify({
          fields: {
            userBookings(existingBookings = []) {
              const newBookingRef = cache.writeFragment({
                data: newBooking,
                fragment: BOOKING_FRAGMENT,
              });
              return [newBookingRef, ...existingBookings];
            },
          },
        });
      },
    },
  );

  const [selectedStartDate, startTime] = watch(['startDate', 'startTime']);

  const canGoToTattooInfo = useMemo(() => {
    const hasSelectedStartDate = !!selectedStartDate;
    const hasSelectedStartTime = !!startTime;
    return hasSelectedStartDate && hasSelectedStartTime;
  }, [selectedStartDate, startTime]);

  const selectDate = useCallback((incomingDate: Date) => {
    const isAlreadySelected = moment(selectedStartDate).isSame(
      incomingDate,
      'day',
    );
    const newDate = isAlreadySelected ? null : incomingDate;
    setValue('startDate', newDate);
  }, []);
  const selectTime = useCallback((incomingTime: TimeOption) => {
    setValue('startTime', incomingTime);
  }, []);

  const openDatePicker = (selectingTime = false) => {
    Keyboard.dismiss();
    SheetManager.show(sheetIds.dateAndTimeSelect, {
      payload: {
        selectDate,
        selectedDate: selectedStartDate,
        selectTime,
        selectedTime: startTime,
        isSelectingTime: selectingTime,
      },
    });
  };
  const openTimePicker = () => {
    openDatePicker(true);
  };

  const handleCreateBooking = async (data: ArtistBookingFromValues) => {
    const {
      startDate: selectedStartDate,
      startTime,
      duration,
      ...bookingFormValues
    } = data;
    try {
      Keyboard.dismiss();
      setSubmitting(true);
      const startDateObj = new Date(selectedStartDate);
      // get start date in iso string
      const startDateIsoString = startDateObj.toISOString();
      // trim off the time from the date iso string
      const startDateString = startDateIsoString.split('T')[0];
      // concat the start date string with the start time string
      const finalizedStartDate = `${startDateString}T${startTime.value}`;
      // convert finalized start date to milliseconds
      const startDateToSubmit = new Date(finalizedStartDate).getTime();
      // get end date by adding duration to start date
      // convert duration from hours to milliseconds
      const durationInMilliseconds = (duration || 0) * 60 * 60 * 1000;
      // add duration to start date
      const endDateToSubmit = new Date(
        startDateObj.getTime() + durationInMilliseconds,
      );
      const createFormInput = {
        ...bookingFormValues,
        phone: bookingFormValues.phone.replace(/\D/g, ''),
        startDate: selectedStartDate ? startDateToSubmit : undefined,
        endDate: duration ? endDateToSubmit : undefined,
      };
      const { data: newBookingData } = await createBooking({
        variables: {
          input: createFormInput,
        },
      });
      const newBooking = newBookingData?.artistCreateBooking;
      router.replace(`/(app)/booking/${newBooking?.id}`);
      Toast.show({
        type: 'success',
        text1: 'Booking created',
        text2: 'Booking successfully created',
      });
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: 'Error creating booking',
        text2: error.message,
      });
    } finally {
      setSubmitting(false);
    }
  };

  const displayStartDate = useMemo(() => {
    if (!selectedStartDate) return null;
    const dayOfWeek = moment(selectedStartDate).format('dddd');
    return `${dayOfWeek}, ${moment(selectedStartDate).format('LL')}`;
  }, [selectedStartDate]);

  const SPACING = 22;

  if (isSubmitting) {
    return (
      <View
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View>
      <Text
        style={{
          fontSize: 31,
          fontWeight: 'bold',
          paddingBottom: 18,
        }}
      >
        Date & Time
      </Text>
      {isWeb ? (
        <View
          style={{
            paddingBottom: SPACING,
          }}
        >
          <WebDatePicker
            date={selectedStartDate}
            onDateSelect={(date) => setValue('startDate', date)}
          />
        </View>
      ) : (
        <FormModalInput
          openPicker={() => openDatePicker()}
          label="Date"
          placeholder="Select date"
          value={displayStartDate}
          containerStyle={{
            paddingBottom: SPACING,
          }}
        />
      )}
      {selectedStartDate && (
        <FormModalInput
          openPicker={openTimePicker}
          label="Start Time"
          placeholder="Select time"
          value={startTime?.displayTime || ''}
          containerStyle={{
            paddingBottom: SPACING,
          }}
        />
      )}
      <Button
        label="Create Booking"
        disabled={!canGoToTattooInfo}
        onPress={handleSubmit(handleCreateBooking)}
        style={{
          marginTop: 20,
          height: 38,
        }}
      />
    </View>
  );
}
