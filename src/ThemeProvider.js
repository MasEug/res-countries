import React, { useState } from 'react';

export const ThemeContext = React.createContext('theme-light');

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('theme-light');

  const toggleTheme = () => {
    setTheme(theme === "theme-light" ? "theme-dark" : "theme-light");
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};