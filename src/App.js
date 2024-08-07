import logo from './logo.svg';
import './App.css';
import SearchAppBar from './components/Header.js';
import SidebarWithButton from './components/Sidebar.js';
import MovieGrid from './components/MovieGrid.js';




// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <SearchAppBar/>
//         <SidebarWithButton/>
//         <MovieGrid/>
//         <MovieCard/> 
//       </header>
//     </div>
//   );
// }

// export default App;

import React, { useState } from "react";
import {
  CssBaseline,
  ThemeProvider,
  createTheme,
  Box,
  Toolbar,
} from "@mui/material";


const theme = createTheme({
  palette: {
    background:{
      default:'black',
    },
    primary: {
      main: "#2196f3",
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
      <Box sx={{ display: "flex",flexDirection:"column",width:"100%" }}>
        <SearchAppBar handleDrawerToggle={handleDrawerToggle} />
        <SidebarWithButton
          mobileOpen={mobileOpen}
          handleDrawerToggle={handleDrawerToggle}
        />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar /> {/* This empty Toolbar acts as a spacer */}
          <MovieGrid />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;