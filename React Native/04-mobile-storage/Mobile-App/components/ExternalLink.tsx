import { openBrowserAsync } from 'expo-web-browser';
import { TouchableOpacity, Platform } from 'react-native';
import { type ReactNode } from 'react';

type Props = {
  href: string;
  children: ReactNode;
  style?: any;
};

export function ExternalLink({ href, children, style }: Props) {
  const handlePress = async () => {
    if (Platform.OS === 'web') {
      window.open(href, '_blank');
    } else {
      // Open the link in an in-app browser.
      await openBrowserAsync(href);
    }
  };

  return (
    <TouchableOpacity onPress={handlePress} style={style}>
      {children}
    </TouchableOpacity>
  );
}
