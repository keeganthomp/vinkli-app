import { View, Keyboard, Text } from 'react-native';
import { ArtistCreateBookingInput } from '@graphql/types';
import { useFormContext } from 'react-hook-form';
import { bookingTypeMap } from '@const/maps';
import CalendarPicker from '@components/CalendarDatePicker';
import { useCallback, useMemo, useRef } from 'react';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';
import FormModalInput from '@components/inputs/FormModalInput';
import PickerModal from '@components/modals/PickerModal';
import Modal from '@components/modals/Modal';
import FormNumberInput from '@components/inputs/FormNumberInput';
import NextButton from '@components/NextButton';
import { router } from 'expo-router';
import { ArtistBookingFromValues } from './_layout';

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
    router.push('/artist/booking/create/tattooInfo');
  };

  const [selectedStartDate, startTime, bookingType] = watch([
    'startDate',
    'startTime',
    'type',
  ]);

  const canGoToTattooInfo = useMemo(() => {
    const hasSelectedStartDate = !!selectedStartDate;
    const hasSelectedStartTime = !!startTime?.hours;
    const hasSelectedBookingType = !!bookingType;
    return (
      hasSelectedStartDate && hasSelectedStartTime && hasSelectedBookingType
    );
  }, [selectedStartDate, startTime?.hours, bookingType]);

  console.log({
    selectedStartDate,
    startTime,
    bookingType,
  });

  const openAppointmentTypePicker = useCallback(() => {
    appointmentTypeModalRef.current?.present();
    Keyboard.dismiss();
  }, []);

  const openDatePicker = useCallback(() => {
    startDateModalRef.current?.present();
    Keyboard.dismiss();
  }, []);

  const openTimePicker = useCallback(() => {
    if (!startTime?.hours) {
      setValue('startTime.hours', 12);
      setValue('startTime.minutes', 0);
    }
    timeModalRef.current?.present();
    Keyboard.dismiss();
  }, []);

  const handleStartDateChage = (incomingDate: Date) => {
    const isAlreadySelected = moment(selectedStartDate).isSame(
      incomingDate,
      'day',
    );
    const newDate = isAlreadySelected ? null : incomingDate;
    setValue('startDate', newDate);
  };

  const handleTimeChange = (incomingDate: Date) => {
    const hours = incomingDate.getHours();
    const minutes = incomingDate.getMinutes();
    setValue('startTime.hours', hours);
    setValue('startTime.minutes', minutes);
  };

  const displayStartDate = useMemo(() => {
    if (!selectedStartDate) return null;
    const dayOfWeek = moment(selectedStartDate).format('dddd');
    return `${dayOfWeek}, ${moment(selectedStartDate).format('LL')}`;
  }, [selectedStartDate]);

  const displayTime = useMemo(() => {
    const hasSelectedHours = typeof startTime.hours === 'number';
    const hasSelectedMinutes = typeof startTime.minutes === 'number';
    if (!hasSelectedHours || !hasSelectedMinutes) return null;
    const dateObj = new Date();
    dateObj.setHours(startTime.hours);
    dateObj.setMinutes(startTime.minutes);
    return moment(dateObj).format('LT');
  }, [startTime?.hours, startTime?.minutes]);

  const startTimeDateObj = useMemo(() => {
    const hasSelectedHours = typeof startTime.hours === 'number';
    const hasSelectedMinutes = typeof startTime.minutes === 'number';
    const dateObj = new Date();
    if (!hasSelectedHours || !hasSelectedMinutes) {
      dateObj.setHours(12);
      dateObj.setMinutes(0);
      return dateObj;
    }
    dateObj.setHours(startTime.hours);
    dateObj.setMinutes(startTime.minutes);
    return dateObj;
  }, [startTime?.hours, startTime?.minutes]);

  const SPACING = 22;

  return (
    <>
      <View>
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
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            paddingBottom: SPACING,
          }}
        >
          <View
            style={{
              width: 115,
            }}
          >
            <FormModalInput
              openPicker={openTimePicker}
              label="Start Time"
              placeholder="Select time"
              value={displayTime}
            />
          </View>
          {selectedStartDate && startTime?.hours && (
            <View
              style={{
                width: 132,
                marginLeft: 10,
              }}
            >
              <FormNumberInput
                name="duration"
                control={control}
                label="Duration (hours)"
                placeholder="1 Hour"
              />
            </View>
          )}
        </View>
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
      <Modal ref={startDateModalRef} showDoneButton={!!selectedStartDate}>
        <CalendarPicker
          selectedDates={selectedStartDate}
          onDateSelected={handleStartDateChage}
        />
      </Modal>
      <Modal ref={timeModalRef} showDoneButton>
        {displayStartDate && (
          <Text
            style={{
              textAlign: 'center',
            }}
          >
            {displayStartDate}
          </Text>
        )}
        <DateTimePicker
          mode="time"
          display="spinner"
          textColor="#333"
          accentColor="#333"
          minuteInterval={15}
          value={startTimeDateObj}
          onChange={(event, date) => {
            if (date) handleTimeChange(date);
          }}
        />
      </Modal>
    </>
  );
}
