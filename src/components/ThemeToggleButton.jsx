import React from "react";
import { useThemeContext } from "../context/ThemeContext";
import { Button, Tooltip } from "@mui/material";
import { DarkMode, LightMode } from "@mui/icons-material";

const ThemeToggleButton = () => {
  const { mode, toggleTheme } = useThemeContext();

  return (
    <Tooltip arrow title={mode === "light" ? "Light Mode" : "Dark Mode"}>
      <Button onClick={toggleTheme} variant="contained">
        {mode === "light" ? <DarkMode /> : <LightMode />}
      </Button>
    </Tooltip>
  );
};

export default ThemeToggleButton;
