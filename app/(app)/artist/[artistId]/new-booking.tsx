/**
 * This will almost (if not always) be used on the web
 * So this component/screen will be optimized for web
 */

import {
  View,
  Text,
  Platform,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import FormTextInput from '@components/inputs/FormTextInput';
import FormImageInput from '@components/inputs/FormImageInput';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useForm, useFormContext, FormProvider } from 'react-hook-form';
import { useLocalSearchParams } from 'expo-router';
import {
  CustomerCreateBookingInput,
  CustomerCreateBookingMutation,
  Booking,
} from '@graphql/types';
import WebSelect from '@web/components/WebSelect';
import { TimeOption } from '@utils/time';
import { CREATE_CUSTOMER_BOOKING } from '@graphql/mutations/booking';
import { GET_USER_BOOKINGS } from '@graphql/queries/booking';
import { useMutation } from '@apollo/client';
import Button from '@components/Button';
import NextButton from '@components/NextButton';
import Toast from 'react-native-toast-message';
import { toastConfig } from '@utils/toast';
import { useState, useMemo } from 'react';
import { tattooColorOptions, tattooStyleOptions } from '@const/input';
import { EvilIcons } from '@expo/vector-icons';
import { PHONE_REGEX, FULL_NAME_REGEX } from '@utils/regex';
import useSyncFormWithStorage from '@hooks/useSyncFormWithStorage';
import Success from '@components/Success';
import PhoneInput from '@components/inputs/PhoneInput';

export type PublicBookingFormValues = CustomerCreateBookingInput & {
  duration: number; // in hours
  startTime: TimeOption;
};

type FormSection = {
  onSubmit: () => void;
};

type HeaderProps = {
  currentStep: BookingFormStep;
  setCurrentStep: (step: BookingFormStep) => void;
};

enum BookingFormStep {
  PersonalInfo,
  TattooInfo,
  Success,
}

const isWeb = Platform.OS === 'web';

const INPUT_SPACING = 32;

const Header = ({ currentStep, setCurrentStep }: HeaderProps) => {
  const isFirstStep = currentStep === BookingFormStep.PersonalInfo;
  const isSuccessful = currentStep === BookingFormStep.Success;
  if (isFirstStep || isSuccessful) {
    return null;
  }
  // label of the button - should illustrate what the previous step is
  const backLabel = useMemo(() => {
    switch (currentStep) {
      case BookingFormStep.TattooInfo:
        return 'Contact Info';
      default:
        return '';
    }
  }, [currentStep]);

  const handleBackPress = () => {
    switch (currentStep) {
      case BookingFormStep.TattooInfo:
        setCurrentStep(BookingFormStep.PersonalInfo);
        break;
      default:
        break;
    }
  };

  return (
    <View
      style={{
        paddingBottom: 8,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
      }}
    >
      <Pressable
        onPress={handleBackPress}
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: 3,
        }}
      >
        <EvilIcons name="chevron-left" size={24} color="black" />
        <Text>{backLabel}</Text>
      </Pressable>
    </View>
  );
};

const PersonalInfo = ({ onSubmit }: FormSection) => {
  const { control, watch, setValue } =
    useFormContext<PublicBookingFormValues>();
  const [phone, name] = watch(['phone', 'name']);

  const isValidPhone = useMemo(() => {
    const fmtPhone = phone.replace(/\D/g, '');
    const isPhoneValid = PHONE_REGEX.test(fmtPhone);
    return isPhoneValid;
  }, [phone]);

  const isValidName = useMemo(() => {
    const isNameValid = FULL_NAME_REGEX.test(name);
    return isNameValid;
  }, [name]);

  const canContinue = isValidPhone && isValidName;

  return (
    <>
      <Text
        style={{
          fontSize: 31,
          fontWeight: 'bold',
          paddingBottom: 18,
        }}
      >
        Personal Info
      </Text>
      <FormTextInput
        control={control}
        name="name"
        label="Name"
        placeholder="Jane Doe"
        containerStyle={{
          paddingBottom: INPUT_SPACING - (isWeb ? 10 : 0),
        }}
        rules={{
          required: 'Name is required',
          pattern: {
            value: FULL_NAME_REGEX,
            message: 'Please enter your first and last name',
          },
        }}
      />
      <View
        style={{
          paddingBottom: INPUT_SPACING - (isWeb ? 10 : 0),
        }}
      >
        <PhoneInput
          label="Your Phone"
          value={phone}
          onChange={(val) => setValue('phone', val)}
        />
      </View>
      <View
        style={{
          paddingTop: 5,
        }}
      >
        <NextButton
          disabled={!canContinue}
          onPress={onSubmit}
          label="Tattoo Info"
        />
      </View>
    </>
  );
};

const TattooInfo = ({ onSubmit }: FormSection) => {
  const {
    control,
    formState: { isValid, isSubmitting },
  } = useFormContext<PublicBookingFormValues>();

  if (isSubmitting) {
    return (
      <View
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          paddingTop: 20,
        }}
      >
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <>
      <Text
        style={{
          fontSize: 31,
          fontWeight: 'bold',
          paddingBottom: 18,
        }}
      >
        Tattoo Info
      </Text>
      <FormTextInput
        control={control}
        name="tattoo.description"
        label="Description"
        placeholder="owl, snake and dagger, clock, etc."
        multiline
        containerStyle={{
          paddingBottom: INPUT_SPACING - (isWeb ? 10 : 0),
        }}
        rules={{
          required: 'Tattoo description is required',
        }}
      />
      <FormTextInput
        control={control}
        name="tattoo.placement"
        label="Placement"
        placeholder="upper right arm, left calf, etc."
        multiline
        containerStyle={{
          paddingBottom: INPUT_SPACING - (isWeb ? 10 : 0),
        }}
        rules={{
          required: 'Tattoo placement is required',
        }}
      />
      <WebSelect
        label="Color or Black & Gray"
        buttonLabel="select color"
        options={tattooColorOptions}
        name="tattoo.color"
        control={control}
        containerStyle={{
          paddingBottom: INPUT_SPACING - (isWeb ? 10 : 0),
        }}
      />
      <WebSelect
        buttonLabel="select style"
        label="Tattoo Style"
        name="tattoo.style"
        options={tattooStyleOptions}
        control={control}
        containerStyle={{
          paddingBottom: INPUT_SPACING - (isWeb ? 10 : 0),
        }}
      />
      <View
        style={{
          paddingBottom: INPUT_SPACING,
        }}
      >
        <FormImageInput
          label="Reference Images"
          control={control}
          name="tattoo.imagePaths"
        />
      </View>
      <View
        style={{
          paddingTop: 5,
        }}
      >
        <Button disabled={!isValid} label="Submit" onPress={onSubmit} />
      </View>
    </>
  );
};

const FORM_CACHE_KEY = 'public-booking-form';

export default function PublicArtistBookingForm() {
  const { artistId } = useLocalSearchParams();
  const [successfullBooking, setSuccessfullBooking] = useState<Booking>();
  const [currentFormStep, setCurrentFormStep] = useState<BookingFormStep>(
    BookingFormStep.PersonalInfo,
  );
  const [createBooking] = useMutation<CustomerCreateBookingMutation>(
    CREATE_CUSTOMER_BOOKING,
    {
      refetchQueries: [GET_USER_BOOKINGS],
    },
  );
  const form = useForm<PublicBookingFormValues>({
    defaultValues: {
      phone: '',
      name: '',
      tattoo: {
        description: '',
        placement: '',
        imagePaths: [],
      },
    },
  });
  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
    watch,
  } = form;
  // sync form with storage - cache the form values
  const { clearStorage, isInitialized } = useSyncFormWithStorage(
    FORM_CACHE_KEY,
    watch,
    reset,
  );

  const submitTattooForm = async (data: PublicBookingFormValues) => {
    try {
      const booking = await createBooking({
        variables: {
          input: {
            ...data,
            phone: data.phone.replace(/\D/g, ''),
            artistId,
          },
        },
      });
      setSuccessfullBooking(booking.data?.customerCreateBooking?.booking);
      setCurrentFormStep(BookingFormStep.Success);
      // reset form values
      reset();
      clearStorage();
    } catch (err: any) {
      Toast.show({
        type: 'error',
        text1: 'Error submitting booking',
        text2: err?.message || 'Something went wrong',
      });
    }
  };

  const renderForm = useMemo(() => {
    switch (currentFormStep) {
      case BookingFormStep.PersonalInfo:
        return (
          <PersonalInfo
            onSubmit={() => setCurrentFormStep(BookingFormStep.TattooInfo)}
          />
        );
      case BookingFormStep.TattooInfo:
        return <TattooInfo onSubmit={handleSubmit(submitTattooForm)} />;
      case BookingFormStep.Success:
        return successfullBooking ? (
          <Success
            title={`Your submission to ${successfullBooking?.artist?.name} has been submitted successfully`}
            subTitle={` You will receive a confirmation text to ${successfullBooking?.customer?.phone}`}
          />
        ) : null;
      default:
        return null;
    }
  }, [currentFormStep]);

  if (!isInitialized) return null;

  return (
    <FormProvider {...form}>
      <View>
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {!isSubmitting && (
            <Header
              currentStep={currentFormStep}
              setCurrentStep={setCurrentFormStep}
            />
          )}
          {renderForm}
        </KeyboardAwareScrollView>
      </View>
      <Toast config={toastConfig} topOffset={isWeb ? 16 : 55} />
    </FormProvider>
  );
}
