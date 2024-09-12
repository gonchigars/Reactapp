import { createSlice } from '@reduxjs/toolkit';

const movieSlice = createSlice({
  name: 'movies',
  initialState: {
    movieList: [],
    allMovies: [], // Store the initial list of movies to restore later
  },
  reducers: {
    setMovies: (state, action) => {
      state.movieList = action.payload;
      state.allMovies = action.payload; // Save the movies to restore
    },
    clearMovies: (state) => {
      state.movieList = [];
    },
    refreshMovies: (state) => {
      state.movieList = state.allMovies; // Restore the movies
    },
  },
});

export const { setMovies, clearMovies, refreshMovies } = movieSlice.actions;
export default movieSlice.reducer;
