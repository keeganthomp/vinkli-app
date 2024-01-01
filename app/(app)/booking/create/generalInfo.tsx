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
import { BookingType, ExistingCustomerQuery } from '@graphql/types';
import WebSelect from '@web/components/WebSelect';
import { PickerOption } from '@components/sheets/PickerSheet';
import { PHONE_REGEX } from '@utils/regex';
import { useMemo, useEffect } from 'react';
import PhoneInput from '@components/inputs/PhoneInput';
import { useLazyQuery } from '@apollo/client';
import { GET_EXISTING_CUSTOMER } from '@graphql/queries/user';
import debounce from 'lodash.debounce';
import FormTextInput from '@components/inputs/FormTextInput';

const bookingTypeOptions: PickerOption<string>[] = Object.entries(
  bookingTypeMap,
).map(([key, value]) => ({ label: value, value: key }));

const isWeb = Platform.OS === 'web';

const SPACING = 24;

const ArtistBookingGeneral = () => {
  const [fetchExistingCustomer] = useLazyQuery<ExistingCustomerQuery>(
    GET_EXISTING_CUSTOMER,
    {
      fetchPolicy: 'cache-and-network',
    },
  );
  const { control, watch, setValue } =
    useFormContext<ArtistBookingFromValues>();

  const [phone, bookingType, customerName] = watch([
    'phone',
    'type',
    'customerName',
  ]);

  const isValidPhone = useMemo(() => {
    const fmtPhone = phone.replace(/\D/g, '');
    const isPhoneValid = PHONE_REGEX.test(fmtPhone);
    return isPhoneValid;
  }, [phone]);

  // Debounce checkIfCustomerExists function
  const debouncedCustomerFetch = useMemo(
    () => debounce(fetchExistingCustomer, 700),
    [],
  );

  // Call debounced function whenever phone changes
  useEffect(() => {
    const fmtPhone = phone.replace(/\D/g, '');
    const isPhoneValid = PHONE_REGEX.test(fmtPhone);
    if (isPhoneValid) {
      fetchExistingCustomer({
        variables: {
          phone: fmtPhone,
        },
      })
        .then((res) => {
          const customer = res?.data?.existingCustomer;
          if (customer) {
            setValue('customerName', customer.name);
          }
        })
        .catch((err) => {
          console.log('Error checking for existing customer', err);
        });
    }
  }, [phone]);

  const canGoNext = isValidPhone && !!customerName && !!bookingType;

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
            paddingBottom: SPACING,
          }}
        >
          <PhoneInput
            label="Customer Phone"
            value={phone}
            onChange={(val) => setValue('phone', val)}
          />
        </View>
        <FormTextInput
          label="Customer Name"
          placeholder="Jane Doe"
          control={control}
          name="customerName"
          containerStyle={{
            paddingBottom: SPACING,
          }}
        />
        {isWeb ? (
          <WebSelect
            label="Appointment Type"
            buttonLabel="select type"
            options={bookingTypeOptions}
            name="type"
            control={control}
            containerStyle={{
              paddingBottom: SPACING,
            }}
          />
        ) : (
          <FormModalInput
            openPicker={openAppointmentTypePicker}
            placeholder="Select appointment type"
            label="Appointment Type"
            value={bookingTypeMap[bookingType as keyof typeof bookingTypeMap]}
            containerStyle={{
              paddingBottom: SPACING,
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
