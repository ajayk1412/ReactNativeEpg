import React, { createContext, useState } from 'react';

export const ThemeContext = createContext(null);

export const ThemeProvider = (props) => {
  const [currentTheme, setCurrentTheme] = useState('dark');

  const value = { currentTheme, setCurrentTheme };

  return (
    <ThemeContext.Provider value={value}>
      {props.children}
    </ThemeContext.Provider>
  );
};
