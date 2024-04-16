import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../../../hooks/useTheme';
import { DynamicText } from '../../../../design-system/components';
import { generateStyle } from './styles';

export const DynamicButton = ({ text, onPress }) => {
  const { colors } = useTheme();

  const styles = generateStyle(colors);

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.wrapper}>
        <DynamicText variant={'paragraph'} bold>
          {text}
        </DynamicText>
      </View>
    </TouchableOpacity>
  );
};
