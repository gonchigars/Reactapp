import React from "react";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
  Box,
} from "@mui/material";
import {
  MovieFilter,
  Star,
  Upcoming,
  LocalMovies,
  EmojiEmotions,
  TheaterComedy,
  Theaters,
} from "@mui/icons-material";

const drawerWidth = 240;

const categories = [
  { name: "Popular", icon: <MovieFilter /> },
  { name: "Top Rated", icon: <Star /> },
  { name: "Upcoming", icon: <Upcoming /> },
];

const genres = [
  { name: "Action", icon: <LocalMovies /> },
  { name: "Adventure", icon: <Theaters /> },
  { name: "Animation", icon: <EmojiEmotions /> },
  { name: "Comedy", icon: <TheaterComedy /> },
];

function Sidebar() {
  return (
    <Box
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
    >
      <Typography variant="h6" sx={{ my: 2, textAlign: "center" }}>
        Categories
      </Typography>
      <List>
        {categories.map((category) => (
          <ListItem key={category.name}>
            <ListItemIcon>{category.icon}</ListItemIcon>
            <ListItemText primary={category.name} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <Typography variant="h6" sx={{ my: 2, textAlign: "center" }}>
        Genres
      </Typography>
      <List>
        {genres.map((genre) => (
          <ListItem key={genre.name}>
            <ListItemIcon>{genre.icon}</ListItemIcon>
            <ListItemText primary={genre.name} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default Sidebar;
