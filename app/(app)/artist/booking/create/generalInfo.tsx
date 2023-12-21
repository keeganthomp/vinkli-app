import { View, Text, Keyboard } from 'react-native';
import { router } from 'expo-router';
import { useFormContext } from 'react-hook-form';
import FormTextInput from '@components/inputs/FormTextInput';
import NextButton from '@components/NextButton';
import { ArtistBookingFromValues } from './_layout';
import FormModalInput from '@components/inputs/FormModalInput';
import { Platform } from 'react-native';
import { bookingTypeMap } from '@const/maps';
import { SheetManager } from 'react-native-actions-sheet';
import sheetIds from '@const/sheets';
import { BookingType } from '@graphql/types';
import WebSelect from '@components/inputs/WebSelect';
import { PickerOption } from '@components/sheets/PickerSheet';

const bookingTypeOptions: PickerOption<string>[] = Object.entries(
  bookingTypeMap,
).map(([key, value]) => ({ label: value, value: key }));

const isWeb = Platform.OS === 'web';

const ArtistBookingGeneral = () => {
  const { control, watch, setValue } =
    useFormContext<ArtistBookingFromValues>();

  const [email, bookingType] = watch(['customerEmail', 'type']);

  const canGoNext = !!email && !!bookingType;

  const setBookingType = (type: BookingType) => {
    setValue('type', type);
  };

  const goToTattooInfo = () => {
    Keyboard.dismiss();
    router.push('/artist/booking/create/tattooInfo');
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
        <FormTextInput
          control={control}
          autoCapitalize="none"
          name="customerEmail"
          label="Customer Email"
          placeholder="jane@email.com"
          inputMode="email"
          enterKeyHint="done"
          rules={{
            required: 'Customer Email is required',
          }}
          containerStyle={{
            paddingBottom: 20,
          }}
        />
        {isWeb ? (
          <WebSelect
            buttonLabel="select type"
            label="Appointment Type"
            options={bookingTypeOptions}
            control={control}
            onSelect={(val) => setValue('type', val as BookingType)}
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
