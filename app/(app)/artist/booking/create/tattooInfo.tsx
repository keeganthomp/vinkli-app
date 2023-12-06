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

  const [tattooColor, tattooStyle, startDate] = watch([
    'tattoo.tattooColor',
    'tattoo.tattooStyle',
    'startDate',
  ]);

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
      startDate: selectedDate,
      startTime: time,
      duration,
      ...bookingFormValues
    } = data;
    try {
      Keyboard.dismiss();
      const startDateObj = new Date(startDate);
      startDateObj.setHours(time.hours);
      startDateObj.setMinutes(time.minutes);
      const durationInMilliseconds = (duration || 0) * 60 * 60 * 1000; // convert duration from hours to milliseconds
      const endDateObj = new Date(
        startDateObj.getTime() + durationInMilliseconds,
      ); // add duration to selectedDateObj
      const createFormInput = {
        ...bookingFormValues,
        startDate: startDate ? startDateObj.getTime() : undefined,
        endDate: endDateObj ? endDateObj.getTime() : undefined,
      };
      const { data: newBookingData } = await createBooking({
        variables: {
          input: createFormInput,
        },
      });
      const newBooking = newBookingData?.artistCreateBooking;
      router.replace(`/artist/booking/${newBooking?.id}`);
      Toast.show({
        type: 'success',
        text1: 'Created new booking!',
        text2: `You can see your new booking here`,
      });
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: 'Error creating booking',
        text2: error.message,
      });
    }
  };

  const SPACING = 22;

  return (
    <>
      <View
        style={{
          flex: 1,
        }}
      >
        {isSubmitting ? (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <ActivityIndicator size="small" />
          </View>
        ) : (
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
              value={tattooColorMap[tattooColor as keyof typeof tattooColorMap]}
              containerStyle={{
                paddingBottom: SPACING,
              }}
            />
            <FormModalInput
              openPicker={openTattooStylePicker}
              placeholder="Select the style of tattoo"
              label="Tattoo Style"
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
                borderRadius: 4,
                height: 36,
              }}
            />
          </KeyboardAwareScrollView>
        )}
      </View>
      {/* Modals */}
      <PickerModal
        ref={tattooColorModalRef}
        control={control as any}
        name="tattoo.tattooColor"
        options={tattooColorOptions}
      />
      <PickerModal
        ref={tattooStyleModalRef}
        control={control as any}
        name="tattoo.tattooStyle"
        options={tattooStyleOptions}
      />
    </>
  );
}
