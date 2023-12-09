import { View, Keyboard, ActivityIndicator, Text } from 'react-native';
import FormTextInput from '@components/inputs/FormTextInput';
import FormImageInput from '@components/inputs/FormImageInput';
import { tattooColorMap, tattooStyleMap } from '@const/maps';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useCallback, useRef } from 'react';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import FormModalInput from '@components/inputs/FormModalInput';
import PickerModal from '@components/modals/PickerModal';
import { useFormContext } from 'react-hook-form';
import Button from '@components/Button';
import { ArtistCreateBookingMutation } from '@graphql/types';
import { CREATE_ARTIST_BOOKING } from '@graphql/mutations/booking';
import { useMutation } from '@apollo/client';
import Toast from 'react-native-toast-message';
import { router } from 'expo-router';
import { BOOKING_FRAGMENT } from '@graphql/fragments/booking';
import { ArtistBookingFromValues } from './_layout';

const tattooStyleOptions = Object.entries(tattooStyleMap).map(
  ([key, value]) => ({ label: value, value: key }),
);
const tattooColorOptions = Object.entries(tattooColorMap).map(
  ([key, value]) => ({ label: value, value: key }),
);
export default function ArtistBookingTattooInfo() {
  const {
    control,
    watch,
    handleSubmit,
    formState: { isValid, isSubmitting },
  } = useFormContext<ArtistBookingFromValues>();
  const tattooColorModalRef = useRef<BottomSheetModal>(null);
  const tattooStyleModalRef = useRef<BottomSheetModal>(null);

  const [tattooColor, tattooStyle] = watch(['tattoo.color', 'tattoo.style']);

  const openTattooColorPicker = useCallback(() => {
    tattooColorModalRef.current?.present();
    Keyboard.dismiss();
  }, []);

  const openTattooStylePicker = useCallback(() => {
    tattooStyleModalRef.current?.present();
    Keyboard.dismiss();
  }, []);

  const [createBooking] = useMutation<ArtistCreateBookingMutation>(
    CREATE_ARTIST_BOOKING,
    {
      update(cache, { data }) {
        const newBooking = data?.artistCreateBooking;
        cache.modify({
          fields: {
            artistBookings(existingBookings = []) {
              const newBookingRef = cache.writeFragment({
                data: newBooking,
                fragment: BOOKING_FRAGMENT,
              });
              return [newBookingRef, ...existingBookings];
            },
          },
        });
      },
    },
  );

  const handleCreateBooking = async (data: ArtistBookingFromValues) => {
    const {
      startDate: selectedStartDate,
      startTime,
      duration,
      ...bookingFormValues
    } = data;
    try {
      Keyboard.dismiss();
      const startDateObj = new Date(selectedStartDate);
      // get start date in iso string
      const startDateIsoString = startDateObj.toISOString();
      // trim off the time from the date iso string
      const startDateString = startDateIsoString.split('T')[0];
      // concat the start date string with the start time string
      const finalizedStartDate = `${startDateString}T${startTime.value}`;
      // convert finalized start date to milliseconds
      const startDateToSubmit = new Date(finalizedStartDate).getTime();
      // get end date by adding duration to start date
      // convert duration from hours to milliseconds
      const durationInMilliseconds = (duration || 0) * 60 * 60 * 1000;
      // add duration to start date
      const endDateToSubmit = new Date(
        startDateObj.getTime() + durationInMilliseconds,
      );
      const createFormInput = {
        ...bookingFormValues,
        startDate: selectedStartDate ? startDateToSubmit : undefined,
        endDate: duration ? endDateToSubmit : undefined,
      };
      const { data: newBookingData } = await createBooking({
        variables: {
          input: createFormInput,
        },
      });
      const newBooking = newBookingData?.artistCreateBooking;
      router.replace(`/artist/booking/${newBooking?.id}`);
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: 'Error creating booking',
        text2: error.message,
      });
    }
  };

  const SPACING = 22;

  if (isSubmitting) {
    <View
      style={{
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <ActivityIndicator />
    </View>;
  }

  return (
    <>
      <View
        style={{
          flex: 1,
        }}
      >
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          extraScrollHeight={75}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{
            paddingBottom: 40,
          }}
        >
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
              paddingBottom: SPACING,
            }}
          />
          <FormTextInput
            control={control}
            name="tattoo.placement"
            label="Placement"
            placeholder="upper right arm, left calf, etc."
            multiline
            containerStyle={{
              paddingBottom: SPACING,
            }}
          />
          <FormModalInput
            openPicker={openTattooColorPicker}
            label="Color"
            placeholder="color/black/grey"
            value={tattooColorMap[tattooColor as keyof typeof tattooColorMap]}
            containerStyle={{
              paddingBottom: SPACING,
            }}
          />
          <FormModalInput
            openPicker={openTattooStylePicker}
            label="Style"
            placeholder="select style"
            value={tattooStyleMap[tattooStyle as keyof typeof tattooStyleMap]}
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
          <Button
            label="Create Booking"
            disabled={!isValid || isSubmitting}
            onPress={handleSubmit(handleCreateBooking)}
            style={{
              marginTop: 5,
              borderRadius: 4,
              height: 38,
            }}
          />
        </KeyboardAwareScrollView>
      </View>
      {/* Modals */}
      <PickerModal
        ref={tattooColorModalRef}
        control={control as any}
        name="tattoo.color"
        options={tattooColorOptions}
      />
      <PickerModal
        ref={tattooStyleModalRef}
        control={control as any}
        name="tattoo.style"
        options={tattooStyleOptions}
      />
    </>
  );
}
