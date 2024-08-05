import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
  useTheme,
  useMediaQuery,
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

function Sidebar({ mobileOpen, handleDrawerToggle }) {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("sm"));

  const drawer = (
    <div>
      <Typography variant="h6" sx={{ my: 2, textAlign: "center" }}>
        Categories
      </Typography>
      <List>
        {categories.map((category) => (
          <ListItem button key={category.name}>
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
          <ListItem button key={genre.name}>
            <ListItemIcon>{genre.icon}</ListItemIcon>
            <ListItemText primary={genre.name} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Drawer
      variant={isDesktop ? "permanent" : "temporary"}
      open={isDesktop ? true : mobileOpen}
      onClose={handleDrawerToggle}
      ModalProps={{
        keepMounted: true, // Better open performance on mobile.
      }}
      sx={{
        display: { xs: "block", sm: "block" },
        "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
      }}
    >
      {drawer}
    </Drawer>
  );
}

export default Sidebar;
