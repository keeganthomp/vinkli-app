import { Pressable, Text, View } from 'react-native';
import { Payment } from '@graphql/types';
import theme from '@theme';
import { formatCentsToDollars } from '@utils/money';
import { paymentStatusMap, bookingTypeMap } from '@const/maps';
import Tag from '@components/Tag';
import moment from 'moment';

const PaymentCard = ({ payment }: { payment: Payment }) => {
  return (
    <Pressable
      style={{
        backgroundColor: theme.accentGray,
        borderRadius: 16,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        paddingHorizontal: 20,
        paddingVertical: 16,
        flexGrow: 1,
      }}
    >
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
        }}
      >
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 18,
          }}
        >
          {formatCentsToDollars(payment.amount)}
        </Text>
        <Tag text={paymentStatusMap[payment.status]} />
      </View>
      <View
        style={{
          paddingTop: 12,
        }}
      >
        <Text
          style={{
            fontSize: 12,
            fontWeight: '300',
          }}
        >
          Processed {moment(payment.createdAt).format('LL')}
        </Text>
      </View>
    </Pressable>
  );
};

export default PaymentCard;
