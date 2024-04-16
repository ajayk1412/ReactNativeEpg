import { StyleSheet } from 'react-native';
import { ballyNormalizeWidth } from 'utils/responsivev2';
import { COLORS } from 'utils/colors';
import { SCREEN_WIDTH } from 'utils/constants';

export const styles = StyleSheet.create({
  verticalScroll: {
    zIndex: -999,
  },
  wrapper: {
    flexDirection: 'row',
  },
  selectedChannelBorder: {
    borderColor: COLORS.MSKY_PRIMARY,
    borderWidth: ballyNormalizeWidth(1),
    position: 'absolute',
    width: SCREEN_WIDTH,
    zIndex: 1,
  },
  verticalEdges: {
    width: ballyNormalizeWidth(2),
    height: ballyNormalizeWidth(66),
  },
});
