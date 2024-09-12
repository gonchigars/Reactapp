import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
//import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
//import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import  Button  from '@mui/material/Button';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
 // width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      //width: '12ch',
      //'&:focus': {
        width: '20ch',
      //},
    },
  },
}));

export default function SearchAppBar() {
  return (
   //<Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed"sx={{backgroundColor:'black'}}>
        <Toolbar>
           <Box sx={{flexGrow:1}}/>
          <Typography
            variant="h3"
            noWrap
            component="div" 
            sx={{ color:'orange', display: { xs: 'none', sm: 'block' } }}
          >
            NETFLIX
          </Typography>
          <Box sx={{flexGrow:0.5}}/>
          <Box sx={{display:'flex',justifyContent:'flex-end',width:'auto'}}>
          <Search>
            <SearchIconWrapper sx={{color:'orange'}}>
              
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search for a movie"
              sx={{color:'orange'}}
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          <Button
          sx={{color:'orange',fontSize:'20px'}}
        
          color="inherit">LOGIN</Button>
          </Box>
        </Toolbar>
      </AppBar>
  );
}
