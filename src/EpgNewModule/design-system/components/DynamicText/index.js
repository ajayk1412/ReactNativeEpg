import React from 'react';
import { Text } from 'react-native';
import { useTheme } from '../../../hooks/useTheme';
import { styles } from './styles';

export const DynamicText = ({
  children,
  style,
  variant,
  bold,
  color,
  align,
  getTextLayout,
  ...props
}) => {
  const { colors } = useTheme();

  const appliedStyles = [styles[variant]];

  appliedStyles.push({ fontWeight: 'normal' });
  appliedStyles.push({ color: colors.app.ACCENT });

  if (bold) {
    appliedStyles.push({ fontWeight: 'bold' });
  }

  if (color) {
    appliedStyles.push({ color });
  }

  if (align) {
    appliedStyles.push({ textAlign: align });
  }

  const handleOnTextLayout = (e) => {
    const { width, height, x, y } = e.nativeEvent.layout;

    getTextLayout && getTextLayout({ width, height, x, y });
  };

  if (getTextLayout) {
    return (
      <Text
        onLayout={handleOnTextLayout}
        style={[...appliedStyles, style]}
        {...props}
      >
        {children}
      </Text>
    );
  }

  return (
    <Text style={[...appliedStyles, style]} {...props}>
      {children}
    </Text>
  );
};
