# Day 4: React Hooks, State Management, and TMDB Search

We'll update our existing components to use state more effectively, create custom hooks for fetching movie data, and implement search functionality using the TMDB API.

## 1. Update TMDB API service

Update `src/services/tmdbApi.js`:

```javascript
import axios from "axios";
import { TMDB_API_KEY, TMDB_BASE_URL } from "../config/tmdb";

const tmdbApi = axios.create({
  baseURL: TMDB_BASE_URL,
  params: {
    api_key: TMDB_API_KEY,
  },
});

export const getPopularMovies = async (page = 1) => {
  try {
    const response = await tmdbApi.get("/movie/popular", {
      params: { page },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching popular movies:", error);
    throw error;
  }
};

export const searchMovies = async (query, page = 1) => {
  try {
    const response = await tmdbApi.get("/search/movie", {
      params: { query, page },
    });
    return response.data;
  } catch (error) {
    console.error("Error searching movies:", error);
    throw error;
  }
};

export default tmdbApi;
```

## 2. Create custom hooks for fetching movies

Create a new file `src/hooks/useMovies.js`:

```javascript
import { useState, useEffect, useCallback } from "react";
import { getPopularMovies, searchMovies } from "../services/tmdbApi";

const useMovies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const fetchMovies = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      let data;
      if (searchQuery) {
        data = await searchMovies(searchQuery, page);
      } else {
        data = await getPopularMovies(page);
      }
      setMovies(data.results);
      setTotalPages(data.total_pages);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  }, [searchQuery, page]);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  return {
    movies,
    loading,
    error,
    searchQuery,
    setSearchQuery,
    page,
    setPage,
    totalPages,
  };
};

export default useMovies;
```

## 3. Update MovieGrid component

Update `src/components/MovieGrid.js`:

```jsx
import React from "react";
import { Grid, CircularProgress, Typography, Pagination } from "@mui/material";
import MovieCard from "./MovieCard";
import useMovies from "../hooks/useMovies";

function MovieGrid() {
  const { movies, loading, error, page, setPage, totalPages } = useMovies();

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">Error: {error}</Typography>;
  }

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <>
      <Grid container spacing={2} justifyContent="center">
        {movies.map((movie) => (
          <Grid item key={movie.id} xs={12} sm={6} md={4} lg={3}>
            <MovieCard
              title={movie.title}
              releaseDate={movie.release_date}
              posterPath={movie.poster_path}
            />
          </Grid>
        ))}
      </Grid>
      <Pagination
        count={totalPages}
        page={page}
        onChange={handlePageChange}
        color="primary"
        sx={{ mt: 4, display: "flex", justifyContent: "center" }}
      />
    </>
  );
}

export default MovieGrid;
```

## 4. Update Header component to include search functionality

Update `src/components/Header.js`:

```jsx
import React, { useState } from "react";
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

function Header({ handleDrawerToggle, onSearch }) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    onSearch(searchQuery);
  };

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
        <form onSubmit={handleSearchSubmit}>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search for a Movie..."
              inputProps={{ "aria-label": "search" }}
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </Search>
        </form>
        <Button color="inherit">LOGIN</Button>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
```

## 5. Update App component to manage search state

Update `src/App.js`:

```jsx
import React, { useState } from "react";
import {
  CssBaseline,
  ThemeProvider,
  createTheme,
  Box,
  Toolbar,
} from "@mui/material";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import MovieGrid from "./components/MovieGrid";
import useMovies from "./hooks/useMovies";

const theme = createTheme({
  palette: {
    primary: {
      main: "#2196f3",
    },
  },
});

function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { setSearchQuery } = useMovies();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: "flex" }}>
        <Header
          handleDrawerToggle={handleDrawerToggle}
          onSearch={handleSearch}
        />
        <Sidebar
          mobileOpen={mobileOpen}
          handleDrawerToggle={handleDrawerToggle}
        />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar /> {/* This empty Toolbar acts as a spacer */}
          <MovieGrid />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
```

These changes implement React Hooks for state management and add search functionality using the TMDB API:

1. We've updated the TMDB API service to include a search function.
2. We've created a custom `useMovies` hook that manages the fetching of movie data, including loading and error states, pagination, and search functionality.
3. The `MovieGrid` component now uses this custom hook to fetch and display movies, showing loading and error states when appropriate, and includes pagination.
4. The `Header` component now includes a functional search input that triggers a search when submitted.
5. The `App` component now manages the search state and passes the search function to the Header component.

To test these changes:

1. Save all the modified files.
2. If your development server is not running, start it with `npm start`.
3. Open your browser and check the application. You should now see the movie grid populated with data from the TMDB API, with working pagination and search functionality.

These changes provide a solid foundation for state management in your app. In the next steps, we'll work on implementing Redux for global state management and refine the existing functionality.
