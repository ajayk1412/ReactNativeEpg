import {
  ColorsDefault,
  ColorsDark,
  ColorsLight,
} from '../design-system/colors';

export const getColorWithTransparency = (color, alpha) => {
  const opacity = Math.round(alpha * 255);
  return color + opacity.toString(16).toUpperCase();
};

export const getThemeColors = (currentTheme) => {
  if (currentTheme === 'dark') {
    return {
      default: ColorsDefault,
      app: ColorsDark,
    };
  }

  return {
    default: ColorsDefault,
    app: ColorsLight,
  };
};
