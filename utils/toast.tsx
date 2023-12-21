// App.jsx
import Toast, { SuccessToast, ErrorToast, ToastConfig } from 'react-native-toast-message';
import theme from '@theme';

/*
  1. Create the config
*/
export const toastConfig: ToastConfig = {
  /*
    Overwrite 'success' type,
    by modifying the existing `BaseToast` component
  */
  success: (props: any) => (
    <SuccessToast
      {...props}
      style={{ borderLeftColor: theme.green }}
      contentContainerStyle={{ width: '100%', paddingHorizontal: 10, borderColor: '#333' }}
      text1Style={{
        fontSize: 15,
        fontWeight: 'bold',
        paddingBottom: 3,
      }}
      text2Style={{
        fontSize: 12,
        color: '#333',
        fontWeight: '300',
      }}
    />
  ),
  /*
    Overwrite 'error' type,
    by modifying the existing `ErrorToast` component
  */
  error: (props: any) => (
    <ErrorToast
      {...props}
      style={{ borderLeftColor: theme.red }}
      contentContainerStyle={{ width: '100%', paddingHorizontal: 10 }}
      text1Style={{
        fontSize: 15,
        fontWeight: 'bold',
        paddingBottom: 3,

      }}
      text2Style={{
        fontSize: 12,
        color: '#333',
        fontWeight: '300',
      }}
    />
  ),
};
