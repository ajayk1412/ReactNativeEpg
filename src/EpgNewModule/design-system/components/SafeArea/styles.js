import { StyleSheet } from 'react-native';

export const generateStyle = (colors) => {
  return StyleSheet.create({
    top: {
      flex: 0,
      backgroundColor: colors.app.SECONDARY,
    },
    bottom: {
      flex: 1,
      backgroundColor: colors.app.TERTIARY,
    },
  });
};
