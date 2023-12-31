import { View, Text, Keyboard } from 'react-native';
import { router } from 'expo-router';
import { useFormContext } from 'react-hook-form';
import NextButton from '@components/NextButton';
import { ArtistBookingFromValues } from './_layout';
import FormModalInput from '@components/inputs/FormModalInput';
import { Platform } from 'react-native';
import { bookingTypeMap } from '@const/maps';
import { SheetManager } from 'react-native-actions-sheet';
import sheetIds from '@const/sheets';
import { BookingType } from '@graphql/types';
import WebSelect from '@web/components/WebSelect';
import { PickerOption } from '@components/sheets/PickerSheet';
import { PHONE_REGEX } from '@utils/regex';
import { useMemo } from 'react';
import PhoneInput from '@components/inputs/PhoneInput';

const bookingTypeOptions: PickerOption<string>[] = Object.entries(
  bookingTypeMap,
).map(([key, value]) => ({ label: value, value: key }));

const isWeb = Platform.OS === 'web';

const ArtistBookingGeneral = () => {
  const { control, watch, setValue } =
    useFormContext<ArtistBookingFromValues>();

  const [phone, bookingType] = watch(['phone', 'type']);

  const isValidPhone = useMemo(() => {
    const fmtPhone = phone.replace(/\D/g, '');
    const isPhoneValid = PHONE_REGEX.test(fmtPhone);
    return isPhoneValid;
  }, [phone]);

  const canGoNext = isValidPhone && !!bookingType;

  const setBookingType = (type: BookingType) => {
    setValue('type', type);
  };

  const goToTattooInfo = () => {
    Keyboard.dismiss();
    router.push('/(app)/booking/create/tattooInfo');
  };

  const openAppointmentTypePicker = () => {
    Keyboard.dismiss();
    SheetManager.show(sheetIds.appointmentTypeSelect, {
      payload: {
        setBookingType,
        value: bookingType,
      },
    });
  };

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
          {`Customer &\nAppointment Type`}
        </Text>
        <View
          style={{
            paddingBottom: 12,
          }}
        >
          <PhoneInput
            label="Customer Phone"
            value={phone}
            onChange={(val) => setValue('phone', val)}
          />
        </View>
        {isWeb ? (
          <WebSelect
            label="Appointment Type"
            buttonLabel="select type"
            options={bookingTypeOptions}
            name="type"
            control={control}
            containerStyle={{
              paddingBottom: 20,
            }}
          />
        ) : (
          <FormModalInput
            openPicker={openAppointmentTypePicker}
            placeholder="Select appointment type"
            label="Appointment Type"
            value={bookingTypeMap[bookingType as keyof typeof bookingTypeMap]}
            containerStyle={{
              paddingBottom: 20,
            }}
          />
        )}
        <NextButton
          label="Tattoo info"
          onPress={goToTattooInfo}
          disabled={!canGoNext}
        />
      </View>
    </>
  );
};

export default ArtistBookingGeneral;
