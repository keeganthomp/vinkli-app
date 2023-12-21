import PickerSheet, { PickerSheetProps, PickerOption } from './PickerSheet';
import sheetIds from '@const/sheets';
import { tattooColorMap } from '@const/maps';

const tattooColorOptions: PickerOption<string>[] = Object.entries(
  tattooColorMap,
).map(([key, value]) => ({ label: value, value: key }));

const TattooColorSelectSheet = (
  props: Omit<PickerSheetProps<string>, 'options' | 'sheetId'>,
) => {
  const { setTattooColor, value } = props.payload;
  return (
    <PickerSheet
      sheetId={sheetIds.tattooColorSelect}
      options={tattooColorOptions}
      onValueChange={setTattooColor}
      {...props}
    />
  );
};

export default TattooColorSelectSheet;
