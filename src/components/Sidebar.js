import * as React from 'react';
import { styled, alpha, useTheme, createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import ListItemText from '@mui/material/ListItemText';
import ActionIcon from '@mui/icons-material/Star';
import AdventureIcon from '@mui/icons-material/Explore';
import BiographyIcon from '@mui/icons-material/Book';
import ComedyIcon from '@mui/icons-material/EmojiEmotions';
import CrimeIcon from '@mui/icons-material/Warning';
import DramaIcon from '@mui/icons-material/EmojiEvents';
import DocumentaryIcon from '@mui/icons-material/Science';
import FantasyIcon from '@mui/icons-material/StarRate';
import FamilyIcon from '@mui/icons-material/FamilyRestroom';
import HorrorIcon from '@mui/icons-material/Grain';
import MysteryIcon from '@mui/icons-material/Psychology';
import RomanceIcon from '@mui/icons-material/Favorite';
import SciFiIcon from '@mui/icons-material/StarBorder';
import SportIcon from '@mui/icons-material/SportsSoccer';
import ThrillerIcon from '@mui/icons-material/FlashOn';
import LoginIcon from '@mui/icons-material/AccountCircle';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ClickAwayListener from '@mui/material/ClickAwayListener';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const PersistentAppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
  backgroundColor: '#000',
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'space-between',
}));

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
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
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      paper: '#f5f5f5',
    },
  },
});

export default function CombinedComponent() {
  const muiTheme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [menuAnchorEl, setMenuAnchorEl] = React.useState(null);
  const openMenu = Boolean(menuAnchorEl);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleLoginClick = (event) => {
    console.log("Login button clicked");
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    console.log("Menu closed");
    setMenuAnchorEl(null);
  };

  const handleClickAway = () => {
    console.log("Clicked away");
    setMenuAnchorEl(null);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <PersistentAppBar position="fixed" open={open}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{ mr: 2, ...(open && { display: 'none' }) }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
            >
              Movies-Hub
            </Typography>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
              />
            </Search>
            <IconButton
              color="inherit"
              aria-label="login"
              sx={{ ml: 2 }}
              onClick={handleLoginClick}
            >
              <LoginIcon />
            </IconButton>
          </Toolbar>
        </PersistentAppBar>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
          variant="persistent"
          anchor="left"
          open={open}
        >
          <DrawerHeader>
            <Typography variant="h6" noWrap>
              Genres
            </Typography>
            <IconButton onClick={handleDrawerClose}>
              {muiTheme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            {[
              { text: 'Action', icon: <ActionIcon /> },
              { text: 'Adventure', icon: <AdventureIcon /> },
              { text: 'Biography', icon: <BiographyIcon /> },
              { text: 'Comedy', icon: <ComedyIcon /> },
              { text: 'Crime', icon: <CrimeIcon /> },
              { text: 'Drama', icon: <DramaIcon /> },
              { text: 'Documentary', icon: <DocumentaryIcon /> },
              { text: 'Fantasy', icon: <FantasyIcon /> },
              { text: 'Family', icon: <FamilyIcon /> },
              { text: 'Horror', icon: <HorrorIcon /> },
              { text: 'Mystery', icon: <MysteryIcon /> },
              { text: 'Romance', icon: <RomanceIcon /> },
              { text: 'Sci-Fi', icon: <SciFiIcon /> },
              { text: 'Sport', icon: <SportIcon /> },
              { text: 'Thriller', icon: <ThrillerIcon /> },
            ].map(({ text, icon }) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>{icon}</ListItemIcon>
                  <ListItemText 
                    primary={text}
                    sx={{ color: 'grey' }} // Change font color here
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
        </Drawer>
        <Main open={open}>
          <DrawerHeader />
        </Main>
      </Box>

      {/* Menu for Login/Signup */}
      <ClickAwayListener onClickAway={handleClickAway}>
        <Menu
          anchorEl={menuAnchorEl}
          open={openMenu}
          onClose={handleMenuClose}
          PaperProps={{
            sx: {
              width: '200px',
            },
          }}
        >
          <MenuItem onClick={handleMenuClose}>Log In</MenuItem>
          <MenuItem onClick={handleMenuClose}>Sign Up</MenuItem>
        </Menu>
      </ClickAwayListener>
    </ThemeProvider>
  );
}
