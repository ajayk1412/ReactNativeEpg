import { StyleSheet } from 'react-native';
import { COLORS } from 'utils/colors';
import { ballyNormalizeWidth, normalizeHeight } from 'utils/responsivev2';
import { getColorWithTransparency } from '../../../../utils/colors';
const verticalLineProps = (colors, verticalLineLeft, length) => {
  return {
    backgroundColor: COLORS.MSKY_PRIMARY,
    position: 'absolute',
    top: normalizeHeight(50),
    height: normalizeHeight(100) * length,
    left: verticalLineLeft,
    borderRadius: ballyNormalizeWidth(6),
  };
};

export const generateStyle = (
  colors,
  xStartPosition,
  xEndPosition,
  livePosition,
  showLine
) => {
  const verticalLineLeft = xStartPosition + livePosition;
  const pastShadowWidth = showLine
    ? verticalLineLeft - xStartPosition
    : xStartPosition + xEndPosition;

  return StyleSheet.create({
    pastShadow: {
      position: 'absolute',
      top: normalizeHeight(51),
      left: xStartPosition - 1,
      width: pastShadowWidth,

      backgroundColor: getColorWithTransparency(colors.default.BLACK, 0.5),
    },

    thickCenterVerticalLine: (length) => {
      return {
        ...verticalLineProps(colors, verticalLineLeft, length),
        width: ballyNormalizeWidth(2),
        zIndex: 998,
      };
    },
    thinCenterVerticalLine: (length) => {
      return {
        ...verticalLineProps(colors, verticalLineLeft),
        width: 1,
        height: normalizeHeight(100) * length,
        left: verticalLineLeft + 1,
        zIndex: 997,
      };
    },
  });
};
