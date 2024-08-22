import React from 'react'; 
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import StarIcon from '@mui/icons-material/Star';
import MovieFilterIcon from '@mui/icons-material/MovieFilter';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import ExploreIcon from '@mui/icons-material/Explore';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import TheaterComedyIcon from '@mui/icons-material/TheaterComedy';
import BugReportIcon from '@mui/icons-material/BugReport';
import ScienceIcon from '@mui/icons-material/Science';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const categories = [
  { name: 'Popular', icon: <WhatshotIcon /> },
  { name: 'Upcoming', icon: <NewReleasesIcon /> },
  { name: 'Top Rated', icon: <StarIcon /> },
  { name: 'Now Playing', icon: <MovieFilterIcon /> },
];

const genres = [
  { name: 'Action', icon: <EmojiEventsIcon /> },
  { name: 'Adventure', icon: <ExploreIcon /> },
  { name: 'Comedy', icon: <SentimentVerySatisfiedIcon /> },
  { name: 'Drama', icon: <TheaterComedyIcon /> },
  { name: 'Horror', icon: <BugReportIcon /> },
  { name: 'Sci-Fi', icon: <ScienceIcon /> },
  { name: 'Romance', icon: <FavoriteIcon /> },
];

const theme = createTheme({
  palette: {
    primary: {
      main: '#000000', // Royal Black
    },
    text: {
      primary: '#ffffff', // White
    },
  },
});

const MovieCategoryBar = ({ drawerOpen, toggleDrawer }) => {
  const list = () => (
    <Box
      sx={{ width: 250, bgcolor: 'primary.main', color: 'text.primary', height: '100%' }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItem>
          <ListItemText
            primary="CATEGORIES"
            sx={{ textAlign: 'center', width: '100%' }}
          />
        </ListItem>
        {categories.map((category) => (
          <ListItem button key={category.name} sx={{ justifyContent: 'center' }}>
            <ListItemIcon sx={{ color: 'text.primary' }}>{category.icon}</ListItemIcon>
            <ListItemText primary={category.name} />
          </ListItem>
        ))}
      </List>
      <Divider sx={{ bgcolor: 'text.primary' }} />
      <List>
        <ListItem>
          <ListItemText
            primary="GENRES"
            sx={{ textAlign: 'center', width: '100%' }}
          />
        </ListItem>
        {genres.map((genre) => (
          <ListItem button key={genre.name} sx={{ justifyContent: 'center' }}>
            <ListItemIcon sx={{ color: 'text.primary' }}>{genre.icon}</ListItemIcon>
            <ListItemText primary={genre.name} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <ThemeProvider theme={theme}>
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        {list()}
      </Drawer>
    </ThemeProvider>
  );
};

export default MovieCategoryBar;

