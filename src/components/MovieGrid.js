import React, { useState, useEffect } from "react";
import axios from "axios";
import "./MovieGrid.css";
import HalfRating from '@mui/material/Rating';
const API_KEY = "f9aaf7bfeb87e03e6df3c52ab890a486"; // Replace with your actual TMDB API key
const API_BASE_URL = "https://api.themoviedb.org/3";

const Moviegrid = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
        );
        setMovies(response.data.results);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className="movie-grid">
      {movies.map((movie) => (
        <div key={movie.id} className="movie-card">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
          />
          <h3>{movie.title}</h3>
          <p>{movie.release_date}</p>
          <HalfRating rating={movie.vote_average / 2} /> {/* Pass the rating to HalfRating */}
        </div>
      ))}
    </div>
  );
};

export default Moviegrid;
