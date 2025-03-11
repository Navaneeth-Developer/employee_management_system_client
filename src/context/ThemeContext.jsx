import React, { createContext, useContext, useEffect, useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const ThemeContext = createContext();

export const useThemeContext = () => useContext(ThemeContext);

const CustomThemeProvider = ({ children }) => {
  // Check system theme preference
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  // State to manage theme
  const [mode, setMode] = useState(prefersDarkMode ? "dark" : "light");

  // Sync theme with system preference
  useEffect(() => {
    setMode(prefersDarkMode ? "dark" : "light");
  }, [prefersDarkMode]);

  // Material-UI theme setup
  const theme = createTheme({
    palette: {
      mode,
      ...(mode === "dark" && {
        background: { default: "#121212", paper: "#1e1e1e" },
        text: { primary: "#ffffff" },
      }),
    },
  });

  // Toggle between light and dark modes
  const toggleTheme = () => {
    const newMode = mode === "light" ? "dark" : "light";
    setMode(newMode);
    localStorage.setItem("theme", newMode); // Save user preference in localStorage
  };

  // Load saved theme on initial render
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) setMode(savedTheme);
  }, []);

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};

export default CustomThemeProvider;
