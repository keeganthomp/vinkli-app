import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@web/components/ui/dialog';
import PostBookingForm from '@components/artist/PostBookingForm';
import { Booking } from '@graphql/types';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  booking: Booking;
};

export function PostBookingFormModal({ isOpen, onClose, booking }: Props) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-sm px-12">
        <div>
          <PostBookingForm closeModal={onClose} bookingId={booking.id} />
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default PostBookingFormModal;
