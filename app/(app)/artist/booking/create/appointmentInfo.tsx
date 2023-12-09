import { View, Keyboard, Text } from 'react-native';
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
import { router } from 'expo-router';
import { ArtistBookingFromValues } from './_layout';
import TimePicker from '@components/TimePicker';
import { TimeOption } from '@utils/time';

const bookingTypeOptions = Object.entries(bookingTypeMap).map(
  ([key, value]) => ({ label: value, value: key }),
);

export default function ArtistBookingAppointmentInfo() {
  const { control, watch, setValue } =
    useFormContext<ArtistBookingFromValues>();
  const startDateModalRef = useRef<BottomSheetModal>(null);
  const timeModalRef = useRef<BottomSheetModal>(null);
  const appointmentTypeModalRef = useRef<BottomSheetModal>(null);

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

  const displayStartDate = useMemo(() => {
    if (!selectedStartDate) return null;
    const dayOfWeek = moment(selectedStartDate).format('dddd');
    return `${dayOfWeek}, ${moment(selectedStartDate).format('LL')}`;
  }, [selectedStartDate]);

  const SPACING = 22;

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
              paddingBottom: 10,
            }}
          />
        )}
        <NextButton
          label="Tattoo Info"
          onPress={goToTattooInfo}
          disabled={!canGoToTattooInfo}
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
