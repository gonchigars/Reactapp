import React, { useState, useEffect } from "react";
import axios from "axios";
import RatingMeter from './RatingMeter'; // Ensure path is correct
import "./MovieGrid.css";

const API_KEY = "585617c500cd3a3ceef50b984bc740c6";
const API_BASE_URL = "https://api.themoviedb.org/3";

const getRandomRating = () => {
  return Math.floor(Math.random() * (100 - 75 + 1)) + 75;
};

const MovieGrid = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
        );
        console.log('Fetched movies:', response.data.results); // Check if this logs
        setMovies(response.data.results);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className="movie-grid">
      {movies.length ? (
        movies.map((movie) => (
          <div key={movie.id} className="movie-card">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
            <h3>{movie.title}</h3>
            <p>{movie.release_date}</p>
            <RatingMeter rating={getRandomRating()} />
          </div>
        ))
      ) : (
        <p>No movies found.</p>
      )}
    </div>
  );
};

export default MovieGrid;
