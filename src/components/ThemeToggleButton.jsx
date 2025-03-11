import React from "react";
import { useThemeContext } from "../context/ThemeContext";
import { Button } from "@mui/material";
import { DarkMode, LightMode } from "@mui/icons-material";

const ThemeToggleButton = () => {
  const { mode, toggleTheme } = useThemeContext();

  return (
    <Button onClick={toggleTheme} variant="contained">
      {mode === "light" ? <DarkMode /> : <LightMode />}
    </Button>
  );
};

export default ThemeToggleButton;
