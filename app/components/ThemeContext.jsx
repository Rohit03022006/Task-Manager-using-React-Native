import React, { createContext, useContext, useState } from 'react';
import { Appearance } from 'react-native';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(Appearance.getColorScheme() === 'dark');

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  const theme = {
    isDarkMode,
    toggleTheme,
    colors: {
      background: isDarkMode ? '#1a1a1a' : '#ffffff',
      text: isDarkMode ? '#ffffff' : '#000000',
      card: isDarkMode ? '#2d2d2d' : '#f5f5f5',
      border: isDarkMode ? '#404040' : '#dddddd',
      primary: '#9ac91aff',
      completed: isDarkMode ? '#34C759' : '#28a745',
      highPriority: '#FF3B30',
      mediumPriority: '#FF9500',
      lowPriority: '#4CD964',
    }
  };

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};