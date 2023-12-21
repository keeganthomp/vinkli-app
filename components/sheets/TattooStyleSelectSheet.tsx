import PickerSheet, { PickerSheetProps, PickerOption } from './PickerSheet';
import sheetIds from '@const/sheets';
import { tattooStyleMap } from '@const/maps';

const tattooStyleOptions: PickerOption<string>[] = Object.entries(
  tattooStyleMap,
).map(([key, value]) => ({ label: value, value: key }));

const TattooStyleSelectSheet = (
  props: Omit<PickerSheetProps<string>, 'options' | 'sheetId'>,
) => {
  const { setTattooStyle, value } = props.payload;
  return (
    <PickerSheet
      sheetId={sheetIds.tattooStyleSelect}
      options={tattooStyleOptions}
      onValueChange={setTattooStyle}
      {...props}
    />
  );
};

export default TattooStyleSelectSheet;
