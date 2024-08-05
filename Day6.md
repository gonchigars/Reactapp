# Day 6: Pagination and Genre Filtering - Complete Code

## 1. src/services/tmdbApi.js

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

export const getMoviesByGenre = async (genreId, page = 1) => {
  try {
    const response = await tmdbApi.get("/discover/movie", {
      params: { with_genres: genreId, page },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching movies by genre:", error);
    throw error;
  }
};

export const getGenres = async () => {
  try {
    const response = await tmdbApi.get("/genre/movie/list");
    return response.data.genres;
  } catch (error) {
    console.error("Error fetching genres:", error);
    throw error;
  }
};

export default tmdbApi;
```

## 2. src/store/movieSlice.js

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

## 3. src/components/Sidebar.js

```jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import { MovieFilter, Category } from "@mui/icons-material";
import { fetchGenres, setSelectedGenreId } from "../store/movieSlice";

const drawerWidth = 240;

function Sidebar({ mobileOpen, handleDrawerToggle }) {
  const dispatch = useDispatch();
  const { genres, selectedGenreId } = useSelector((state) => state.movies);
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("sm"));

  useEffect(() => {
    dispatch(fetchGenres());
  }, [dispatch]);

  const handleGenreClick = (genreId) => {
    dispatch(setSelectedGenreId(genreId));
    if (!isDesktop) {
      handleDrawerToggle();
    }
  };

  const drawer = (
    <div>
      <Typography variant="h6" sx={{ my: 2, textAlign: "center" }}>
        Genres
      </Typography>
      <List>
        <ListItem
          button
          selected={selectedGenreId === null}
          onClick={() => handleGenreClick(null)}
        >
          <ListItemIcon>
            <MovieFilter />
          </ListItemIcon>
          <ListItemText primary="All Movies" />
        </ListItem>
        <Divider />
        {genres.map((genre) => (
          <ListItem
            button
            key={genre.id}
            selected={selectedGenreId === genre.id}
            onClick={() => handleGenreClick(genre.id)}
          >
            <ListItemIcon>
              <Category />
            </ListItemIcon>
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

## 4. src/components/MovieGrid.js

```jsx
import React, { useEffect } from "react";
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

  useEffect(() => {
    dispatch(fetchMovies({ page, searchQuery, genreId: selectedGenreId }));
  }, [dispatch, page, searchQuery, selectedGenreId]);

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

## 5. src/App.js

```jsx
import React, { useState } from "react";
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
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={{ display: "flex" }}>
          <Header handleDrawerToggle={handleDrawerToggle} />
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
    </Provider>
  );
}

export default App;
```

These changes implement pagination and genre filtering in your movie app:

1. `tmdbApi.js`: Added functions to fetch movies by genre and get the list of genres.
2. `movieSlice.js`: Updated to handle genre selection and fetching genres.
3. `Sidebar.js`: Now displays a list of genres fetched from TMDB and allows selection.
4. `MovieGrid.js`: Updated to consider the selected genre when fetching movies.
5. `App.js`: Minor changes to handle mobile drawer toggling.

To implement these changes:

1. Update the existing files as shown above.
2. If your development server is not running, start it with `npm start`.
3. Open your browser and check the application. You should now see a list of genres in the sidebar, and be able to filter movies by genre. Pagination should work for both search results and genre-filtered results.

This implementation provides genre filtering and pagination for your movie app. In the next and final day, we'll focus on refining the user experience, implementing dark mode, and adding some performance optimizations.
