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
    <Grid container spacing={3} justifyContent="center" sx={{width:'100%',ml:20}}>
      {movies.map((movie) => (
        <Grid item key={movie.id} xs={12} sm={8} md={6} lg={3}>
          <MovieCard
            title={movie.title}
            releaseDate={movie.release_date}
            posterPath={movie.poster_path}
            rating={movie.vote_average} // Assuming the rating is in `vote_average`
          />
        </Grid>
      ))}
    </Grid>
  );
}

export default MovieGrid;