import { View, Text, Keyboard } from 'react-native';
import { router } from 'expo-router';
import { useFormContext } from 'react-hook-form';
import FormTextInput from '@components/inputs/FormTextInput';
import NextButton from '@components/NextButton';
import { ArtistBookingFromValues } from './_layout';

const ArtistBookingCustomerInfo = () => {
  const { control, watch } = useFormContext<ArtistBookingFromValues>();
  const goToAppointmentInfo = () => {
    Keyboard.dismiss();
    router.push('/artist/booking/create/appointmentInfo');
  };
  const email = watch('customerEmail');
  return (
    <View>
      <Text
        style={{
          fontSize: 31,
          fontWeight: 'bold',
          paddingBottom: 18,
        }}
      >
        Customer Info
      </Text>
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
      />
      <NextButton
        label="Appointment Info"
        onPress={goToAppointmentInfo}
        disabled={!email}
      />
    </View>
  );
};

export default ArtistBookingCustomerInfo;
