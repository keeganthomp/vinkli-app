import { Platform } from 'react-native';

const isWeb = Platform.OS === 'web';

const theme = {
  // app background
  appBackground: isWeb ? '#fff' : '#f5f5f5',
  // grays
  lightGray: '#d3d3d3',
  accentGray: '#ededed',
  textGray: '#8e8e8e',
  // various colors
  red: '#ff0033',
  orange: '#FFA500',
  green: '#5cb85c',
};

export default theme;
