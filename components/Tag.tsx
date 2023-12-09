import React from 'react';
import { Text, View } from 'react-native';

const Tag = ({ text }: { text: string }) => {
  return (
    <View
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderWidth: 1,
        paddingVertical: 2,
        paddingHorizontal: 8,
        alignSelf: 'flex-start',
      }}
    >
      <Text
        style={{
          textAlign: 'center',
          fontSize: 11,
        }}
      >
        {text}
      </Text>
    </View>
  );
};

export default Tag;