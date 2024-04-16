import { StyleSheet } from 'react-native';
import { ballyNormalizeWidth } from 'utils/responsivev2';
export const generateStyle = (colors) => {
  return StyleSheet.create({
    wrapper: {
      borderBottomWidth: ballyNormalizeWidth(1),
      borderBottomColor: colors.app.FORTIARY_10,
      borderTopWidth: ballyNormalizeWidth(1),
      borderTopColor: colors.app.FORTIARY_30,
    },
  });
};
