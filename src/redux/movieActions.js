import axios from "axios";

const API_KEY = "9fe79b52ede4aea7fd21916437ada5c8"; // Replace with your actual TMDB API key
const API_BASE_URL = "https://api.themoviedb.org/3";

export const fetchMovies = () => async (dispatch) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
    );
    dispatch({ type: "SET_MOVIES", payload: response.data.results });
  } catch (error) {
    console.error("Error fetching movies:", error);
  }
};

// Existing fetchMovies action remains unchanged

export const addMovie = (movie) => {
    return {
      type: "ADD_MOVIE",
      payload: movie,
    };
  };
  
  export const removeMovie = (movieId) => {
    return {
      type: "REMOVE_MOVIE",
      payload: movieId,
    };
  };
  
  export const updateMovie = (movie) => {
    return {
      type: "UPDATE_MOVIE",
      payload: movie,
    };
  };
  
  export const clearMovies = () => {
    return {
      type: "CLEAR_MOVIES",
    };
  };

  export const fetchmovies = () => {
    return {
      type:"FETCH_MOVIES"
    }
  }