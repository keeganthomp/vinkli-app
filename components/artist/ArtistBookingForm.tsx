import { View, ActivityIndicator, Text, Pressable } from 'react-native';
import {
  ArtistCreateBookingInput,
  TattooColor,
  TattooStyle,
} from '@graphql/types';
import { useForm } from 'react-hook-form';
import FormTextInput from '@components/FormTextInput';
import FormSelectInput from '@components/FormSelectInput';
import FormImageInput from '@components/FormImageInput';
import Button from '@components/Button';
import { tattooColorOptions, tattooStyleOptions } from '@const/input';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CalendarPicker from '@components/CalendarDatePicker';
import Label from '@components/InputLabel';
import theme from '@theme';
import { useMemo, useRef, useCallback, useState } from 'react';
import moment from 'moment';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
} from '@gorhom/bottom-sheet';

type Props = {
  onSubmit: (data: ArtistCreateBookingInput) => void;
};

enum PickerModal {
  DATE = 'DATE',
  TATTOO_COLOR = 'TATTOO_COLOR',
  TATTOO_STYLE = 'TATTOO_STYLE',
}

const ModalDoneButton = ({ onPress }: { onPress: () => void }) => {
  return (
    <Pressable
      onPress={onPress}
      style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 38,
        backgroundColor: '#333',
        borderRadius: 6,
        position: 'absolute',
        bottom: 0,
      }}
    >
      <Text
        style={{
          color: '#fff',
          fontWeight: '500',
        }}
      >
        Done
      </Text>
    </Pressable>
  );
};

const PickerField = ({
  value,
  placeholder,
}: {
  value?: string | null;
  placeholder: string;
}) => {
  return (
    <Text
      style={{
        fontSize: 16,
        fontWeight: '300',
        color: value ? '#333' : '#999',
      }}
    >
      {value || placeholder}
    </Text>
  );
};

export default function ArtistBookingCreate({ onSubmit }: Props) {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [pickerModalType, setPickerModalType] = useState<PickerModal | null>(
    null,
  );
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { isValid, isSubmitting },
  } = useForm<ArtistCreateBookingInput>({
    defaultValues: {
      customerEmail: '',
      title: '',
      date: undefined,
    },
  });

  const [selectedDate, tattooColor, tattooStyle] = watch([
    'date',
    'tattoo.tattooColor',
    'tattoo.tattooStyle',
  ]);
  const canSubmit = isValid && selectedDate;

  const pickerModalSnaps = useMemo(() => {
    switch (pickerModalType) {
      case PickerModal.DATE:
        return ['46%'];
      case PickerModal.TATTOO_COLOR:
        return ['15%'];
      case PickerModal.TATTOO_STYLE:
        return ['26%'];
      default:
        // random default value - correltes to date picker size - have to have one
        return ['46%'];
    }
  }, [pickerModalType]);

  const openPickerModal = (pickerModalType: PickerModal) => {
    setPickerModalType(pickerModalType);
    bottomSheetRef.current?.expand();
  };
  const closeDatePicker = useCallback(() => {
    bottomSheetRef.current?.close();
    setPickerModalType(null);
  }, []);
  const renderModalBackdrop = useCallback((props: BottomSheetBackdropProps) => {
    return (
      <BottomSheetBackdrop
        {...props}
        opacity={0.6}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
      />
    );
  }, []);
  const checkShowModalDoneButton = () => {
    if (pickerModalType !== PickerModal.DATE) return false;
    return !!selectedDate;
  };

  const handleDateChange = (date: Date) => {
    const isAlreadySelected =
      selectedDate && date.toDateString() === selectedDate.toDateString();
    const newDate = isAlreadySelected ? undefined : date;
    setValue('date', newDate);
  };

  const dateToShow = useMemo(() => {
    if (!selectedDate) return null;
    return moment(selectedDate).format('LLL');
  }, [selectedDate]);

  const SPACING = 26;

  const renderPickerContent = () => {
    switch (pickerModalType) {
      case PickerModal.DATE:
        return (
          <CalendarPicker
            selectedDates={selectedDate}
            onDateSelected={handleDateChange}
          />
        );
      case PickerModal.TATTOO_COLOR:
        return (
          <View>
            <Pressable
              onPress={() => {
                setValue('tattoo.tattooColor', TattooColor.BlackAndGrey);
                closeDatePicker();
              }}
              style={{
                paddingVertical: 10,
              }}
            >
              <Text>Black & Gray</Text>
            </Pressable>
            <Pressable
              onPress={() => {
                setValue('tattoo.tattooColor', TattooColor.Color);
                closeDatePicker();
              }}
              style={{
                paddingVertical: 10,
              }}
            >
              <Text>Color</Text>
            </Pressable>
          </View>
        );
      case PickerModal.TATTOO_STYLE:
        return (
          <View>
            <Pressable
              onPress={() => {
                setValue('tattoo.tattooStyle', TattooStyle.Realism);
                closeDatePicker();
              }}
              style={{
                paddingVertical: 10,
              }}
            >
              <Text>Realism</Text>
            </Pressable>
            <Pressable
              onPress={() => {
                setValue('tattoo.tattooStyle', TattooStyle.Blackwork);
                closeDatePicker();
              }}
              style={{
                paddingVertical: 10,
              }}
            >
              <Text>Blackwork</Text>
            </Pressable>
            <Pressable
              onPress={() => {
                setValue('tattoo.tattooStyle', TattooStyle.Dotwork);
                closeDatePicker();
              }}
              style={{
                paddingVertical: 10,
              }}
            >
              <Text>Dotwork</Text>
            </Pressable>
            <Pressable
              onPress={() => {
                setValue('tattoo.tattooStyle', TattooStyle.TraditionalAmerican);
                closeDatePicker();
              }}
              style={{
                paddingVertical: 10,
              }}
            >
              <Text>Traditional</Text>
            </Pressable>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <View
        style={{
          flex: 1,
          backgroundColor: theme.appBackground,
        }}
      >
        {isSubmitting ? (
          <ActivityIndicator />
        ) : (
          <>
            <KeyboardAwareScrollView
              showsVerticalScrollIndicator={false}
              extraScrollHeight={75}
              contentContainerStyle={{
                paddingTop: 20,
                paddingBottom: 125,
                paddingHorizontal: 14,
              }}
            >
              <View
                style={{
                  paddingBottom: SPACING,
                }}
              >
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
              </View>
              <View
                style={{
                  paddingBottom: SPACING,
                }}
              >
                <Label label="Date" />
                <Pressable onPress={() => openPickerModal(PickerModal.DATE)}>
                  <PickerField value={dateToShow} placeholder="Select a date" />
                </Pressable>
              </View>
              <View
                style={{
                  paddingBottom: SPACING,
                }}
              >
                <FormTextInput
                  control={control}
                  name="tattoo.description"
                  label="Tattoo Description"
                  placeholder="Description"
                  multiline
                />
              </View>
              <View
                style={{
                  paddingBottom: SPACING,
                  display: 'flex',
                  flexDirection: 'row',
                }}
              >
                <View
                  style={{
                    width: '50%',
                  }}
                >
                  <Label label="Tattoo Color" />
                  <Pressable
                    onPress={() => openPickerModal(PickerModal.TATTOO_COLOR)}
                  >
                    <PickerField
                      value={tattooColor}
                      placeholder="Color or Black and Gray"
                    />
                  </Pressable>
                </View>
                <View
                  style={{
                    width: '50%',
                  }}
                >
                  <Label label="Tattoo Style" />
                  <Pressable
                    onPress={() => openPickerModal(PickerModal.TATTOO_STYLE)}
                  >
                    <PickerField
                      value={tattooStyle}
                      placeholder="Tattoo Style"
                    />
                  </Pressable>
                </View>
              </View>
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
            </KeyboardAwareScrollView>
            {/* Submit button */}
            <View
              style={{
                width: '100%',
                position: 'absolute',
                bottom: 35,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                paddingHorizontal: 14,
              }}
            >
              <Button
                onPress={handleSubmit(onSubmit)}
                label="Create Booking"
                disabled={!canSubmit}
              />
            </View>
          </>
        )}
      </View>
      {/* Picker modal */}
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        enablePanDownToClose
        snapPoints={pickerModalSnaps}
        detached
        backdropComponent={renderModalBackdrop}
        // add bottom inset to elevate the sheet
        bottomInset={75}
        style={{
          margin: 10,
          padding: 10,
        }}
      >
        {renderPickerContent()}
        {checkShowModalDoneButton() && (
          <ModalDoneButton onPress={closeDatePicker} />
        )}
      </BottomSheet>
    </>
  );
}
