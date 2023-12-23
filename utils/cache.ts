import AsyncStorage from '@react-native-async-storage/async-storage';

export type StorageArgs = {
  key: string;
  value: object;
};

export async function writeToStorage(data: StorageArgs) {
  try {
    const serializedData = JSON.stringify(data.value);
    await AsyncStorage.setItem(data.key, serializedData);
  } catch (error) {
    console.error('Error writing to storage', error);
  }
}

export async function readFromStorage(key: string) {
  try {
    const serializedData = await AsyncStorage.getItem(key);
    return serializedData ? JSON.parse(serializedData) : null;
  } catch (error) {
    console.error('Error reading from storage', error);
    return null;
  }
}

export async function removeFromStorage(key: string) {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error('Error removing from storage', error);
  }
}

const cache = {
  writeToStorage,
  readFromStorage,
  removeFromStorage,
};

export default cache;
