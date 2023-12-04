import { View, ActivityIndicator, Keyboard, Text } from 'react-native';
import { ArtistCreateBookingInput } from '@graphql/types';
import { useForm } from 'react-hook-form';
import FormTextInput from '@components/FormTextInput';
import FormImageInput from '@components/FormImageInput';
import Button from '@components/Button';
import { tattooColorMap, tattooStyleMap } from '@const/maps';
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

export type ArtistBookingFromValues = ArtistCreateBookingInput & {
  time: {
    hours: number;
    minutes: number;
  };
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

export default function ArtistBookingForm({ onSubmit }: Props) {
  const tattooColorModalRef = useRef<BottomSheet>(null);
  const tattooStyleModalRef = useRef<BottomSheet>(null);
  const dateModalRef = useRef<BottomSheet>(null);
  const timeModalRef = useRef<BottomSheet>(null);

  const openTattooColorPicker = useCallback(() => {
    tattooColorModalRef.current?.expand();
    Keyboard.dismiss();
  }, []);

  const openTattooStylePicker = useCallback(() => {
    tattooStyleModalRef.current?.expand();
    Keyboard.dismiss();
  }, []);

  const openDatePicker = useCallback(() => {
    dateModalRef.current?.expand();
    Keyboard.dismiss();
  }, []);

  const openTimePicker = useCallback(() => {
    timeModalRef.current?.expand();
    Keyboard.dismiss();
  }, []);

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
      date: undefined,
      time: {
        hours: undefined,
        minutes: undefined,
      },
    },
  });

  const [selectedDate, selectedTime, tattooColor, tattooStyle] = watch([
    'date',
    'time',
    'tattoo.tattooColor',
    'tattoo.tattooStyle',
  ]);
  const canSubmit = selectedDate && selectedTime && isValid && !isSubmitting;

  const handleDateChange = (incomingDate: Date) => {
    const isAlreadySelected = moment(selectedDate).isSame(incomingDate, 'day');
    const newDate = isAlreadySelected ? null : incomingDate;
    setValue('date', newDate);
  };

  const handleTimeChange = (incomingDate: Date) => {
    const hours = incomingDate.getHours();
    const minutes = incomingDate.getMinutes();
    setValue('time.hours', hours);
    setValue('time.minutes', minutes);
  };

  const dateToShow = useMemo(() => {
    if (!selectedDate) return null;
    const dayOfWeek = moment(selectedDate).format('dddd');
    return `${dayOfWeek}, ${moment(selectedDate).format('LL')}`;
  }, [selectedDate]);

  const displayTime = useMemo(() => {
    const hasSelectedHours = typeof selectedTime.hours === 'number';
    const hasSelectedMinutes = typeof selectedTime.minutes === 'number';
    if (!hasSelectedHours || !hasSelectedMinutes) return null;
    const dateObj = new Date();
    dateObj.setHours(selectedTime.hours);
    dateObj.setMinutes(selectedTime.minutes);
    return moment(dateObj).format('LT');
  }, [selectedTime?.hours, selectedTime?.minutes]);

  const selectedTimeDateObj = useMemo(() => {
    const hasSelectedHours = typeof selectedTime.hours === 'number';
    const hasSelectedMinutes = typeof selectedTime.minutes === 'number';
    const dateObj = new Date();
    if (!hasSelectedHours || !hasSelectedMinutes) {
      dateObj.setHours(0);
      dateObj.setMinutes(0);
      return dateObj;
    }
    dateObj.setHours(selectedTime.hours);
    dateObj.setMinutes(selectedTime.minutes);
    return dateObj;
  }, [selectedTime?.hours, selectedTime?.minutes]);

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
                openPicker={openDatePicker}
                label="Date"
                placeholder="Select a date"
                value={dateToShow}
                containerStyle={{
                  paddingBottom: SPACING,
                }}
              />
              <FormModalInput
                openPicker={openTimePicker}
                label="Time"
                placeholder="Select a time"
                value={displayTime}
                containerStyle={{
                  paddingBottom: SPACING,
                }}
              />
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
      <Modal
        ref={dateModalRef}
        modalHeight={350}
        showDoneButton={!!selectedDate}
      >
        <CalendarPicker
          selectedDates={selectedDate}
          onDateSelected={handleDateChange}
        />
      </Modal>
      <Modal ref={timeModalRef} modalHeight={225} showDoneButton>
        {dateToShow && (
          <Text
            style={{
              textAlign: 'center',
            }}
          >
            {dateToShow}
          </Text>
        )}
        <DateTimePicker
          mode="time"
          display="spinner"
          textColor="#000"
          value={selectedTimeDateObj}
          onChange={(event, date) => {
            if (date) handleTimeChange(date);
          }}
        />
      </Modal>
    </>
  );
}
