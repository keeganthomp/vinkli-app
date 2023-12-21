import React from 'react';
import { Text, View, ViewStyle, TextStyle } from 'react-native';

type Props = {
  text: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
};

const Tag = ({ text, style = {}, textStyle = {} }: Props) => {
  return (
    <View
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#333',
        paddingVertical: 2,
        paddingHorizontal: 8,
        ...style,
      }}
    >
      <Text
        style={{
          textAlign: 'center',
          fontSize: 11,
          color: '#333',
          ...textStyle,
        }}
      >
        {text}
      </Text>
    </View>
  );
};

export default Tag;
