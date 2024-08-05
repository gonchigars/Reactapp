# Day 1: Project Setup and Header Component

## Step 1: Set up a new React project using Create React App

1. Open your terminal and run:
   ```
   npx create-react-app movie-app
   cd movie-app
   ```

## Step 2: Install Material UI and its dependencies

1. Install Material UI core and icons:
   ```
   npm install @mui/material @emotion/react @emotion/styled @mui/icons-material
   ```

## Step 3: Create a basic app structure

1. Replace the contents of `src/App.js` with:

```jsx
import React from "react";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import Header from "./components/Header";

const theme = createTheme({
  palette: {
    primary: {
      main: "#2196f3", // Blue color similar to the image
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        <Header />
        {/* Other components will go here */}
      </div>
    </ThemeProvider>
  );
}

export default App;
```

## Step 4: Implement the Header component

1. Create a new file `src/components/Header.js`:

```jsx
import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  InputBase,
  Button,
  alpha,
  styled,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

function Header() {
  return (
    <AppBar position="static">
      <Toolbar>
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

This implementation creates a responsive header with a logo (text in this case), a search bar, and a login button. The search bar expands on larger screens and collapses on smaller ones.

To run your app:

```
npm start
```

This will start your development server, and you should see your new header component rendered at the top of the page.

Key points:

- We're using Material UI's `AppBar` and `Toolbar` for the basic structure.
- The search input is custom-styled using Material UI's `styled` utility to match the design in the image.
- The component is responsive, hiding the text logo on very small screens.
- We've used a blue theme color to match the image, but you can adjust this in the theme configuration in `App.js`.

Next steps would involve creating the sidebar and main content area, which we'll cover in the following days.
