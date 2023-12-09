import { Text, Pressable, ViewStyle } from 'react-native';
import { useCallback, useMemo, forwardRef } from 'react';
import {
  BottomSheetBackdropProps,
  BottomSheetBackdrop,
  BottomSheetView,
  BottomSheetModal,
  BottomSheetFlatList,
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
  doneButtonText?: string;
  onDoneButtonPress?: () => void;
  doneButtonDisabled?: boolean;
};

type ConfirmButtonProps = {
  onPress: () => void;
  disabled?: boolean;
  title?: string;
};

export const ModalDoneButton = ({
  onPress,
  disabled,
  title = 'Confirm',
}: ConfirmButtonProps) => {
  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 42,
        backgroundColor: disabled ? '#999999' : '#333',
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
        {title}
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
      doneButtonText,
      onDoneButtonPress,
      doneButtonDisabled,
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

    const handleDoneButtonPress = () => {
      closeModal();
      if (onDoneButtonPress) {
        onDoneButtonPress();
      }
    };

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
          {showDoneButton && (
            <ModalDoneButton
              title={doneButtonText}
              onPress={handleDoneButtonPress}
              disabled={doneButtonDisabled}
            />
          )}
        </BottomSheetView>
      </BottomSheetModal>
    );
  },
);

export const FlatListModal = forwardRef<BottomSheetModal, ModalProps>(
  (
    {
      children,
      enableDynamicSizing = true,
      detached = false,
      containerStyle = {},
      height,
      bottomInset,
    },
    ref,
  ) => {
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

    return (
      <BottomSheetModal
        ref={ref}
        // enablePanDownToClose={false}
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
        {children}
      </BottomSheetModal>
    );
  },
);

export default Modal;
