import React, { useState, useEffect } from "react";
import axios from "axios";
import "./MovieGrid.css";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const API_KEY = "49a5508b99e54cbf67438655e1565e32"; // Replace with your actual TMDB API key
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

  const getColor = (rating) => {
    if (rating >= 70) return "#21d07a"; // Green
    if (rating >= 40) return "#f5c518"; // Yellow
    if (rating <= 40) return "#db2360"; // Red


  };

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
          <div className="rating-circle">
            <CircularProgressbar
              value={movie.vote_average * 10}
              text={`${movie.vote_average * 10}%`}
              styles={buildStyles({
                textSize: '27px',
                pathColor: getColor(movie.vote_average * 10),
                textColor: getColor(movie.vote_average * 10),
                trailColor: '#d6d6d6',
    

              })}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default MovieGrid;
