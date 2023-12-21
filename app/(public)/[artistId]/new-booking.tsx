import { View, Keyboard, Text, Platform } from 'react-native';
import FormTextInput from '@components/inputs/FormTextInput';
import FormImageInput from '@components/inputs/FormImageInput';
import { tattooColorMap, tattooStyleMap } from '@const/maps';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useCallback } from 'react';
import FormModalInput from '@components/inputs/FormModalInput';
import { useForm } from 'react-hook-form';
import { router, useLocalSearchParams } from 'expo-router';
import { SheetManager } from 'react-native-actions-sheet';
import sheetIds from '@const/sheets';
import {
  TattooColor,
  TattooStyle,
  CustomerCreateBookingInput,
  CustomerCreateBookingMutation,
} from '@graphql/types';
import WebDropdown from '@components/inputs/WebDropdown';
import { TimeOption } from '@utils/time';
import { CREATE_CUSTOMER_BOOKING } from '@graphql/mutations/booking';
import { useMutation } from '@apollo/client';
import Button from '@components/Button';
import Toast from 'react-native-toast-message';
import { toastConfig } from '@utils/toast';

export type PublicBookingFormValues = CustomerCreateBookingInput & {
  duration: number; // in hours
  startTime: TimeOption;
};

const isWeb = Platform.OS === 'web';

const tattooColorOptions = Object.entries(tattooColorMap).map(
  ([key, value]) => ({ label: value, value: key }),
);
const tattooStyleOptions = Object.entries(tattooStyleMap).map(
  ([key, value]) => ({ label: value, value: key }),
);

export default function ArtistBookingTattooInfo() {
  const { artistId } = useLocalSearchParams();
  const [createBooking] = useMutation<CustomerCreateBookingMutation>(
    CREATE_CUSTOMER_BOOKING,
  );
  const {
    control,
    watch,
    setValue,
    handleSubmit,
    formState: { isValid, isSubmitting },
  } = useForm<PublicBookingFormValues>({
    defaultValues: {
      artistId: artistId as string,
      customerEmail: '',
      tattoo: {},
    },
  });

  const [tattooDescription, tattooPlacement, tattooColor, tattooStyle] = watch([
    'tattoo.description',
    'tattoo.placement',
    'tattoo.color',
    'tattoo.style',
  ]);

  const setTattooColor = (selectedColor: TattooColor) => {
    setValue('tattoo.color', selectedColor);
  };
  const setTattooStyle = (selectedStyle: TattooStyle) => {
    setValue('tattoo.style', selectedStyle);
  };

  const canSubmit = isValid;

  const openTattooColorPicker = useCallback(() => {
    Keyboard.dismiss();
    SheetManager.show(sheetIds.tattooColorSelect, {
      payload: {
        setTattooColor,
        value: tattooColor,
      },
    });
  }, []);

  const openTattooStylePicker = useCallback(() => {
    Keyboard.dismiss();
    SheetManager.show(sheetIds.tattooStyleSelect, {
      payload: {
        setTattooStyle,
        value: tattooStyle,
      },
    });
  }, []);

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

  const SPACING = 22;

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
            Contact Info
          </Text>
          <FormTextInput
            control={control}
            name="customerEmail"
            label="Email"
            placeholder="janedoe@gmail.com"
            multiline
            containerStyle={{
              paddingBottom: SPACING - (isWeb ? 10 : 0),
            }}
            rules={{
              required: 'Email is required',
            }}
          />
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
              paddingBottom: SPACING - (isWeb ? 10 : 0),
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
              paddingBottom: SPACING - (isWeb ? 10 : 0),
            }}
            rules={{
              required: 'Tattoo placement is required',
            }}
          />
          {isWeb ? (
            <WebDropdown
              buttonLabel="color or black/grey"
              label="Color/Black/Grey"
              options={tattooColorOptions}
              value={tattooColor}
              onSelect={(val) => setValue('tattoo.color', val as TattooColor)}
            />
          ) : (
            <FormModalInput
              openPicker={openTattooColorPicker}
              label="Color"
              placeholder="color/black/grey"
              value={tattooColorMap[tattooColor as keyof typeof tattooColorMap]}
              containerStyle={{
                paddingBottom: SPACING,
              }}
            />
          )}
          {isWeb ? (
            <WebDropdown
              buttonLabel="tattoo style"
              label="Tattoo Style"
              options={tattooStyleOptions}
              value={tattooStyle}
              onSelect={(val) => setValue('tattoo.style', val as TattooStyle)}
            />
          ) : (
            <FormModalInput
              openPicker={openTattooStylePicker}
              label="Style"
              placeholder="select style"
              value={tattooStyleMap[tattooStyle as keyof typeof tattooStyleMap]}
              containerStyle={{
                paddingBottom: SPACING,
              }}
            />
          )}
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
            label="Submit"
            disabled={!canSubmit}
            onPress={handleSubmit(submitTattooForm)}
          />
        </KeyboardAwareScrollView>
      </View>
      <Toast config={toastConfig} topOffset={isWeb ? 16 : 55} />
    </>
  );
}
