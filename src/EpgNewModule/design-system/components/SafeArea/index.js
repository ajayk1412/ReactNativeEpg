import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../../hooks/useTheme';
import { generateStyle } from './styles';

export const SafeArea = ({ children }) => {
  const { colors } = useTheme();

  const styles = generateStyle(colors);

  return (
    <>
      <SafeAreaView style={styles.top} />
      <SafeAreaView style={styles.bottom}>{children}</SafeAreaView>
    </>
  );
};
