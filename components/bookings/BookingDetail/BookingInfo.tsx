import { Text, View, Pressable, TextStyle, TextProps } from 'react-native';
import { Booking, TattooStyle, TattooColor } from '@graphql/types';
import { Image } from 'expo-image';
import { useState } from 'react';
import { tattooColorMap, tattooStyleMap } from '@const/maps';
import theme from '@theme';

type Props = {
  booking: Booking;
};

const Info = ({
  value,
  style = {},
  textProps = {},
}: {
  value: string;
  style?: TextStyle;
  textProps?: TextProps;
}) => {
  return (
    <Text
      {...textProps}
      style={{
        fontSize: 17,
        ...style,
      }}
    >
      {value}
    </Text>
  );
};

const Tag = ({ value }: { value: string }) => {
  return (
    <View
      style={{
        borderRadius: 6,
        borderWidth: 1,
        paddingVertical: 3,
        paddingHorizontal: 7,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
      }}
    >
      <Text
        style={{
          fontSize: 13,
        }}
      >
        {value}
      </Text>
    </View>
  );
};

const ImagePreview = ({ url, index }: { url: string, index: number }) => {
  const isMiddle = index % 3 === 1;
  return (
    <Pressable style={{
      width: '32%',
      height: 120,
      marginBottom: 8,
      marginHorizontal: isMiddle ? 5 : 0,
    }}>
      <Image
        cachePolicy="memory-disk"
        style={{
          flex: 1,
          borderRadius: 4,
        }}
        contentFit="cover"
        source={{
          uri: url,
        }}
      />
    </Pressable>
  );
};

export default function BookingInfo({ booking }: Props) {
  const [isViewingFullDescription, setIsViewingFullDescription] =
    useState(false);

  const tattoo = booking.tattoo;

  if (!tattoo) return null;

  const hasImages = tattoo.imageUrls.length > 0;

  return (
    <View
      style={{
        paddingTop: 16,
      }}
    >
      <Pressable
        onPress={() => setIsViewingFullDescription(!isViewingFullDescription)}
      >
        <Info
          textProps={{
            numberOfLines: isViewingFullDescription ? undefined : 3,
          }}
          style={{
            fontWeight: '300',
            color: tattoo.description ? '#333' : theme.textGray,
          }}
          value={tattoo.description || 'No Description Provided'}
        />
      </Pressable>
      {(tattoo.tattooStyle || tattoo.tattooColor) && (
        <View
          style={{
            paddingTop: 8,
            display: 'flex',
            flexDirection: 'row',
          }}
        >
          {tattoo.tattooStyle && (
            <Tag
              value={tattooStyleMap[tattoo.tattooStyle as TattooStyle] || 'N/A'}
            />
          )}
          {tattoo.tattooColor && (
            <Tag
              value={tattooColorMap[tattoo.tattooColor as TattooColor] || 'N/A'}
            />
          )}
        </View>
      )}

      {hasImages && (
        <View
          style={{
            width: '100%',
            paddingTop: 20,
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
          }}
        >
          {tattoo.imageUrls.map((url, i) => (
            <ImagePreview key={url} url={url} index={i} />
          ))}
        </View>
      )}
    </View>
  );
}
