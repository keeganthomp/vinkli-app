/**
 * This will almost (if not always) be used on the web
 * So this component/screen will be optimized for web
 */

import { View, Text, Platform, Pressable } from 'react-native';
import FormTextInput from '@components/inputs/FormTextInput';
import FormImageInput from '@components/inputs/FormImageInput';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useForm, useFormContext, FormProvider } from 'react-hook-form';
import { router, useLocalSearchParams } from 'expo-router';
import {
  TattooColor,
  TattooStyle,
  CustomerCreateBookingInput,
  CustomerCreateBookingMutation,
} from '@graphql/types';
import WebSelect from '@components/inputs/WebSelect';
import { TimeOption } from '@utils/time';
import { CREATE_CUSTOMER_BOOKING } from '@graphql/mutations/booking';
import { useMutation } from '@apollo/client';
import Button from '@components/Button';
import NextButton from '@components/NextButton';
import Toast from 'react-native-toast-message';
import { toastConfig } from '@utils/toast';
import { useState, useMemo } from 'react';
import { tattooColorOptions, tattooStyleOptions } from '@const/input';
import { EvilIcons } from '@expo/vector-icons';
import { EMAIL_REGEX } from '@utils/regex';

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
  ContactInfo,
  TattooInfo,
}

const isWeb = Platform.OS === 'web';

const INPUT_SPACING = 32;

const Header = ({ currentStep, setCurrentStep }: HeaderProps) => {
  const isFirstStep = currentStep === BookingFormStep.ContactInfo;
  if (isFirstStep) {
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
        setCurrentStep(BookingFormStep.ContactInfo);
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

const ContactInfo = ({ onSubmit }: FormSection) => {
  const { control, watch } = useFormContext<PublicBookingFormValues>();

  const email = watch('customerEmail');

  const isValidEmail = useMemo(() => {
    const isEmailValid = EMAIL_REGEX.test(email);
    return isEmailValid;
  }, [email]);

  return (
    <>
      <Text
        style={{
          fontSize: 31,
          fontWeight: 'bold',
          paddingBottom: 18,
        }}
      >
        Contact Info
      </Text>
      <FormTextInput
        control={control}
        name="customerEmail"
        label="Email"
        placeholder="janedoe@gmail.com"
        containerStyle={{
          paddingBottom: INPUT_SPACING - (isWeb ? 10 : 0),
        }}
        rules={{
          required: 'Email is required',
          pattern: {
            value: EMAIL_REGEX,
            message: 'Please enter valid email',
          },
        }}
      />
      <View
        style={{
          paddingTop: 5,
        }}
      >
        <NextButton
          disabled={!isValidEmail}
          onPress={onSubmit}
          label="Tattoo Info"
        />
      </View>
    </>
  );
};

const TattooInfo = ({ onSubmit }: FormSection) => {
  const { control, setValue, watch, formState: { isValid } } =
    useFormContext<PublicBookingFormValues>();

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

export default function PublicArtistBookingForm() {
  const { artistId } = useLocalSearchParams();
  const [currentFormStep, setCurrentFormStep] = useState<BookingFormStep>(
    BookingFormStep.ContactInfo,
  );
  const [createBooking] = useMutation<CustomerCreateBookingMutation>(
    CREATE_CUSTOMER_BOOKING,
  );
  const form = useForm<PublicBookingFormValues>({
    defaultValues: {
      artistId: artistId as string,
      customerEmail: '',
      tattoo: {},
    },
  });

  const {
    handleSubmit,
    formState: { isValid, isSubmitting },
  } = form;

  const canSubmit = isValid;

  const submitTattooForm = async (data: PublicBookingFormValues) => {
    try {
      await createBooking({
        variables: {
          input: data,
        },
      });
      // router.push('/artist/booking/create/dateAndTime');
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
      case BookingFormStep.ContactInfo:
        return (
          <ContactInfo
            onSubmit={() => setCurrentFormStep(BookingFormStep.TattooInfo)}
          />
        );
      case BookingFormStep.TattooInfo:
        return <TattooInfo onSubmit={handleSubmit(submitTattooForm)} />;
      default:
        return null;
    }
  }, [currentFormStep]);

  return (
    <FormProvider {...form}>
      <View
        style={{
          flex: 1,
        }}
      >
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <Header
            currentStep={currentFormStep}
            setCurrentStep={setCurrentFormStep}
          />
          {renderForm}
        </KeyboardAwareScrollView>
      </View>
      <Toast config={toastConfig} topOffset={isWeb ? 16 : 55} />
    </FormProvider>
  );
}
