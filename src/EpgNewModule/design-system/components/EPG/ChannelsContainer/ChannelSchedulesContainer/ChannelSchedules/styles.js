import { StyleSheet } from 'react-native';
import {
  ballyNormalizeWidth,
  normalizeHeight,
  ballyNormalizeFont,
} from 'utils/responsivev2';
import { COLORS, FONTS } from 'utils/colors';

export const generateStyle = (colors, leftBarCardHeight) => {
  return StyleSheet.create({
    wrapper: {
      flexDirection: 'row',
      backgroundColor: colors.app.NO_PROGRAM,
    },
    programDuration: {
      fontSize: ballyNormalizeFont(10),
      fontFamily: FONTS.BALLY_THRILL_400,
      marginRight: ballyNormalizeWidth(10),
      fontWeight: 'bold',
    },
    programTitle: {
      fontSize: 14,
      fontFamily: FONTS.BALLY_THRILL_400,
      alignSelf: 'flex-start',
    },
    encoreBox: {
      height: ballyNormalizeWidth(16),
      width: ballyNormalizeWidth(42),
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: COLORS.WHITE,
      justifyContent: 'center',
      marginLeft: ballyNormalizeWidth(10),
      marginRight: ballyNormalizeWidth(15),
      borderRadius: ballyNormalizeWidth(3),
      borderColor: colors.app_light.PROGRAM_TITLE,
      borderWidth: ballyNormalizeWidth(1),
    },
    encoreText: {
      fontSize: 8,
      color: colors.app_light.PROGRAM_TITLE,
      fontFamily: FONTS.BALLY_THRILL_700,
      fontWeight: 'bold',
    },
    liveBox: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      height: ballyNormalizeWidth(16),
      marginLeft: ballyNormalizeWidth(10),
      marginRight: ballyNormalizeWidth(15),
      borderRadius: ballyNormalizeWidth(3),
      backgroundColor: COLORS.WHITE,
      width: ballyNormalizeWidth(42),
    },
    liveBoxDot: {
      width: ballyNormalizeWidth(4),
      height: ballyNormalizeWidth(4),
      marginRight: ballyNormalizeWidth(3),
      borderRadius: ballyNormalizeWidth(4),
      backgroundColor: COLORS.MSKY_PRIMARY,
    },
    liveTxt: {
      fontSize: ballyNormalizeFont(8),
      color: COLORS.MSKY_PRIMARY,
      fontFamily: FONTS.BALLY_THRILL_700,
      fontWeight: 'bold',
    },
    scheduleCard: {
      height: leftBarCardHeight,
      alignItems: 'flex-start',
      justifyContent: 'center',
      overflow: 'hidden',
      paddingLeft: ballyNormalizeWidth(12),
      paddingVertical: normalizeHeight(12),
    },
    rowInfo: {
      flexDirection: 'row',
      alignItems: 'center',
      overflow: 'hidden',
      maxWidth: '100%',
    },
  });
};
