import { DynamicStatusBar, SafeArea } from '../../components';
import { useTheme } from '../../../hooks/useTheme';
import React from 'react';
import { View } from 'react-native';
import { generateStyle } from './styles';

export const ScreenWrapper = ({ children, useSafeArea, usePadding }) => {
  const { colors } = useTheme();
  const styles = generateStyle(colors, usePadding);

  if (useSafeArea) {
    return (
      <SafeArea>
        <DynamicStatusBar />
        <View style={styles.wrapper}>{children}</View>
      </SafeArea>
    );
  }

  return (
    <>
      <DynamicStatusBar />
      <View style={styles.wrapper}>{children}</View>
    </>
  );
};
