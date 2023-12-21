import PickerSheet, { PickerSheetProps, PickerOption } from './PickerSheet';
import { bookingTypeMap } from '@const/maps';
import sheetIds from '@const/sheets';

const bookingTypeOptions: PickerOption<string>[] = Object.entries(
  bookingTypeMap,
).map(([key, value]) => ({ label: value, value: key }));

const AppointmentTypeSheet = (
  props: Omit<PickerSheetProps<string>, 'options' | 'sheetId'>,
) => {
  const { setBookingType, value } = props.payload;
  return (
    <PickerSheet
      sheetId={sheetIds.appointmentTypeSelect}
      options={bookingTypeOptions}
      onValueChange={setBookingType}
      {...props}
    />
  );
};

export default AppointmentTypeSheet;
