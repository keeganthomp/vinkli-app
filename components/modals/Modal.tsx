import { Text, Pressable, ViewStyle } from 'react-native';
import { useCallback, useMemo, forwardRef } from 'react';
import {
  BottomSheetBackdropProps,
  BottomSheetBackdrop,
  BottomSheetView,
  BottomSheetModal,
} from '@gorhom/bottom-sheet';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export type ModalProps = {
  ref: React.RefObject<BottomSheetModal>;
  children: React.ReactNode;
  showDoneButton?: boolean;
  enableDynamicSizing?: boolean;
  detached?: boolean;
  containerStyle?: ViewStyle;
  contentContainerStyle?: ViewStyle;
  height?: number;
  bottomInset?: number;
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

const Modal = forwardRef<BottomSheetModal, ModalProps>(
  (
    {
      showDoneButton = false,
      children,
      enableDynamicSizing = true,
      detached = false,
      containerStyle = {},
      height,
      bottomInset,
      contentContainerStyle = {},
    },
    ref,
  ) => {
    const insets = useSafeAreaInsets();

    const renderBackdrop = useCallback(
      (props: any) => (
        <BottomSheetBackdrop
          {...props}
          pressBehavior="close"
          opacity={0.6}
          disappearsOnIndex={-1}
          appearsOnIndex={0}
        />
      ),
      [],
    );

    const closeModal = useCallback(() => {
      (ref as React.RefObject<BottomSheetModal>).current?.close();
    }, []);

    return (
      <BottomSheetModal
        ref={ref}
        enablePanDownToClose
        enableDynamicSizing={enableDynamicSizing}
        backdropComponent={renderBackdrop}
        detached={detached}
        snapPoints={height ? [height] : undefined}
        bottomInset={bottomInset}
        style={{
          backgroundColor: '#fff',
          borderRadius: 14,
          ...containerStyle,
        }}
      >
        <BottomSheetView
          style={{
            paddingHorizontal: 14,
            paddingBottom: insets.bottom,
            ...contentContainerStyle,
          }}
        >
          {children}
          {showDoneButton && <ModalDoneButton onPress={closeModal} />}
        </BottomSheetView>
      </BottomSheetModal>
    );
  },
);

export default Modal;
