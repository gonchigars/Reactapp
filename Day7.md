# Day 7: Refinement and Advanced Features - Complete Code

## 1. src/App.js

```jsx
import React, { useState, useMemo } from "react";
import { Provider } from "react-redux";
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
import ErrorBoundary from "./components/ErrorBoundary";
import store from "./store";

function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? "dark" : "light",
          primary: {
            main: "#2196f3",
          },
        },
      }),
    [darkMode]
  );

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={{ display: "flex" }}>
          <Header
            handleDrawerToggle={handleDrawerToggle}
            toggleDarkMode={toggleDarkMode}
            darkMode={darkMode}
          />
          <Sidebar
            mobileOpen={mobileOpen}
            handleDrawerToggle={handleDrawerToggle}
          />
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <Toolbar />
            <ErrorBoundary>
              <MovieGrid />
            </ErrorBoundary>
          </Box>
        </Box>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
```

## 2. src/components/Header.js

```jsx
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  AppBar,
  Toolbar,
  Typography,
  InputBase,
  IconButton,
  alpha,
  styled,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { setSearchQuery } from "../store/movieSlice";

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

function Header({ handleDrawerToggle, toggleDarkMode, darkMode }) {
  const dispatch = useDispatch();
  const [searchInput, setSearchInput] = useState("");

  const handleSearchChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    dispatch(setSearchQuery(searchInput));
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
              value={searchInput}
              onChange={handleSearchChange}
            />
          </Search>
        </form>
        <IconButton sx={{ ml: 1 }} onClick={toggleDarkMode} color="inherit">
          {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
```

## 3. src/components/MovieGrid.js

```jsx
import React, { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Grid, CircularProgress, Typography, Pagination } from "@mui/material";
import MovieCard from "./MovieCard";
import { fetchMovies, setPage } from "../store/movieSlice";

function MovieGrid() {
  const dispatch = useDispatch();
  const {
    movies,
    loading,
    error,
    page,
    totalPages,
    searchQuery,
    selectedGenreId,
  } = useSelector((state) => state.movies);

  const fetchMoviesData = useCallback(() => {
    dispatch(fetchMovies({ page, searchQuery, genreId: selectedGenreId }));
  }, [dispatch, page, searchQuery, selectedGenreId]);

  useEffect(() => {
    fetchMoviesData();
  }, [fetchMoviesData]);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">Error: {error}</Typography>;
  }

  const handlePageChange = (event, value) => {
    dispatch(setPage(value));
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

export default React.memo(MovieGrid);
```

## 4. src/components/ErrorBoundary.js

```jsx
import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong. Please try refreshing the page.</h1>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
```

## 5. src/components/MovieCard.js

```jsx
import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActionArea,
} from "@mui/material";
import { TMDB_IMAGE_BASE_URL } from "../config/tmdb";

function MovieCard({ title, releaseDate, posterPath }) {
  return (
    <Card sx={{ maxWidth: 345, m: 2 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="500"
          image={
            posterPath
              ? `${TMDB_IMAGE_BASE_URL}${posterPath}`
              : "/placeholder.png"
          }
          alt={title}
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Release Date: {releaseDate || "Unknown"}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default React.memo(MovieCard);
```

## 6. src/store/movieSlice.js

```javascript
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getPopularMovies,
  searchMovies,
  getMoviesByGenre,
  getGenres,
} from "../services/tmdbApi";

export const fetchMovies = createAsyncThunk(
  "movies/fetchMovies",
  async ({ page, searchQuery, genreId }, { rejectWithValue }) => {
    try {
      if (searchQuery) {
        return await searchMovies(searchQuery, page);
      } else if (genreId) {
        return await getMoviesByGenre(genreId, page);
      } else {
        return await getPopularMovies(page);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchGenres = createAsyncThunk(
  "movies/fetchGenres",
  async (_, { rejectWithValue }) => {
    try {
      return await getGenres();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const movieSlice = createSlice({
  name: "movies",
  initialState: {
    movies: [],
    genres: [],
    loading: false,
    error: null,
    searchQuery: "",
    selectedGenreId: null,
    page: 1,
    totalPages: 0,
  },
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
      state.selectedGenreId = null;
      state.page = 1;
    },
    setSelectedGenreId: (state, action) => {
      state.selectedGenreId = action.payload;
      state.searchQuery = "";
      state.page = 1;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload.results;
        state.totalPages = action.payload.total_pages;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchGenres.fulfilled, (state, action) => {
        state.genres = action.payload;
      });
  },
});

export const { setSearchQuery, setSelectedGenreId, setPage } =
  movieSlice.actions;

export default movieSlice.reducer;
```

These changes implement the following improvements:

1. Dark mode toggle in the Header component.
2. Error boundary to catch and display errors gracefully.
3. Performance optimizations using React.memo and useCallback.
4. Improved error handling in the MovieCard component.

To implement these changes:

1. Update the existing files as shown above.
2. Create the new ErrorBoundary.js file in the components folder.
3. If your development server is not running, start it with `npm start`.
4. Open your browser and check the application. You should now have a dark mode toggle, better error handling, and improved performance.

This implementation completes the 7-day plan for building a movie app with React, Material-UI, and Redux. The app now has features like:

- Fetching and displaying movies from TMDB API
- Search functionality
- Genre filtering
- Pagination
- Dark mode
- Responsive design
- Error handling
- Performance optimizations

You can further improve the app by adding features like movie details pages, user authentication, favoriting movies, and more advanced filtering options.
