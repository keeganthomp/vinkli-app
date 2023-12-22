import { View, Keyboard, Text, Platform } from 'react-native';
import FormTextInput from '@components/inputs/FormTextInput';
import FormImageInput from '@components/inputs/FormImageInput';
import { tattooColorMap, tattooStyleMap } from '@const/maps';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useCallback } from 'react';
import FormModalInput from '@components/inputs/FormModalInput';
import { useFormContext } from 'react-hook-form';
import NextButton from '@components/NextButton';
import { ArtistBookingFromValues } from './_layout';
import { router } from 'expo-router';
import { SheetManager } from 'react-native-actions-sheet';
import sheetIds from '@const/sheets';
import { TattooColor, TattooStyle } from '@graphql/types';
import WebSelect from '@web/components/WebSelect';
import { tattooColorOptions, tattooStyleOptions } from '@const/input';

const isWeb = Platform.OS === 'web';

export default function ArtistBookingTattooInfo() {
  const { control, watch, setValue } =
    useFormContext<ArtistBookingFromValues>();

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

  const canGoNext = tattooDescription && tattooPlacement;

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

  const goToAppointmentDate = () => {
    Keyboard.dismiss();
    router.push('/artist/booking/create/dateAndTime');
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
            Tattoo
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
          />
          {isWeb ? (
            <WebSelect
              label="Color or Black & Gray"
              buttonLabel="select color"
              options={tattooColorOptions}
              control={control}
              name="tattoo.color"
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
            <WebSelect
              label="Tattoo Style"
              buttonLabel="select style"
              options={tattooStyleOptions}
              control={control}
              name="tattoo.style"
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
          <NextButton
            label="Date & Time"
            disabled={!canGoNext}
            onPress={goToAppointmentDate}
            style={{
              marginTop: 5,
              borderRadius: 4,
              height: 38,
            }}
          />
        </KeyboardAwareScrollView>
      </View>
    </>
  );
}
