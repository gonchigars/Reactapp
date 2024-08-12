// src/components/Sidebar.js
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";
import MovieIcon from "@mui/icons-material/Movie";
import LocalMoviesIcon from "@mui/icons-material/LocalMovies";
import TheatersIcon from "@mui/icons-material/Theaters";
import WhatshotIcon from "@mui/icons-material/Whatshot";

const drawerWidth = 240;

function ResponsiveDrawer() {
  const navigate = useNavigate();

  const categories = [
    { name: "Popular", icon: <WhatshotIcon />, path: "/" },
    { name: "Action", icon: <MovieIcon />, path: "/action" },
    { name: "Adventure", icon: <LocalMoviesIcon />, path: "/adventure" },
    { name: "Comedy", icon: <TheatersIcon />, path: "/comedy" },
  ];

  const drawer = (
    <div>
      <Toolbar />
      <List>
        {categories.map((category) => (
          <ListItem key={category.name} disablePadding>
            <ListItemButton onClick={() => navigate(category.path)}>
              <ListItemIcon>{category.icon}</ListItemIcon>
              <ListItemText primary={category.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Drawer
      variant="permanent"
      sx={{
        display: { xs: "none", sm: "block" },
        "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
      }}
      open
    >
      {drawer}
    </Drawer>
  );
}

export default ResponsiveDrawer;
