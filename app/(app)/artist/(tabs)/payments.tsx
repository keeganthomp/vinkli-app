import {
  View,
  FlatList,
  RefreshControl,
  Text,
  ActivityIndicator,
} from 'react-native';
import Header from '@components/artist/ArtistScreenHeader';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useQuery } from '@apollo/client';
import { GET_PAYMENTS } from '@graphql/queries/payments';
import { GetPaymentsQuery, Payment } from '@graphql/types';
import { useCallback, useState } from 'react';
import theme from '@theme';
import PaymentCard from '@components/payments/PaymentCard';
import { useFocusEffect } from 'expo-router';

export default function ArtistPayments() {
  const insets = useSafeAreaInsets();
  const [refreshing, setRefreshing] = useState(false);
  const {
    data: paymentsData,
    loading: loadingPayments,
    error: errorFetchingPayments,
    refetch,
  } = useQuery<GetPaymentsQuery>(GET_PAYMENTS);

  useFocusEffect(
    useCallback(() => {
      console.log('yeee');
      refetch();
    }, []),
  );

  const renderPaymentCard = useCallback(
    ({ item: payment }: { item: Payment }) => {
      return <PaymentCard payment={payment} />;
    },
    [],
  );

  const keyExtractor = useCallback((item: Payment) => {
    return item.chargeId;
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const payments = paymentsData?.getPayments || [];

  if (loadingPayments) {
    return (
      <View
        style={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        paddingTop: insets.top,
      }}
    >
      <Header title="Payments" />
      <FlatList
        data={payments}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: 12,
          paddingBottom: 44,
        }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
        ItemSeparatorComponent={() => (
          <View
            style={{
              height: 20,
            }}
          />
        )}
        renderItem={renderPaymentCard}
        keyExtractor={keyExtractor}
      />
    </View>
  );
}
