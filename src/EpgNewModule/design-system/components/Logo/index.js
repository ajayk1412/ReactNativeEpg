import React from 'react';
import { Image } from 'react-native';
import { IMAGES } from '../../../utils/images';
import { generateStyle } from './styles';

export const Logo = ({ width, height }) => {
  const styles = generateStyle(width, height);

  return (
    <Image source={IMAGES.LOGO} resizeMode='contain' style={styles.logo} />
  );
};
