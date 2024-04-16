import React from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import {useTheme} from '../../../../../../hooks/useTheme';
import {generateStyle} from './styles';
// import PlaceholderImage from 'components/PlaceholderImage';
import {ballyNormalizeWidth} from 'utils/responsivev2';
import {IS_TABLET} from 'config';
import {COLORS} from 'utils/colors';
// import style from '../../../../../../../Drawer/style';
export const ChannelCard = ({logo, onPress, isSelected, getLayout}) => {
  const {colors} = useTheme();

  const handleOnLayout = e => {
    const {width, height, x, y} = e.nativeEvent.layout;

    getLayout && getLayout({width, height, x, y});
  };

  const styles = generateStyle(colors, isSelected);

  const customProps = getLayout ? {onLayout: handleOnLayout} : {};
  return (
    <TouchableOpacity
      activeOpacity={1}
      style={[
        isSelected && {backgroundColor: COLORS.MSKY_PRIMARY},
        {
          paddingLeft: ballyNormalizeWidth(2),
        },
      ]}
      onPress={() => {
        onPress && onPress();
      }}>
      <View style={styles.wrapper} {...customProps}>
        <Image
          style={
            IS_TABLET ? styles.channelCardImageIPad : styles.channelCardImage
          }
          placeholderResizeMode={'contain'}
          uri={logo}
          placeholderStyle={styles.channelCardImagePlaceholder}
        />
      </View>
    </TouchableOpacity>
  );
};
