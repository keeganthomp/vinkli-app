import { BookingStatus, PaymentStatus } from '@graphql/types';
import theme from '@theme';

export const bookingStatusColor: Record<BookingStatus, string> = {
  [BookingStatus.Pending]: 'orange',
  [BookingStatus.Completed]: 'green',
  [BookingStatus.Cancelled]: theme.error,
  [BookingStatus.Confirmed]: 'green',
  [BookingStatus.Rejected]: theme.error,
};

export const paymentStatusColor: Record<PaymentStatus, string> = {
  [PaymentStatus.Pending]: 'orange',
  [PaymentStatus.Success]: 'green',
  [PaymentStatus.Failed]: theme.error,
};
