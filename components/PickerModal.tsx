import { Text, Pressable } from 'react-native';
import { useCallback, useMemo, forwardRef } from 'react';
import { Control, useController, FieldValues, Path } from 'react-hook-form';
import BottomSheet from '@gorhom/bottom-sheet';
import Modal, { ModalProps } from '@components/Modal';

export type PickerOption<T> = {
  label: string;
  value: T;
};

type PickerRowT<T> = {
  item: PickerOption<T>;
  onPress: (arg: PickerOption<T>['value']) => void;
  isLast?: boolean;
};

type Props<T> = Omit<ModalProps, 'children'> & {
  options: PickerOption<T>[];
  name: Path<FieldValues>;
  control: Control<FieldValues>;
};

const PickerRow = <T,>({ item, onPress, isLast }: PickerRowT<T>) => {
  const handlePress = () => {
    onPress(item.value);
  };
  return (
    <Pressable
      onPress={handlePress}
      style={{
        paddingVertical: 12,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: isLast ? 0 : 1,
        borderBottomColor: '#eee',
      }}
    >
      <Text
        style={{
          fontSize: 16,
          fontWeight: '300',
          color: '#333',
        }}
      >
        {item.label}
      </Text>
    </Pressable>
  );
};

const PickerModal = forwardRef<BottomSheet, Props<any>>(
  (
    { control, name, options, modalHeight = 250, showDoneButton = false },
    ref,
  ) => {
    const {
      field: { onChange },
    } = useController({
      name,
      control,
    });

    const shouldShowConfirmButton = useMemo(() => {
      if (!showDoneButton) return false;
      return true;
    }, [showDoneButton]);

    const closeModal = useCallback(() => {
      (ref as React.RefObject<any>)?.current?.close();
    }, [ref]);

    const handleSelect = useCallback(
      (selectedOption: PickerOption<any>) => {
        onChange(selectedOption.value);
        closeModal();
      },
      [options, onChange],
    );

    return (
      <Modal
        ref={ref}
        modalHeight={modalHeight}
        showDoneButton={shouldShowConfirmButton}
      >
        {options.map((option: PickerOption<any>, i) => (
          <PickerRow
            key={option.label}
            item={option}
            onPress={() => handleSelect(option)}
            isLast={i === options.length - 1}
          />
        ))}
      </Modal>
    );
  },
);

export default PickerModal;
