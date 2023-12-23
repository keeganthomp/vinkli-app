import { useEffect, useState } from 'react';
import {
  readFromStorage,
  writeToStorage,
  removeFromStorage,
  StorageArgs,
} from '@utils/cache';
import { UseFormWatch } from 'react-hook-form';

function useSyncFormWithStorage<FormData extends object>(
  key: string, // Add a key parameter
  watch: UseFormWatch<any>,
  setInitalValue?: (initialValue: FormData) => void,
) {
  const [isInitialValueLoaded, setIsInitialValueLoaded] = useState(false);
  const [value, setValue] = useState<FormData>({} as FormData);

  // Read value from storage on initial mount
  useEffect(() => {
    readFromStorage(key).then((initialCachedValue) => {
      if (initialCachedValue) {
        setValue(initialCachedValue);
        if (setInitalValue) {
          setInitalValue(initialCachedValue);
        }
      }
      setIsInitialValueLoaded(true);
    });
  }, []); // Empty dependency array to run only on mount

  useEffect(() => {
    const subscription = watch((value: FormData) => {
      const storageArgs: StorageArgs = { key, value }; // Construct the StorageArgs object
      writeToStorage(storageArgs);
    });
    return () => subscription.unsubscribe();
  }, [watch, key]); // Include key in the dependency array

  const clearStorage = () => removeFromStorage(key);

  return {
    initialValue: value,
    isInitialized: isInitialValueLoaded,
    clearStorage,
  };
}

export default useSyncFormWithStorage;
