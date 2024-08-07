import React, { useState, useEffect } from "react";
import axios from "axios";
import Rating from "@mui/material/Rating"; // MUI Rating component
import "./MovieGrid.css";

const API_KEY = "7c699012b4e435d93bdce1dcd339160d"; // Replace with your actual TMDB API key
const API_BASE_URL = "https://api.themoviedb.org/3";

const MovieGrid = () => {
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
          {/* Display TMDb's average rating */}
          <Rating
            name={`rating-${movie.id}`}
            value={movie.vote_average / 2} // TMDb rating is out of 10, MUI Rating is out of 5
            precision={0.1} // Allows more granular ratings
            readOnly // Make rating component read-only
          />
          <p>{movie.vote_average.toFixed(1)} / 10</p> {/* Show the rating score */}
        </div>
      ))}
    </div>
  );
};

export default MovieGrid;
