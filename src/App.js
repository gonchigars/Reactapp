import React, { useState } from 'react';
import { Box, CssBaseline } from '@mui/material';
import ButtonAppBar from './Components/AppBar';  
import Sidebar from './Components/Sidebar';     
import MovieGrid from './Components/MovieGrid';  

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <ButtonAppBar toggleSidebar={toggleSidebar} />
      <Sidebar open={sidebarOpen} onClose={toggleSidebar} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: sidebarOpen ? `calc(100% - 240px)` : '100%' },
          transition: 'width 0.3s',
          marginTop: '24px',
          marginLeft: sidebarOpen ? '240px' : '0',
        }}
      >
        <h1>Welcome to ReelFusion</h1>
        <MovieGrid />
        {/* The getLabelText component was not used correctly in the previous code. 
            If it's meant to be part of the MovieGrid or used somewhere else, 
            make sure to import and use it properly. */}
      </Box>
    </Box>
  );
}

export default App;
