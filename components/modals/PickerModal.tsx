import React, { useCallback, useMemo, forwardRef } from 'react';
import { Text, Pressable } from 'react-native';
import { Control, useController, FieldValues, Path } from 'react-hook-form';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import Modal, { ModalProps } from '@components/modals/Modal';

export type PickerOption<T> = {
  label: string;
  value: T;
};

type PickerRowProps<T> = {
  item: PickerOption<T>;
  onPress: (value: T) => void;
  isLast?: boolean;
};

const PickerRow = <T,>({ item, onPress, isLast }: PickerRowProps<T>) => {
  const handlePress = () => {
    onPress(item.value);
  };

  return (
    <Pressable
      onPress={handlePress}
      style={{
        paddingVertical: 12,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: isLast ? 0 : 1,
        borderBottomColor: '#eee',
      }}
    >
      <Text style={{ fontSize: 16, fontWeight: '300', color: '#333' }}>
        {item.label}
      </Text>
    </Pressable>
  );
};

type PickerModalProps<TFieldValues extends FieldValues, TValue> = Omit<ModalProps, 'children'> & {
  options: PickerOption<TValue>[];
  name: Path<TFieldValues>;
  control: Control<TFieldValues>;
};

const PickerModal = forwardRef<BottomSheetModal, PickerModalProps<FieldValues, any>>(
  ({ options, name, control, ...modalProps }, ref) => {
    const { field: { onChange } } = useController({
      name,
      control,
    });

  const closeModal = useCallback(() => {
    if (ref && typeof ref === 'object' && ref.current) {
      ref.current.close();
    }
  }, [ref]);

  const handleSelect = useCallback(
    (value: any) => {
      onChange(value);
      closeModal();
    },
    [onChange, closeModal],
  );

  return (
    <Modal {...modalProps} ref={ref}>
      {options.map((option, i) => (
        <PickerRow
          key={option.label}
          item={option}
          onPress={() => handleSelect(option.value)}
          isLast={i === options.length - 1}
        />
      ))}
    </Modal>
  );
});

export default PickerModal;
