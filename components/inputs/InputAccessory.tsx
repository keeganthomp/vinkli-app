import React from 'react';
import {
  View,
  Text,
  InputAccessoryView,
  Pressable,
  Keyboard,
  Platform,
} from 'react-native';
import { BlurView } from 'expo-blur';

const isWeb = Platform.OS === 'web';

type Props = {
  id: string;
};

const InputAccessory = ({ id }: Props) => {
  if (isWeb) return <></>;
  return (
    <InputAccessoryView nativeID={id}>
      <BlurView
        intensity={70}
        tint="light"
        style={{
          height: 30,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}
      >
        <Pressable
          style={{
            height: '100%',
            paddingHorizontal: 10,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={Keyboard.dismiss}
        >
          <Text
            style={{
              fontWeight: '500',
              textAlign: 'center',
            }}
          >
            Done
          </Text>
        </Pressable>
      </BlurView>
    </InputAccessoryView>
  );
};

export default InputAccessory;
