import React, { useMemo } from "react";
import { BottomSheetBackdropProps, BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";


// https://gorhom.github.io/react-native-bottom-sheet/custom-backdrop
export const ModalBackdrop = ({ animatedIndex, style }: BottomSheetBackdropProps) => {
  console.log('animatedIndex', animatedIndex)
  const containerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      animatedIndex.value,
      [0, 0.6],
      [0, 0.6],
      Extrapolate.CLAMP,
    ),
  }));

  const containerStyle = useMemo(
    () => [
      style,
      {
        backgroundColor: 'blue',
      },
      containerAnimatedStyle,
    ],
    [style, containerAnimatedStyle],
  );

  return <Animated.View style={containerStyle} />;
};
