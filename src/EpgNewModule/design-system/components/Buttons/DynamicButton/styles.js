import { StyleSheet } from 'react-native';

export const generateStyle = (colors) => {
  return StyleSheet.create({
    wrapper: {
      backgroundColor: colors.app.PRIMARY,
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderRadius: 8,
    },
  });
};
