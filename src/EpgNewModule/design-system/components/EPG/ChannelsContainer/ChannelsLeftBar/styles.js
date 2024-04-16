import { StyleSheet } from 'react-native';
import { ballyNormalizeWidth } from 'utils/responsivev2';

export const CHANNEL_LEFT_BAR_WIDTH = ballyNormalizeWidth(82);

export const styles = StyleSheet.create({
  wrapper: {
    width: ballyNormalizeWidth(82),
    zIndex: -1,
  },
});
