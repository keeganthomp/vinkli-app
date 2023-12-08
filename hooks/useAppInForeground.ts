import { useEffect, useState } from 'react';
import { AppState, AppStateStatus } from 'react-native';

const useAppInForeground = (): boolean => {
  const [isForeground, setIsForeground] = useState(AppState.currentState === 'active');

  useEffect(() => {
    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      setIsForeground(nextAppState === 'active');
    };

    // Subscribe to app state changes
    const subscription = AppState.addEventListener('change', handleAppStateChange);

    // Cleanup on unmount
    return () => subscription.remove();
  }, []);

  return isForeground;
};

export default useAppInForeground;
