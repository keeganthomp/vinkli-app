import React from 'react';
import { AntDesign } from '@expo/vector-icons';
import {
  Pressable,
  View,
  Text,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Control, useController, FieldValues, Path } from 'react-hook-form';
import { Image } from 'expo-image';
import Label from './InputLabel';
import { uploadImages, StorageBucket } from '@utils/image';
import theme from '@theme';

const ImagePreview = ({
  imageUrl,
  onRemove,
}: {
  imageUrl: string;
  onRemove: (imageUrl: string) => void;
}) => {
  return (
    <View
      style={{
        width: 100,
        height: 100,
      }}
    >
      <Pressable
        onPress={() => onRemove(imageUrl)}
        style={{
          position: 'absolute',
          right: -2,
          top: -2,
          zIndex: 1,
        }}
      >
        <AntDesign name="closecircle" size={24} color="white" />
      </Pressable>
      <Image
        contentFit="cover"
        style={{
          flex: 1,
          borderRadius: 8,
        }}
        source={{
          uri: imageUrl,
        }}
      />
    </View>
  );
};

const AddImageButton = ({
  onPress,
  isSelecting = false,
}: {
  onPress: () => void;
  isSelecting?: boolean;
}) => {
  return (
    <Pressable
      onPress={onPress}
      disabled={isSelecting}
      style={{
        width: 75,
        height: 100,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {isSelecting ? (
        <ActivityIndicator />
      ) : (
        <AntDesign name="pluscircle" size={28} color="black" />
      )}
    </Pressable>
  );
};

type FormImageInputProps<TFieldValues extends FieldValues> = {
  name: Path<TFieldValues>;
  control: Control<TFieldValues>;
  label?: string;
  required?: boolean;
  existingImages?: string[]; // urls
};

function FormImageInput<TFieldValues extends FieldValues>({
  name,
  control,
  label = '',
  required,
  existingImages = [],
  ...pressableProps
}: FormImageInputProps<TFieldValues>) {
  const [isSelecting, setIsSelecting] = React.useState(false);
  const {
    field: { onChange, value },
  } = useController({
    name,
    control,
    rules: {
      required,
    },
  });
  const [selectedImages, setSelectedImages] =
    React.useState<string[]>(existingImages);

  const pickImage = async () => {
    if (isSelecting) return;
    setIsSelecting(true);
    // No permissions request is necessary for launching the image library
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
      base64: true,
      allowsMultipleSelection: true,
    });

    if (!result.canceled && result.assets) {
      const images = result.assets;
      const newImageUris = images.map((image) => image.uri);
      // append to local state to show
      const imagePaths = await uploadImages(images, StorageBucket.TATTOOS);
      // update parent form value
      onChange(imagePaths);
      setSelectedImages([...selectedImages, ...newImageUris]);
    }
    setIsSelecting(false);
  };

  const deselectImage = (imageUrl: string) => {
    const newImageUris = selectedImages.filter((uri) => uri !== imageUrl);
    const newImagePaths = value.filter(
      (path: string) => !path.includes(imageUrl),
    );
    onChange(newImagePaths);
    setSelectedImages(newImageUris);
  };

  const hasSelectedImages = selectedImages.length > 0;

  if (hasSelectedImages) {
    return (
      <View>
        <Label label={label} />
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <FlatList
            data={selectedImages}
            renderItem={({ item }) => (
              <ImagePreview onRemove={deselectImage} imageUrl={item} />
            )}
            ListFooterComponent={() => (
              <AddImageButton onPress={pickImage} isSelecting={isSelecting} />
            )}
            ItemSeparatorComponent={() => <View style={{ width: 20 }} />}
            keyExtractor={(item) => item}
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{
              paddingTop: 6,
            }}
          />
        </View>
      </View>
    );
  }

  return (
    <View>
      <Label label={label} />
      <Pressable
        onPress={pickImage}
        style={{
          marginTop: 6,
          height: 100,
          width: '100%',
          borderRadius: 12,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: theme.accentGray,
        }}
        {...pressableProps}
      >
        {isSelecting ? (
          <ActivityIndicator />
        ) : (
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <AntDesign name="upload" size={24} color={theme.textGray} />
            <Text
              style={{
                paddingTop: 10,
                color: theme.textGray,
                fontWeight: '300',
              }}
            >
              Upload Reference Images
            </Text>
          </View>
        )}
      </Pressable>
    </View>
  );
}

export default FormImageInput;
