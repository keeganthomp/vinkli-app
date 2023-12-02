import { Text, View, Pressable, TextStyle, TextProps } from 'react-native';
import { Booking, TattooStyle, TattooColor } from '@graphql/types';
import { Image } from 'expo-image';
import { useState } from 'react';
import { tattooColorMap, tattooStyleMap } from '@const/maps';

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
        fontSize: 16,
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
          fontSize: 11,
        }}
      >
        {value}
      </Text>
    </View>
  );
};

const ImagePreview = ({ url }: { url: string }) => {
  return (
    <Image
      style={{
        width: 100,
        height: 100,
        borderRadius: 8,
        marginRight: 8,
        marginBottom: 8,
      }}
      source={{
        uri: url,
      }}
    />
  );
};

export default function BookingInfo({ booking }: Props) {
  const [isViewingFullDescription, setIsViewingFullDescription] =
    useState(false);

  const tattoo = booking.tattoo;

  if (!tattoo) return null;

  const hasImages = tattoo.imageUrls.length > 0;

  return (
    <View>
      <Pressable
        onPress={() => setIsViewingFullDescription(!isViewingFullDescription)}
      >
        <Info
          textProps={{
            numberOfLines: isViewingFullDescription ? undefined : 3,
          }}
          style={{
            fontWeight: '300',
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
            paddingTop: 28,
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
          }}
        >
          {tattoo.imageUrls.map((url) => (
            <ImagePreview url={url} key={url} />
          ))}
        </View>
      )}
    </View>
  );
}
