export const SET_MOVIE_TYPE = 'SET_MOVIE_TYPE';
export const CLEAR_MOVIES = 'CLEAR_MOVIES';
export const REFRESH_MOVIES = 'REFRESH_MOVIES';

export const setMovieType = (movieType) => ({
  type: SET_MOVIE_TYPE,
  payload: movieType,
});

export const clearMovies = () => ({
  type: CLEAR_MOVIES,
});

export const refreshMovies = () => ({
  type: REFRESH_MOVIES,
});
