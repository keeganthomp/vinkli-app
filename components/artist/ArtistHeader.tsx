import { View, Text, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import theme from '@theme';

const NAV_BUTTON_SIZE = 32;
const BUTTON_ICON_SIZE = 17;
const NAV_BUTTON_ICON_COLOR = 'black';

type Props = {
  title?: string;
  rightComponent?: React.ReactNode;
  canGoBack?: boolean;
  onBackPress?: () => void;
  onClosePress?: () => void;
  modalHeader?: boolean;
};

const HeaderNavButton = ({
  children,
  onPress,
}: {
  children: React.ReactNode;
  onPress?: () => void;
}) => {
  const handlPress = () => {
    if (onPress) onPress();
  };
  return (
    <Pressable
      onPress={handlPress}
      style={{
        backgroundColor: theme.accentGray,
        width: NAV_BUTTON_SIZE,
        height: NAV_BUTTON_SIZE,
        borderRadius: 8,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {children}
    </Pressable>
  );
};

// Left side of header
const LeftComponent = ({
  canGoBack,
  onBackPress,
}: {
  canGoBack: Props['canGoBack'];
  onBackPress?: Props['onBackPress'];
}) => {
  if (canGoBack) {
    const handlePress = () => {
      if (onBackPress) onBackPress();
    };
    return (
      <HeaderNavButton onPress={handlePress}>
        <Ionicons
          name="chevron-back"
          size={BUTTON_ICON_SIZE}
          color={NAV_BUTTON_ICON_COLOR}
        />
      </HeaderNavButton>
    );
  }
  return <View style={{ width: 34 }} />;
};

// Right side of header
const RightComponent = ({
  component,
  modalHeader,
  onPress,
}: {
  component: Props['rightComponent'];
  modalHeader: Props['modalHeader'];
  onPress: Props['onClosePress'];
}) => {
  if (modalHeader)
    return (
      <HeaderNavButton onPress={onPress}>
        <Ionicons
          name="close"
          size={BUTTON_ICON_SIZE}
          color={NAV_BUTTON_ICON_COLOR}
        />
      </HeaderNavButton>
    );
  if (!component) return <View style={{ width: 34 }} />;
  return component;
};

const ArtistHeader = ({
  title,
  canGoBack = false,
  onBackPress = () => {},
  onClosePress = () => {},
  rightComponent,
  modalHeader = false,
}: Props) => {
  return (
    <View
      style={{
        marginTop: modalHeader ? 10 : 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 45,
        paddingHorizontal: 12,
      }}
    >
      <LeftComponent canGoBack={canGoBack} onBackPress={onBackPress} />
      {title && (
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={{
            flex: 1,
            fontSize: 16,
            fontWeight: modalHeader ? '600' : 'bold',
            paddingHorizontal: 8,
            textAlign: 'center',
          }}
        >
          {title}
        </Text>
      )}
      <RightComponent
        onPress={onClosePress}
        component={rightComponent}
        modalHeader={modalHeader}
      />
    </View>
  );
};

export default ArtistHeader;
