import { BookingStatus, PaymentStatus } from '@graphql/types';
import theme from '@theme';

export const bookingStatusColor: Record<BookingStatus, string> = {
  [BookingStatus.Pending]: theme.orange,
  [BookingStatus.Completed]: theme.green,
  [BookingStatus.Cancelled]: theme.red,
  [BookingStatus.Confirmed]: theme.green,
  [BookingStatus.Rejected]: theme.red,
};

export const paymentStatusColor: Record<PaymentStatus, string> = {
  [PaymentStatus.Pending]: theme.orange,
  [PaymentStatus.Success]: theme.green,
  [PaymentStatus.Failed]: theme.red,
};
