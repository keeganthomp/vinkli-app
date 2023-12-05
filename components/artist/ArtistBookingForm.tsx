import { View, ActivityIndicator, Keyboard, Text } from 'react-native';
import { ArtistCreateBookingInput } from '@graphql/types';
import { useForm } from 'react-hook-form';
import FormTextInput from '@components/FormTextInput';
import FormImageInput from '@components/FormImageInput';
import Button from '@components/Button';
import { tattooColorMap, tattooStyleMap, bookingTypeMap } from '@const/maps';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CalendarPicker from '@components/CalendarDatePicker';
import theme from '@theme';
import { useCallback, useMemo, useRef } from 'react';
import BottomSheet from '@gorhom/bottom-sheet';
import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';
import FormModalInput from '@components/FormModalInput';
import PickerModal from '@components/PickerModal';
import Modal from '@components/Modal';
import FormNumberInput from '@components/FormNumberInput';

export type ArtistBookingFromValues = ArtistCreateBookingInput & {
  startTime: {
    hours: number;
    minutes: number;
  };
  duration: number; // in hours
};
type Props = {
  onSubmit: (data: ArtistBookingFromValues) => void;
};

const tattooStyleOptions = Object.entries(tattooStyleMap).map(
  ([key, value]) => ({ label: value, value: key }),
);
const tattooColorOptions = Object.entries(tattooColorMap).map(
  ([key, value]) => ({ label: value, value: key }),
);
const bookingTypeOptions = Object.entries(bookingTypeMap).map(
  ([key, value]) => ({ label: value, value: key }),
);

export default function ArtistBookingForm({ onSubmit }: Props) {
  const tattooColorModalRef = useRef<BottomSheet>(null);
  const tattooStyleModalRef = useRef<BottomSheet>(null);
  const startDateModalRef = useRef<BottomSheet>(null);
  const timeModalRef = useRef<BottomSheet>(null);
  const appointmentTypeModalRef = useRef<BottomSheet>(null);

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { isValid, isSubmitting },
  } = useForm<ArtistBookingFromValues>({
    defaultValues: {
      customerEmail: '',
      title: '',
      startDate: undefined,
      endDate: undefined,
      startTime: {
        hours: undefined,
        minutes: undefined,
      },
    },
  });

  const [selectedStartDate, startTime, tattooColor, tattooStyle, bookingType] =
    watch([
      'startDate',
      'startTime',
      'tattoo.tattooColor',
      'tattoo.tattooStyle',
      'type',
    ]);
  const canSubmit =
    selectedStartDate && startTime && bookingType && isValid && !isSubmitting;

  const openAppointmentTypePicker = useCallback(() => {
    appointmentTypeModalRef.current?.expand();
    Keyboard.dismiss();
  }, []);

  const openTattooColorPicker = useCallback(() => {
    tattooColorModalRef.current?.expand();
    Keyboard.dismiss();
  }, []);

  const openTattooStylePicker = useCallback(() => {
    tattooStyleModalRef.current?.expand();
    Keyboard.dismiss();
  }, []);

  const openDatePicker = useCallback(() => {
    startDateModalRef.current?.expand();
    Keyboard.dismiss();
  }, []);

  const openTimePicker = useCallback(() => {
    if (!startTime?.hours) {
      setValue('startTime.hours', 12);
      setValue('startTime.minutes', 0);
    }
    timeModalRef.current?.expand();
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
      <View
        style={{
          flex: 1,
          backgroundColor: theme.appBackground,
        }}
      >
        {isSubmitting ? (
          <ActivityIndicator />
        ) : (
          <>
            <KeyboardAwareScrollView
              showsVerticalScrollIndicator={false}
              extraScrollHeight={75}
              keyboardShouldPersistTaps="handled"
              contentContainerStyle={{
                paddingTop: 20,
                paddingBottom: 125,
                paddingHorizontal: 14,
              }}
            >
              <FormTextInput
                control={control}
                autoCapitalize="none"
                name="customerEmail"
                label="Customer Email"
                placeholder="jane@email.com"
                keyboardType="email-address"
                returnKeyType="done"
                rules={{
                  required: 'Customer Email is required',
                }}
                containerStyle={{
                  paddingBottom: SPACING,
                }}
              />
              <FormModalInput
                openPicker={openAppointmentTypePicker}
                placeholder="Select appointment type"
                label="Appointment Type"
                value={
                  bookingTypeMap[bookingType as keyof typeof bookingTypeMap]
                }
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
                <View
                  style={{
                    width: 130,
                    marginLeft: 10,
                  }}
                >
                  <FormNumberInput
                    name="duration"
                    control={control}
                    label="Duration (hours)"
                    placeholder="Hours"
                    rules={{
                      required: 'Duration is required',
                    }}
                  />
                </View>
              </View>
              <FormTextInput
                control={control}
                name="tattoo.description"
                label="Tattoo Description"
                placeholder="Description"
                multiline
                containerStyle={{
                  paddingBottom: SPACING,
                }}
              />
              <FormModalInput
                openPicker={openTattooColorPicker}
                placeholder="Color or Black & Grey"
                label="Tattoo Color"
                value={
                  tattooColorMap[tattooColor as keyof typeof tattooColorMap]
                }
                containerStyle={{
                  paddingBottom: SPACING,
                }}
              />
              <FormModalInput
                openPicker={openTattooStylePicker}
                placeholder="Select the style of tattoo"
                label="Tattoo Style"
                value={
                  tattooStyleMap[tattooStyle as keyof typeof tattooStyleMap]
                }
                containerStyle={{
                  paddingBottom: SPACING,
                }}
              />
              <View
                style={{
                  paddingBottom: SPACING,
                }}
              >
                <FormImageInput
                  label="Reference Images"
                  control={control}
                  name="tattoo.imagePaths"
                />
              </View>
            </KeyboardAwareScrollView>
            {/* Submit button */}
            <View
              style={{
                width: '100%',
                position: 'absolute',
                bottom: 35,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                paddingHorizontal: 14,
              }}
            >
              <Button
                onPress={handleSubmit(onSubmit)}
                label="Create Booking"
                disabled={!canSubmit}
              />
            </View>
          </>
        )}
      </View>
      {/* Modals */}
      <PickerModal
        ref={tattooColorModalRef}
        control={control as any}
        name="tattoo.tattooColor"
        options={tattooColorOptions}
        modalHeight={120}
      />
      <PickerModal
        ref={tattooStyleModalRef}
        control={control as any}
        name="tattoo.tattooStyle"
        options={tattooStyleOptions}
        modalHeight={380}
      />
      <PickerModal
        ref={appointmentTypeModalRef}
        control={control as any}
        name="type"
        options={bookingTypeOptions}
        modalHeight={120}
      />
      <Modal
        ref={startDateModalRef}
        modalHeight={350}
        showDoneButton={!!selectedStartDate}
      >
        <CalendarPicker
          selectedDates={selectedStartDate}
          onDateSelected={handleStartDateChage}
        />
      </Modal>
      <Modal ref={timeModalRef} modalHeight={225} showDoneButton>
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
