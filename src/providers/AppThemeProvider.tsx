import React from "react";
import { RootState } from "models";
import { useSelector } from "react-redux";
import { createTheme, ThemeProvider } from "@mui/material";

export const AppThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const { theme } = useSelector(({ app }: RootState) => app);
  return (
    <ThemeProvider
      theme={createTheme({
        palette: {
          mode: theme,
          primary:
            theme === "dark"
              ? {
                  main: "#8272db"
                }
              : {
                  main: "#5051c1"
                }
        }
      })}
    >
      {children}
    </ThemeProvider>
  );
};
