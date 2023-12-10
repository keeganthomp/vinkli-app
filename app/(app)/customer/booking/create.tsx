import { View, ActivityIndicator, Text, Pressable } from 'react-native';
import {
  CustomerCreateBookingInput,
  CustomerCreateBookingMutation,
} from '@graphql/types';
import { CREATE_CUSTOMER_BOOKING } from '@graphql/mutations/booking';
import { useMutation } from '@apollo/client';
import { router } from 'expo-router';
import { useForm } from 'react-hook-form';
import FormTextInput from '@components/inputs/FormTextInput';
import FormSelectInput from '@components/inputs/FormModalInput';
import FormImageInput from '@components/inputs/FormImageInput';
import { useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
import Button from '@components/Button';
import { tattooColorOptions, tattooStyleOptions } from '@const/input';
import theme from '@theme';

export default function CustomerBookingCreate() {
  const [error, setError] = useState<string | null>(null);
  const [createBooking] = useMutation<CustomerCreateBookingMutation>(
    CREATE_CUSTOMER_BOOKING,
  );
  const {
    control,
    handleSubmit,
    formState: { isValid, isSubmitting },
  } = useForm<CustomerCreateBookingInput>({
    defaultValues: {
      title: '',
      description: '',
      tattooColor: tattooColorOptions[0].value,
      tattooStyle: tattooStyleOptions[0].value,
      imagePaths: [],
    },
  });

  const handleCreateBooking = async (data: CustomerCreateBookingInput) => {
    const { date: selectedDate, ...bookingFormValues } = data;
    try {
      const createFormInput = {
        ...bookingFormValues,
        date: selectedDate ? new Date(selectedDate).getTime() : undefined,
      };
      const { data: newBookingData } = await createBooking({
        variables: {
          input: createFormInput,
        },
      });
      const newBooking = newBookingData?.customerCreateBooking;
      router.replace(`/customer/booking/${newBooking?.id}`);
    } catch (error) {
      console.log('Error creating booking:', error);
      // flash error
      setError('Unable to create booking');
      setTimeout(() => {
        setError(null);
      }, 5000);
    }
  };

  const SPACING = 26;

  if (isSubmitting) {
    return (
      <View
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 20,
      }}
    >
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-end',
          paddingTop: 16,
        }}
      >
        <Pressable onPress={router.back}>
          <AntDesign name="closecircle" size={24} color="#999999" />
        </Pressable>
      </View>
      {error && (
        <Text
          style={{
            textAlign: 'center',
            color: theme.error,
            paddingVertical: 5,
          }}
        >
          {error}
        </Text>
      )}
      {/* Form */}
      <View>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 24,
            textAlign: 'center',
            paddingBottom: 14,
          }}
        >
          Create Booking
        </Text>
        <View
          style={{
            paddingBottom: SPACING,
          }}
        >
          <FormTextInput
            control={control}
            name="title"
            label="Title"
            placeholder="Title"
            rules={{
              required: 'Title is required',
            }}
          />
        </View>
        <View
          style={{
            paddingBottom: SPACING,
          }}
        >
          <FormTextInput
            control={control}
            name="description"
            label="Description"
            placeholder="Description"
            multiline
          />
        </View>
        <View
          style={{
            paddingBottom: SPACING,
          }}
        >
          <FormSelectInput
            control={control}
            name="tattooColor"
            label="Black & Gray or Color"
            items={tattooColorOptions}
          />
        </View>
        <View
          style={{
            paddingBottom: SPACING,
          }}
        >
          <FormSelectInput
            control={control}
            name="tattooStyle"
            label="Style"
            items={tattooStyleOptions.sort((a, b) =>
              a.label.localeCompare(b.label),
            )}
          />
        </View>
        <View
          style={{
            paddingBottom: SPACING,
          }}
        >
          <FormImageInput
            label="Reference Images"
            control={control}
            name="imagePaths"
            required
          />
        </View>
      </View>
      <Button
        onPress={handleSubmit(handleCreateBooking)}
        label="Create Booking"
        disabled={!isValid}
      />
    </View>
  );
}
