### 1. **Redux Overview**

Redux is a state management library that helps manage and centralize the state in a React application. The idea is to have a single source of truth (the store) where the state of the entire application is kept, rather than having the state scattered across multiple components.

### 2. **Key Components of Redux**

- **Store**: Holds the state of the application.
- **Actions**: Plain JavaScript objects that describe what happened (e.g., "A user requested the list of movies").
- **Reducers**: Functions that determine how the state changes in response to actions.
- **Dispatch**: A method to send actions to the store.

### 3. **The Flow in Your Application**

Here’s how the Redux flow works in your application:

#### 1. **Store Setup**

- The store is created using the `configureStore` method from Redux Toolkit, and the root reducer is passed to it.

```javascript
// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers";

const store = configureStore({
  reducer: rootReducer,
});

export default store;
```

- **Explanation**: This `store` holds the entire state tree of your application. It’s created with the `rootReducer` that combines all the individual reducers (in your case, just `movieReducer`).

#### 2. **Root Reducer**

- The root reducer is a combination of all your individual reducers. In this app, it's just combining the `movieReducer`.

```javascript
// src/redux/reducers/index.js
import { combineReducers } from "redux";
import movieReducer from "./movieReducer";

const rootReducer = combineReducers({
  movies: movieReducer,
});

export default rootReducer;
```

- **Explanation**: The `combineReducers` function merges different reducers into a single root reducer. Each reducer manages a specific part of the application's state.

#### 3. **Movie Reducer**

- The `movieReducer` handles actions related to movies, like storing the list of movies.

```javascript
// src/redux/reducers/movieReducer.js
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
    default:
      return state;
  }
};

export default movieReducer;
```

- **Explanation**: The `movieReducer` starts with an initial state where the `movies` array is empty. When an action of type `SET_MOVIES` is dispatched, it updates the `movies` array with the data provided in `action.payload`.

#### 4. **Actions and Action Creators**

- Actions are dispatched to tell the store what happened. In your app, there's a function that fetches movies and then dispatches an action to update the state.

```javascript
// src/redux/movieActions.js
import axios from "axios";

const API_KEY = "your-api-key"; // Replace with your actual TMDB API key
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
```

- **Explanation**: The `fetchMovies` function is an action creator. It performs an asynchronous API call using Axios to fetch popular movies. Once the data is fetched, it dispatches an action of type `SET_MOVIES`, along with the fetched data as the payload.

#### 5. **Connecting Redux to React Components**

- Components like `MovieGridRedux` use `useSelector` to access the Redux store and `useDispatch` to dispatch actions.

```javascript
// src/components/MovieGridRedux.js
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchMovies } from "../redux/movieActions";
import "./MovieGrid.css";

const MovieGridRedux = () => {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies.movies);

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

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
        </div>
      ))}
    </div>
  );
};

export default MovieGridRedux;
```

- **Explanation**:
  - `useSelector` selects the part of the state that this component needs, which is `state.movies.movies`.
  - `useDispatch` is used to dispatch the `fetchMovies` action when the component mounts, triggering the flow to fetch and store movies.

### 4. **Redux Flow Summary**

1.  **Component Dispatches an Action**: When `MovieGridRedux` mounts, it dispatches the `fetchMovies` action.
2.  **Action Creator Fetches Data**: The `fetchMovies` action creator makes an API call to fetch movies and dispatches a `SET_MOVIES` action.
3.  **Reducer Updates the State**: The `movieReducer` listens for the `SET_MOVIES` action and updates the state with the new list of movies.
4.  **Component Renders Updated State**: The `MovieGridRedux` component automatically re-renders when the state changes, displaying the fetched movies.

This flow ensures that your app's state is predictable and can be easily debugged or scaled.
