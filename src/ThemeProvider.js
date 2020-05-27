import React, { useState } from 'react';

export const ThemeContext = React.createContext('theme-light');

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('theme-light');

  const toggleTheme = () => {
    setTheme(theme === "theme-light" ? "theme-dark" : "theme-light");
  };

  const color = theme === "theme-light" ? "#FFF" : "#333";
  const backgroundColor = theme === "theme-light" ? "hsl(209, 23%, 22%)" : "hsl(0, 0%, 98%)";

  document.body.style.color = color;
  document.body.style.backgroundColor = backgroundColor;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};