import { StyleSheet } from 'react-native';
import { ballyNormalizeWidth, normalizeHeight } from 'utils/responsivev2';
export const generateStyle = (colors) => {
  return StyleSheet.create({
    wrapper: {
      paddingHorizontal: ballyNormalizeWidth(16),
      paddingTop: ballyNormalizeWidth(16),
      paddingBottom: normalizeHeight(16),
      marginBottom: normalizeHeight(4),
      alignItems: 'center',
      justifyContent: 'center',
    },
    topBar: {
      position: 'absolute',
      top: 0,
      left: ballyNormalizeWidth(15),
      right: ballyNormalizeWidth(15),
      borderWidth: ballyNormalizeWidth(2),
      borderTopColor: colors.app.ACCENT,
    },
  });
};
