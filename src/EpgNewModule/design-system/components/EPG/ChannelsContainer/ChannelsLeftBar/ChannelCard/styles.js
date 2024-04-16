import { StyleSheet } from 'react-native';
import { COLORS } from 'utils/colors';
import { IS_TABLET } from 'config';
import { ballyNormalizeWidth } from 'utils/responsivev2';
export const generateStyle = () => {
  return StyleSheet.create({
    wrapper: {
      alignSelf: 'center',
      width: ballyNormalizeWidth(80),
      height: ballyNormalizeWidth(64),
      marginVertical: ballyNormalizeWidth(2),
      justifyContent: 'center',
      backgroundColor: COLORS.WHITE,
      shadowColor: COLORS.MSKY_TRANSLUCENT,
      shadowOffset: {
        width: ballyNormalizeWidth(3),
        height: ballyNormalizeWidth(1),
      },
      shadowOpacity: 0.3,
      shadowRadius: 0.2,
      elevation: 5,
    },
    channelCardImage: {
      position: 'absolute',
      bottom: ballyNormalizeWidth(14),
      width: IS_TABLET ? '19%' : ballyNormalizeWidth(66),
      height: IS_TABLET ? ballyNormalizeWidth(135) : ballyNormalizeWidth(34),
      alignSelf: 'center',
    },
    channelCardImageIPad: {
      width:  '90%',
      height:  '90%',
      alignSelf: 'center',
    },

    channelCardImagePlaceholder: {
      width: '40%',
    },
  });
};
