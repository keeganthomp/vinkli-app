import React, { useEffect } from 'react';
import { useStripeTerminal } from '@stripe/stripe-terminal-react-native';
import { View } from 'react-native';

export default function CardReader() {
  const {
    discoverReaders,
    discoveredReaders,
    loading: isFetchingReaders,
  } = useStripeTerminal({
    onUpdateDiscoveredReaders: (readers) => {
      console.log('Discovered readers111', readers);
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
