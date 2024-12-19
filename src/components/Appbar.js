import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import TextField from '@mui/material/TextField';
import MovieCreationIcon from '@mui/icons-material/MovieCreation';
import SwipeableTemporaryDrawer from './Sidebar';
import BasicMenu from './LoginDialog'
import LoginDialog from './LoginDialog'; 
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';

export default function ButtonAppBar() {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openDialog, setOpenDialog] = React.useState(false);

  const open = Boolean(anchorEl);

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

   const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{ bgcolor: '#232f3e' }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={toggleDrawer("left",true)}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            <Typography variant="h6" sx={{fontFamily:'Tahoma '}}>
             <b> CINEMAIFY</b>
            </Typography>
            <MovieCreationIcon sx={{ mt: 0.5, ml: 1 }} />
            <TextField
              variant="outlined"
              placeholder="Search here...."
              size="small"
              sx={{ bgcolor: 'white',borderRadius: 1, ml:90,minWidth: '200px', maxWidth: '500px' }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          <Button color="inherit" onClick={handleDialogOpen} sx={{fontFamily:'unset'}}>
            Login
          </Button>
        </Toolbar>
      </AppBar>
      <SwipeableTemporaryDrawer state={state} setState={setState} toggleDrawer={toggleDrawer} />
      <BasicMenu
        anchorEl={anchorEl}
        open={open}
        handleClose={handleClose}
      />
      <LoginDialog open={openDialog} handleClose={handleDialogClose} />
    </Box>
  );
}
