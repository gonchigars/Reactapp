import React from "react";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import Header from "./components/Header";

const theme = createTheme({
  palette: {
    primary: {
      main: "#2196f3", // Blue color similar to the image
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        <Header />
        {/* Other components will go here */}
      </div>
    </ThemeProvider>
  );
}

export default App;
