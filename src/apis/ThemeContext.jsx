import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  return useContext(ThemeContext);
};

export const ThemeProvider = ({ children }) => {
  const defaultColor = '#324264'; 

  const [themeColor, setThemeColor] = useState(() => {
    const savedColor = localStorage.getItem('themeColor');
    return savedColor ? savedColor : defaultColor; 
  });

  const handleColorChange = (color) => {
    setThemeColor(color);
    localStorage.setItem('themeColor', color); 
  };

  const resetToDefault = () => {
    setThemeColor(defaultColor); 
    localStorage.removeItem('themeColor'); 
  };

  return (
    <ThemeContext.Provider value={{ themeColor, handleColorChange, resetToDefault }}>
      {children}
    </ThemeContext.Provider>
  );
};
