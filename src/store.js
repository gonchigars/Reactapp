import { configureStore } from '@reduxjs/toolkit';
import movieReducer from './redux/movieReducer';

const store = configureStore({
  reducer: {
    movies: movieReducer,
  },
});

export default store;
