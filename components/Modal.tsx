import { Text, Pressable } from 'react-native';
import { useCallback, useMemo, forwardRef } from 'react';
import BottomSheet, {
  BottomSheetBackdropProps,
  BottomSheetBackdrop,
} from '@gorhom/bottom-sheet';

export type ModalProps = {
  ref: React.RefObject<BottomSheet>;
  children: React.ReactNode;
  modalHeight?: number;
  showDoneButton?: boolean;
};

type ConfirmButtonProps = {
  onPress: () => void;
};

const ModalDoneButton = ({ onPress }: ConfirmButtonProps) => {
  return (
    <Pressable
      onPress={onPress}
      style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 42,
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
          fontSize: 15,
        }}
      >
        Confirm
      </Text>
    </Pressable>
  );
};

const Modal = forwardRef<BottomSheet, ModalProps>(
  ({ modalHeight = 250, showDoneButton = false, children }, ref) => {

    const renderModalBackdrop = useCallback(
      (props: BottomSheetBackdropProps) => {
        return (
          <BottomSheetBackdrop
            {...props}
            opacity={0.6}
            disappearsOnIndex={-1}
            appearsOnIndex={0}
          />
        );
      },
      [],
    );

    const snapPoints = useMemo(() => {
      const height = modalHeight;
      if (showDoneButton) return [height + 60];
      return [height];
    }, [modalHeight, showDoneButton]);

    const closeModal = useCallback(() => {
      (ref as React.RefObject<BottomSheet>).current?.close();
    }, []);

    return (
      <BottomSheet
        ref={ref}
        index={-1}
        enablePanDownToClose
        snapPoints={snapPoints}
        detached
        backdropComponent={renderModalBackdrop}
        // add bottom inset to elevate the sheet
        bottomInset={75}
        style={{
          margin: 10,
          padding: 10,
        }}
      >
        {children}
        {showDoneButton && <ModalDoneButton onPress={closeModal} />}
      </BottomSheet>
    );
  },
);

export default Modal;
