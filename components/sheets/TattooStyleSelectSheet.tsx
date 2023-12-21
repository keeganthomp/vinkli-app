import PickerSheet, { PickerSheetProps } from './PickerSheet';
import sheetIds from '@const/sheets';
import { tattooStyleOptions } from '@const/input';

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
