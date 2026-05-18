import { Alert, Platform } from 'react-native';

type ConfirmActionOptions = {
  title: string;
  message: string;
  confirmLabel?: string;
  onConfirm: () => void;
};

export function confirmAction({
  title,
  message,
  confirmLabel = 'Confirm',
  onConfirm,
}: ConfirmActionOptions) {
  if (Platform.OS === 'web') {
    if (globalThis.confirm?.(`${title}\n\n${message}`)) {
      onConfirm();
    }
    return;
  }

  Alert.alert(title, message, [
    { style: 'cancel', text: 'Cancel' },
    {
      style: 'destructive',
      text: confirmLabel,
      onPress: onConfirm,
    },
  ]);
}
