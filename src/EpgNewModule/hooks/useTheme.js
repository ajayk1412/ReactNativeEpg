export const useTheme = () => {
  const colors = {
    app: {
      ACCENT: '#FFFFFF',
      ACCENT_2: '#D3D3D3',
      BACKGROUND: '#200833',
      FORTIARY_10: 'rgba(241, 241, 241, 0.1)',
      FORTIARY_30: 'rgba(241, 241, 241, 0.3)',
      FORTIARY: '#F1F1F1',
      NO_PROGRAM: '#C1BDD0',
      PRIMARY: '#EC0000',
      PROGRAM_CARD_1: '#200833',
      PROGRAM_CARD_2: '#32253C',
      SECONDARY: '#000000',
      TERTIARY: '#200833',
      TOGGLE_ACTIVE: '#000',
    },
    app_light: {
      ACCENT: '#FFFFFF',
      PROGRAM_CARD_1: '#F2F0F3',
      PROGRAM_CARD_2: '#FFD3D4',
      PROGRAM_TITLE: '#200833',
    },
    default: {
      BLACK: '#000000',
      FOG: '#F4F4F4',
      GRAPHITE: '#5B5B5F',
      ICE: '#ECECEC',
      INOX: '#D3D3D3',
      SAND: '#F6F3EA',
      TRANSPARENT: 'transparent',
      WHITE: '#FFFFFF',
    },
  };

  return {
    isDarkMode: true,
    colors,
    currentTheme: 'dark',
  };
};
