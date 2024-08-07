import React, { useState, useEffect } from "react";
import axios from "axios";
import "./MovieGrid.css";

const API_KEY = "2f6bf2494919fd36670e86202295c74a"; 
const API_BASE_URL = "https://api.themoviedb.org/3";
const getRatingClass = (rating) => {
    if (rating >= 7.5) return 'high-rating';
    if (rating >= 5) return 'medium-rating';
    return 'low-rating';
  };
  
  // Convert rating to percentage
  const convertRatingToPercentage = (rating) => {
    return (rating * 10).toFixed(0); // Convert to percentage and round to nearest whole number
  };
  

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
           <div className={`movie-rating ${getRatingClass(movie.vote_average)}`}>
            Rating: {convertRatingToPercentage(movie.vote_average)}%
          </div>
          <h3>{movie.title}</h3>
          <p>{movie.release_date}</p>
          
        </div>
      ))}
    </div>
  );
};

export default MovieGrid;
