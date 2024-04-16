import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from 'utils/colors';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from 'utils/constants';
import { ballyNormalizeWidth, normalizeHeight } from 'utils/responsivev2';
export const RIGHT_PADDING = ballyNormalizeWidth(32);

export const generateStyle = (
  colors,
  xMarkLineLeftPosition,
  xMarkLineRightPosition
) => {
  const lineMarkStyle = {
    width: ballyNormalizeWidth(2),
    backgroundColor: colors.app.FORTIARY,
    position: 'absolute',
    top: normalizeHeight(50),
    bottom: 0,
  };

  return StyleSheet.create({
    wrapper: {
      width: SCREEN_WIDTH,
      backgroundColor: COLORS.MSKY_PRIMARY,
      flexDirection: 'row',
      justifyContent: 'space-between',
      borderBottomWidth: ballyNormalizeWidth(1),
      borderBottomColor: colors.app.FORTIARY_10,
      paddingHorizontal: ballyNormalizeWidth(30),
      paddingVertical: normalizeHeight(12),
      marginBottom: normalizeHeight(2),
    },
    intervalPressable: {
      justifyContent: 'center',
      flexDirection: 'row',
    },
    leftChevron: {
      alignSelf: 'center',
    },
    rightChevron: {
      alignSelf: 'center',
    },
    leftText: {},
    leftMarkLine: {
      ...lineMarkStyle,
      left: xMarkLineLeftPosition,
    },
    rightMarkLine: {
      ...lineMarkStyle,
      left: xMarkLineRightPosition,
    },
    hourText: {
      fontSize: 14,
      fontFamily: FONTS.BALLY_THRILL_800,
      fontWeight: 'bold',
    },
    nowButton: {
      position: 'absolute',
      top: SCREEN_HEIGHT * 0.61,
      right: ballyNormalizeWidth(16),
    },
  });
};
