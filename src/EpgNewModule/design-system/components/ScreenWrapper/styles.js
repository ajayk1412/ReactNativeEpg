import { StyleSheet } from 'react-native';

export const generateStyle = (colors, usePadding) => {
  return StyleSheet.create({
    wrapper: {
      flex: 1,
      paddingVertical: usePadding ? 20 : 0,
      paddingHorizontal: usePadding ? 20 : 0,
      backgroundColor: colors.app.ACCENT,
    },
  });
};