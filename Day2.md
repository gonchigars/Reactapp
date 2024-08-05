# Day 2: Sidebar Component

## Step 1: Create the Sidebar component

1. Create a new file `src/components/Sidebar.js`:

```jsx
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
```

## Step 2: Update App.js to include the Sidebar

2. Modify `src/App.js` to include the Sidebar component:

```jsx
import React, { useState } from "react";
import { CssBaseline, ThemeProvider, createTheme, Box } from "@mui/material";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

const theme = createTheme({
  palette: {
    primary: {
      main: "#2196f3",
    },
  },
});

function App() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: "flex" }}>
        <Header handleDrawerToggle={handleDrawerToggle} />
        <Sidebar
          mobileOpen={mobileOpen}
          handleDrawerToggle={handleDrawerToggle}
        />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          {/* Main content will go here */}
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
```

## Step 3: Update Header.js to include a menu button for mobile

3. Modify `src/components/Header.js` to add a menu button for toggling the sidebar on mobile:

```jsx
import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  InputBase,
  Button,
  IconButton,
  alpha,
  styled,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";

// ... (keep the existing styled components)

function Header({ handleDrawerToggle }) {
  return (
    <AppBar
      position="fixed"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { sm: "none" } }}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ display: { xs: "none", sm: "block" } }}
        >
          MovieApp
        </Typography>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search for a Movie..."
            inputProps={{ "aria-label": "search" }}
          />
        </Search>
        <Button color="inherit">LOGIN</Button>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
```

This implementation creates a responsive sidebar with categories and genres, matching the layout in the image. The sidebar is permanent on desktop and toggleable on mobile devices.

Key points:

- We use Material UI's `Drawer` component for the sidebar.
- The sidebar content is split into Categories and Genres, each with its own list and icons.
- We use `useMediaQuery` to determine if we're on a desktop or mobile device, adjusting the sidebar behavior accordingly.
- The `App.js` file now manages the state for opening/closing the mobile sidebar.
- The Header component has been updated to include a menu button for toggling the sidebar on mobile devices.

To test the implementation:

1. Save all the changes.
2. If your development server is not running, start it with `npm start`.
3. Open your browser and check the application. You should see the sidebar on desktop, and on mobile devices, you should be able to toggle it with the menu button.

Next steps would involve creating the main content area with the movie grid, which we'll cover in the following days.
