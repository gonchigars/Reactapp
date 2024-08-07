import * as React from 'react';
import { createTheme, ThemeProvider, styled, useTheme } from '@mui/material/styles';
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
import ListItemText from '@mui/material/ListItemText';
import NightlightRoundIcon from '@mui/icons-material/NightlightRound'; // Horror icon
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied'; // Comedy icon
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter'; // Action icon
import StarIcon from '@mui/icons-material/Star'; // Anime icon
import TheatersIcon from '@mui/icons-material/Theaters'; // Thriller/Drama icon
import ExploreIcon from '@mui/icons-material/Explore'; // Adventure icon
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { red, blue } from '@mui/material/colors';

// Define your theme with Raleway font and red color for AppBar text
const theme = createTheme({
  typography: {
    fontFamily: 'Raleway, Arial, sans-serif',
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: 'Raleway, Arial, sans-serif',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontFamily: 'Raleway, Arial, sans-serif',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          color: red[500], // Set the AppBar text color to red
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          color: red[500], // Ensure the Toolbar text color is also red
        },
      },
    },
  },
});

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
    })
  }),
);

const AppBar = styled(MuiAppBar, {
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
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function PersistentDrawerLeft() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [dialogOpen, setDialogOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="fixed" open={open} sx={{ bgcolor: "#00FFFF", color: 'red' }}>
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
            <Typography variant="h4" noWrap component="div" sx={{ flexGrow: 1, color: 'red' }}>
          
              <b> NETFLIX 2.O</b>
            </Typography>
            <TextField
              variant="outlined"
              size="small"
              placeholder="Search..."
              sx={{ mr: 2, backgroundColor: 'white', borderRadius: 1 }}
            />
            <Button color="inherit" onClick={handleDialogOpen}>Login</Button>
          </Toolbar>
        </AppBar>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
              backgroundColor: '#00FFFF', // Set sidebar background color to black
              color: 'white', // Optional: Set text color to white for better contrast
            },
          }}
          variant="persistent"
          anchor="left"
          open={open}
        >
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </DrawerHeader>
          <Divider sx={{ backgroundColor: 'white' }} />
          
          <List>
            <Typography sx={{mb:5,mt:5,variant:"h2",color:'white'}}>
              <b>GENRE</b>
              </Typography>
            {['HORROR', 'COMEDY', 'ACTION', 'ANIME'].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {text === 'HORROR' && <NightlightRoundIcon sx={{ color: 'red' }} />}
                    {text === 'COMEDY' && <SentimentVerySatisfiedIcon sx={{ color: 'red' }} />}
                    {text === 'ACTION' && <FitnessCenterIcon sx={{ color: 'red'}} />}
                    {text === 'ANIME' && <StarIcon sx={{ color: 'red' }} />}
                  </ListItemIcon>
                  <ListItemText primary={text} sx={{ color: 'red' }} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider sx={{ backgroundColor: 'white' }} />
          <List>
            {['THRILLER', 'ADVENTURE', 'DRAMA'].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {text === 'THRILLER' && <TheatersIcon sx={{ color: 'red' }} />}
                    {text === 'ADVENTURE' && <ExploreIcon sx={{ color: 'red' }} />}
                    {text === 'DRAMA' && <TheatersIcon sx={{ color: 'red' }} />}
                  </ListItemIcon>
                  <ListItemText primary={text} sx={{ color: 'red' }} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>
        <Main open={open}>
          <DrawerHeader />
          <Typography paragraph>
            {/* Your main content goes here */}
          </Typography>
          <Typography paragraph>
            {/* Additional content can be added here */}
          </Typography>
        </Main>

        {/* Login Dialog */}
        <Dialog open={dialogOpen} onClose={handleDialogClose}>
          <DialogTitle>Login</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="username"
              label="Username"
              type="text"
              fullWidth
              variant="outlined"
              sx={{ mb: 2 }}
            />
            <TextField
              margin="dense"
              id="password"
              label="Password"
              type="password"
              fullWidth
              variant="outlined"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose}>Cancel</Button>
            <Button onClick={handleDialogClose}>Login</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </ThemeProvider>
  );
}
