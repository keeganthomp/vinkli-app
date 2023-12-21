import React, { useEffect } from 'react';
import { useStripeTerminal } from '@stripe/stripe-terminal-react-native';
import { View, Platform } from 'react-native';

const isIos = Platform.OS === 'ios';

export default function CardReader() {
  if (!isIos) return null;
  const {
    discoverReaders,
    discoveredReaders,
    loading: isFetchingReaders,
  } = useStripeTerminal({
    onUpdateDiscoveredReaders: (readers) => {
      // The `readers` variable will contain an array of all the discovered readers.
    },
  });

  useEffect(() => {
    discoverReaders({
      discoveryMethod: 'localMobile',
    });
  }, []);

  return <View />;
}
