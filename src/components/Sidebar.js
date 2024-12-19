import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material';
import { Home, Movie, Favorite, Settings, FlashOn, Whatshot, EmojiEmotions, Theaters, MoodBad, Science, Star, Slideshow, LocalMovies, Tv, Public, Palette, HistoryEdu, School } from '@mui/icons-material';

const drawerWidth = 240;

const Sidebar = ({ open, onClose }) => {
  const menuItems = [
    { text: 'Home', icon: <Home />, color: '#ff7043' },
    { text: 'Movies', icon: <Movie />, color: '#42a5f5' },
    { text: 'Favorites', icon: <Favorite />, color: '#e57373' },
    { text: 'Action', icon: <FlashOn />, color: '#f44336' },
    { text: 'Adventure', icon: <Whatshot />, color: '#ff9800' },
    { text: 'Comedy', icon: <EmojiEmotions />, color: '#ffeb3b' },
    { text: 'Drama', icon: <Theaters />, color: '#9e9e9e' },
    { text: 'Horror', icon: <MoodBad />, color: 'red' },
    { text: 'Sci-Fi', icon: <Science />, color: '#8e24aa' },
    { text: 'Fantasy', icon: <Star />, color: '#ab47bc' },
    { text: 'Romance', icon: <Favorite />, color: '#e91e63' },
    { text: 'Thriller', icon: <Slideshow />, color: '#d32f2f' },
    { text: 'Mystery', icon: <LocalMovies />, color: '#7b1fa2' },
    { text: 'Animation', icon: <Tv />, color: '#64b5f6' },
    { text: 'Documentary', icon: <Public />, color: '#00bfa5' },
    { text: 'Musical', icon: <Palette />, color: '#f06292' },
    { text: 'Western', icon: <HistoryEdu />, color: '#795548' },
    { text: 'Crime', icon: <School />, color: '#9e9e9e' },
    { text: 'War', icon: <Public />, color: '#d84315' },
    { text: 'Historical', icon: <HistoryEdu />, color: '#607d8b' },
    { text: 'Biographical', icon: <School />, color: '#039be5' },
    { text: 'Family', icon: <Favorite />, color: '#ff80ab' },
    { text: 'Noir', icon: <Theaters />, color: '#424242' },
  ];

  const bottomMenuItems = [
    { text: 'Settings', icon: <Settings />, color: '#616161' },
  ];

  return (
    <Drawer
      variant="persistent"
      anchor="left"
      open={open}
      onClose={onClose}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          top: '64px',
          height: 'calc(100% - 64px)',
          backgroundColor: '#2C2C2C', // Dark Charcoal background color
          color: '#ffffff', // Ensure text color is white for contrast
        },
      }}
    >
      <List>
        {menuItems.map((item) => (
          <ListItem button key={item.text}>
            <ListItemIcon sx={{ color: item.color }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List sx={{ marginTop: 'auto' }}>
        {bottomMenuItems.map((item) => (
          <ListItem button key={item.text}>
            <ListItemIcon sx={{ color: item.color }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
