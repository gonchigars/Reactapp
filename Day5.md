# Day 5: Complete Code for All Changed Files

## 1. src/store/index.js

```javascript
import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "./movieSlice";

const store = configureStore({
  reducer: {
    movies: movieReducer,
  },
});

export default store;
```

## 2. src/store/movieSlice.js

```javascript
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getPopularMovies, searchMovies } from "../services/tmdbApi";

export const fetchMovies = createAsyncThunk(
  "movies/fetchMovies",
  async ({ page, searchQuery }, { rejectWithValue }) => {
    try {
      if (searchQuery) {
        return await searchMovies(searchQuery, page);
      } else {
        return await getPopularMovies(page);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const movieSlice = createSlice({
  name: "movies",
  initialState: {
    movies: [],
    loading: false,
    error: null,
    searchQuery: "",
    page: 1,
    totalPages: 0,
  },
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
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
      });
  },
});

export const { setSearchQuery, setPage } = movieSlice.actions;

export default movieSlice.reducer;
```

## 3. src/App.js

```jsx
import React from "react";
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
import store from "./store";

const theme = createTheme({
  palette: {
    primary: {
      main: "#2196f3",
    },
  },
});

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={{ display: "flex" }}>
          <Header />
          <Sidebar />
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <Toolbar /> {/* This empty Toolbar acts as a spacer */}
            <MovieGrid />
          </Box>
        </Box>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
```

## 4. src/components/MovieGrid.js

```jsx
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Grid, CircularProgress, Typography, Pagination } from "@mui/material";
import MovieCard from "./MovieCard";
import { fetchMovies, setPage } from "../store/movieSlice";

function MovieGrid() {
  const dispatch = useDispatch();
  const { movies, loading, error, page, totalPages, searchQuery } = useSelector(
    (state) => state.movies
  );

  useEffect(() => {
    dispatch(fetchMovies({ page, searchQuery }));
  }, [dispatch, page, searchQuery]);

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

export default MovieGrid;
```

## 5. src/components/Header.js

```jsx
import React, { useState } from "react";
import { useDispatch } from "react-redux";
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

function Header() {
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
        <Button color="inherit">LOGIN</Button>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
```

## 6. src/services/tmdbApi.js

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

These files represent the complete implementation of Redux in your movie app. Here's a brief overview of what each file does:

1. `store/index.js`: Configures the Redux store.
2. `store/movieSlice.js`: Defines the movie slice with actions and reducers.
3. `App.js`: Provides the Redux store to the entire application.
4. `components/MovieGrid.js`: Uses Redux to fetch and display movies.
5. `components/Header.js`: Dispatches search actions to Redux.
6. `services/tmdbApi.js`: Handles API calls to TMDB.

To implement these changes:

1. Create the new files (`store/index.js` and `store/movieSlice.js`) and update the existing ones as shown above.
2. Make sure you have installed the necessary packages (`redux`, `react-redux`, and `@reduxjs/toolkit`).
3. If your development server is not running, start it with `npm start`.
4. Open your browser and check the application. You should now see the movie grid populated with data from the TMDB API, with working pagination and search functionality, all managed by Redux.

This implementation provides a solid foundation for state management in your app. In the next steps, we'll work on refining the genre filtering functionality and implementing additional features.
