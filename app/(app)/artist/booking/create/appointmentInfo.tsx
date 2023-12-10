import { View, Keyboard, Text, ActivityIndicator } from 'react-native';
import { useFormContext } from 'react-hook-form';
import { bookingTypeMap } from '@const/maps';
import CalendarPicker from '@components/CalendarDatePicker';
import { useCallback, useMemo, useRef } from 'react';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import moment from 'moment';
import FormModalInput from '@components/inputs/FormModalInput';
import PickerModal from '@components/modals/PickerModal';
import Modal, { FlatListModal } from '@components/modals/Modal';
import NextButton from '@components/NextButton';
import Button from '@components/Button';
import { router } from 'expo-router';
import { ArtistBookingFromValues } from './_layout';
import TimePicker from '@components/TimePicker';
import { TimeOption } from '@utils/time';
import { useMutation } from '@apollo/client';
import { ArtistCreateBookingMutation } from '@graphql/types';
import { CREATE_ARTIST_BOOKING } from '@graphql/mutations/booking';
import Toast from 'react-native-toast-message';
import { BOOKING_FRAGMENT } from '@graphql/fragments/booking';

const bookingTypeOptions = Object.entries(bookingTypeMap).map(
  ([key, value]) => ({ label: value, value: key }),
);

export default function ArtistBookingAppointmentInfo() {
  const {
    control,
    watch,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = useFormContext<ArtistBookingFromValues>();
  const startDateModalRef = useRef<BottomSheetModal>(null);
  const timeModalRef = useRef<BottomSheetModal>(null);
  const appointmentTypeModalRef = useRef<BottomSheetModal>(null);
  const [createBooking] = useMutation<ArtistCreateBookingMutation>(
    CREATE_ARTIST_BOOKING,
    {
      update(cache, { data }) {
        const newBooking = data?.artistCreateBooking;
        cache.modify({
          fields: {
            artistBookings(existingBookings = []) {
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

  const goToTattooInfo = () => {
    Keyboard.dismiss();
    router.push('/artist/booking/create/tattooInfo');
  };

  const [selectedStartDate, startTime, bookingType] = watch([
    'startDate',
    'startTime',
    'type',
  ]);

  const canGoToTattooInfo = useMemo(() => {
    const hasSelectedStartDate = !!selectedStartDate;
    const hasSelectedStartTime = !!startTime;
    const hasSelectedBookingType = !!bookingType;
    return (
      hasSelectedStartDate && hasSelectedStartTime && hasSelectedBookingType
    );
  }, [selectedStartDate, startTime, bookingType]);

  const openAppointmentTypePicker = useCallback(() => {
    appointmentTypeModalRef.current?.present();
    Keyboard.dismiss();
  }, []);

  const openDatePicker = useCallback(() => {
    startDateModalRef.current?.present();
    Keyboard.dismiss();
  }, []);

  const closeDatePicker = useCallback(() => {
    startDateModalRef.current?.close();
  }, []);

  const openTimePicker = useCallback(() => {
    closeDatePicker();
    timeModalRef.current?.present();
    Keyboard.dismiss();
  }, []);

  const closeTimePicker = useCallback(() => {
    timeModalRef.current?.close();
  }, []);

  const handleDateConfirm = useCallback(() => {
    closeDatePicker();
    openTimePicker();
  }, [startDateModalRef.current, timeModalRef.current]);

  const handleStartDateChage = (incomingDate: Date) => {
    const isAlreadySelected = moment(selectedStartDate).isSame(
      incomingDate,
      'day',
    );
    const newDate = isAlreadySelected ? null : incomingDate;
    setValue('startDate', newDate);
  };

  const handleTimeSelect = (incomingTime: TimeOption) => {
    setValue('startTime', incomingTime);
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
        startDate: selectedStartDate ? startDateToSubmit : undefined,
        endDate: duration ? endDateToSubmit : undefined,
      };
      const { data: newBookingData } = await createBooking({
        variables: {
          input: createFormInput,
        },
      });
      const newBooking = newBookingData?.artistCreateBooking;
      router.replace(`/artist/booking/${newBooking?.id}`);
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: 'Error creating booking',
        text2: error.message,
      });
    }
  };

  const displayStartDate = useMemo(() => {
    if (!selectedStartDate) return null;
    const dayOfWeek = moment(selectedStartDate).format('dddd');
    return `${dayOfWeek}, ${moment(selectedStartDate).format('LL')}`;
  }, [selectedStartDate]);

  const SPACING = 22;

  if (isSubmitting) {
    return <View
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <ActivityIndicator />
    </View>;
  }

  return (
    <>
      <View>
        <Text
          style={{
            fontSize: 31,
            fontWeight: 'bold',
            paddingBottom: 18,
          }}
        >
          Appointment Info
        </Text>
        <FormModalInput
          openPicker={openAppointmentTypePicker}
          placeholder="Select appointment type"
          label="Appointment Type"
          value={bookingTypeMap[bookingType as keyof typeof bookingTypeMap]}
          containerStyle={{
            paddingBottom: SPACING,
          }}
        />
        <FormModalInput
          openPicker={openDatePicker}
          label="Date"
          placeholder="Select date"
          value={displayStartDate}
          containerStyle={{
            paddingBottom: SPACING,
          }}
        />
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
        <NextButton
          variant="outlined"
          label="Tattoo Info"
          disabled={!canGoToTattooInfo}
          onPress={goToTattooInfo}
        />
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
      {/* Modals */}
      <PickerModal
        ref={appointmentTypeModalRef}
        control={control as any}
        name="type"
        options={bookingTypeOptions}
      />
      <Modal
        ref={startDateModalRef}
        showDoneButton
        doneButtonText="Confirm Date"
        doneButtonDisabled={!selectedStartDate}
        // onDoneButtonPress={handleDateConfirm}
      >
        <CalendarPicker
          selectedDates={selectedStartDate}
          onDateSelect={handleStartDateChage}
        />
      </Modal>
      <FlatListModal
        ref={timeModalRef}
        height={450}
        enableDynamicSizing={false}
      >
        {displayStartDate && (
          <Text
            style={{
              textAlign: 'center',
              paddingBottom: 10,
            }}
          >
            {displayStartDate}
          </Text>
        )}
        <TimePicker
          selectedTime={startTime}
          onTimeSelect={handleTimeSelect}
          closeModal={closeTimePicker}
        />
      </FlatListModal>
    </>
  );
}
