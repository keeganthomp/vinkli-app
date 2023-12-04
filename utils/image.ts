import { ImagePickerAsset } from 'expo-image-picker';
import { supabase } from '@lib/supabase';
import { decode } from 'base64-arraybuffer';

// should match backend
export enum StorageBucket {
  TATTOOS = 'tattoos',
}

// util to generate consistant file names
const generatePathName = (
  image: ImagePickerAsset,
): {
  path: string;
  extension: string;
} => {
  // image extensions - jpg, png, etc - will defaut to jpeg if not found
  const imageExtension = image.uri.split('.').pop() || 'jpeg';
  // random id in case of duplicate file names
  const randomId = Math.random().toString(36).substring(5);
  const imageId = randomId;
  return {
    path: `${imageId}.${imageExtension}`,
    extension: imageExtension,
  };
};

// util to upload one or more images to supabase storage
export const uploadImages = async <
  T extends ImagePickerAsset | ImagePickerAsset[],
>(
  image: T,
  storageBucket: StorageBucket,
): Promise<T extends ImagePickerAsset[] ? string[] : string> => {
  // helper to upload a single image
  const uploadSingleImage = async (
    image: ImagePickerAsset,
  ): Promise<string> => {
    const { path, extension: imageExtension } = generatePathName(image);
    console.log('path', path)
    const { data, error } = await supabase.storage
      .from(storageBucket)
      .upload(path, decode(image.base64 as string), {
        cacheControl: '3600',
        upsert: false,
        contentType: `image/${imageExtension}`,
      });
    if (error) {
      throw new Error(error.message);
    }
    return data.path;
  };

  // handle multiple images
  if (Array.isArray(image)) {
    const hasBase64 = image.every((image) => !!image.base64);
    if (!hasBase64) {
      throw new Error('Unable to upload. No base64 image found.');
    }
    return Promise.all(image.map(uploadSingleImage)) as Promise<
      T extends ImagePickerAsset[] ? string[] : string
    >;
  }
  // handle single image
  if (!image.base64) {
    throw new Error('Unable to upload. No base64 image found.');
  }
  return uploadSingleImage(image) as Promise<
    T extends ImagePickerAsset[] ? string[] : string
  >;
};
