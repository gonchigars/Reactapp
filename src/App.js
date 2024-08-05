import React, { useState } from "react";
import { CssBaseline, ThemeProvider, createTheme, Box } from "@mui/material";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

const theme = createTheme({
  palette: {
    primary: {
      main: "#2196f3", // This is for the header color
    },
    background: {
      default: "#ffffff", // This ensures the default background is white
    },
  },
});

function App() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
        <Header handleDrawerToggle={handleDrawerToggle} />
        <Box sx={{ display: "flex", flexGrow: 1 }}>
          <Sidebar
            mobileOpen={mobileOpen}
            handleDrawerToggle={handleDrawerToggle}
          />
          <Box
            component="main"
            sx={{ flexGrow: 1, p: 3, bgcolor: "background.default" }}
          >
            {/* Main content will go here */}
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
