import React from 'react';
import Box from '@mui/material/Box';
import Header from './components/Header';
import MovieCategoryBar from './components/Sidebar';
import MovieGrid from './components/MovieGrid';
import MovieGridRedux from "./components/MovieGridRedux.js";
import './App.css'

function App() {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };


  return (

    <Box sx={{ flexGrow: 1 }}>
      <Header
        toggleDrawer={toggleDrawer}
        handleOpenUserMenu={handleOpenUserMenu}
        handleCloseUserMenu={handleCloseUserMenu}
        anchorElUser={anchorElUser}
      />
      <MovieCategoryBar
        drawerOpen={drawerOpen}
        toggleDrawer={toggleDrawer}
      />
      
      <Box 
        component="main"
        sx={{
          flexGrow: 1,
          marginLeft: drawerOpen ? '250px' : '0px', // Adjust margin based on drawer state
          marginTop: '64px', // Space for the header
          transition: 'margin-left 0.3s',
          overflow: 'auto',
          backgroundColor: '#000000', // Background color
          color: '#ffffff', // Text color
          width: '100%',
        }}
      >

        <MovieGridRedux />
        
      {/* <main style={{ marginLeft: "240px", marginTop: "-10px" }}>
      </main> */}
     {/*} <MovieGrid /> */}
    </Box>
    </Box>
    
  );
}

export default App;
