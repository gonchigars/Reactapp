Let's expand the Redux store with additional case statements in the `movieReducer` and test them in your application.

### 1. Update `movieReducer` with New Case Statements

Let's add more actions to handle adding, removing, updating, and clearing movies:

```javascript
const initialState = {
  movies: [],
};

const movieReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_MOVIES":
      return {
        ...state,
        movies: action.payload,
      };

    case "ADD_MOVIE":
      return {
        ...state,
        movies: [...state.movies, action.payload],
      };

    case "REMOVE_MOVIE":
      return {
        ...state,
        movies: state.movies.filter((movie) => movie.id !== action.payload),
      };

    case "UPDATE_MOVIE":
      return {
        ...state,
        movies: state.movies.map((movie) =>
          movie.id === action.payload.id
            ? { ...movie, ...action.payload }
            : movie
        ),
      };

    case "CLEAR_MOVIES":
      return {
        ...state,
        movies: [],
      };

    default:
      return state;
  }
};

export default movieReducer;
```

### 2. Update `movieActions.js` with New Action Creators

Now, let's create action creators for these new actions:

```javascript
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
```

### 3. Modify `MovieGridRedux` to Dispatch New Actions (for Testing)

Let's add some buttons to the `MovieGridRedux` component to test adding, removing, updating, and clearing movies:

```javascript
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchMovies,
  addMovie,
  removeMovie,
  updateMovie,
  clearMovies,
} from "../redux/movieActions";
import "./MovieGrid.css";

const MovieGridRedux = () => {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies.movies);

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  const handleAddMovie = () => {
    const newMovie = {
      id: new Date().getTime(), // Unique ID for testing
      title: "New Movie",
      release_date: "2024-01-01",
      poster_path: "/path_to_new_movie_poster.jpg",
    };
    dispatch(addMovie(newMovie));
  };

  const handleRemoveMovie = (movieId) => {
    dispatch(removeMovie(movieId));
  };

  const handleUpdateMovie = (movieId) => {
    const updatedMovie = {
      id: movieId,
      title: "Updated Movie Title",
      release_date: "2025-01-01",
      poster_path: "/path_to_updated_movie_poster.jpg",
    };
    dispatch(updateMovie(updatedMovie));
  };

  const handleClearMovies = () => {
    dispatch(clearMovies());
  };

  return (
    <div>
      <button onClick={handleAddMovie}>Add Movie</button>
      <button onClick={() => handleRemoveMovie(movies[0]?.id)}>
        Remove First Movie
      </button>
      <button onClick={() => handleUpdateMovie(movies[0]?.id)}>
        Update First Movie
      </button>
      <button onClick={handleClearMovies}>Clear Movies</button>

      <div className="movie-grid">
        {movies.map((movie) => (
          <div key={movie.id} className="movie-card">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
            <h3>{movie.title}</h3>
            <p>{movie.release_date}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieGridRedux;
```

### 4. Testing the New Actions

To test the functionality:

1. **Add Movie**: Click the "Add Movie" button to add a new movie to the grid.
2. **Remove First Movie**: Click the "Remove First Movie" button to remove the first movie from the list.
3. **Update First Movie**: Click the "Update First Movie" button to change the details of the first movie.
4. **Clear Movies**: Click the "Clear Movies" button to clear all movies from the grid.

### 5. Run the Application

Ensure your development server is running (`npm start`), and interact with the buttons in your `MovieGridRedux` component to see the different actions in effect.

### Summary

- **Expanded Reducer**: Added new case statements for adding, removing, updating, and clearing movies.
- **New Action Creators**: Created corresponding action creators for these new actions.
- **UI Integration**: Updated the UI with buttons to trigger the new actions and test their effects on the Redux store.
