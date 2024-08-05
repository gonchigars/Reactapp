# Updated 7-Day React/Material UI Movie App Learning Plan with TMDB API

## Day 3 Implementation

1. First, sign up for a TMDB API key at https://www.themoviedb.org/settings/api

2. Create a new file `src/config/tmdb.js`:

```javascript
export const TMDB_API_KEY = "your_api_key_here";
export const TMDB_BASE_URL = "https://api.themoviedb.org/3";
export const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
```

3. Update `src/components/MovieCard.js`:

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
          image={`${TMDB_IMAGE_BASE_URL}${posterPath}`}
          alt={title}
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Release Date: {releaseDate}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default MovieCard;
```

4. Create a new file `src/services/tmdbApi.js`:

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

export default tmdbApi;
```

5. Update `src/components/MovieGrid.js`:

```jsx
import React, { useState, useEffect } from "react";
import { Grid, CircularProgress, Typography } from "@mui/material";
import MovieCard from "./MovieCard";
import { getPopularMovies } from "../services/tmdbApi";

function MovieGrid() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await getPopularMovies();
        setMovies(data.results);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">Error: {error}</Typography>;
  }

  return (
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
  );
}

export default MovieGrid;
```

6. Update `src/App.js` to include the MovieGrid component (if not already done):

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
          <Toolbar /> {/* This empty Toolbar acts as a spacer */}
          <MovieGrid />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
```

To implement these changes:

1. Install axios: `npm install axios`
2. Create the new files and update the existing ones as shown above.
3. Replace 'your_api_key_here' in `src/config/tmdb.js` with your actual TMDB API key.
4. If your development server is not running, start it with `npm start`.
5. Open your browser and check the application. You should now see a grid of movie cards populated with data from the TMDB API.

This implementation sets up the basic structure for fetching and displaying movies from the TMDB API. In the following days, we'll expand on this to add more features and improve the state management.
