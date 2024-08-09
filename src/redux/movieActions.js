import axios from "axios";

const API_KEY = "49a5508b99e54cbf67438655e1565e32"; // Replace with your actual TMDB API key
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
