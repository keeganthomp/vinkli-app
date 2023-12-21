import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@web/components/ui/dropdown-menu';
import { Platform } from 'react-native';
import Label from './InputLabel';

const isWeb = Platform.OS === 'web';

type DropdownOption = {
  label: string;
  value: string;
};

type Props = {
  value?: string | null;
  buttonLabel?: string;
  label?: string;
  options: DropdownOption[];
  onSelect: (value: string) => void;
};

const WebDropdown = ({
  value,
  label,
  buttonLabel = 'Select Option',
  options,
  onSelect,
}: Props) => {
  const labelToShow =
    options.find((option) => option.value === value)?.label || buttonLabel;
  return (
    <div
    //   className="w-full flex flex-col"
      style={{
        paddingBottom: 20,
      }}
    >
      <Label label={label} />
      <DropdownMenu>
        <div className="w-full">
          <DropdownMenuTrigger
            style={{
              fontWeight: '300',
              color: value ? '#333' : '#999999',
              fontSize: 16,
            }}
          >
            {labelToShow}
          </DropdownMenuTrigger>
        </div>
        <DropdownMenuContent sideOffset={0} onChange={(v) => console.log('vvv', v)}>
          {options.map((option) => (
            <DropdownMenuItem
              onSelect={() => onSelect(option.value)}
              key={option.value}
            >
              {option.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default WebDropdown;
