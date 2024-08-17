# Building a Basic Movie Application with React and Redux

In this tutorial, we'll build a simple movie application that fetches and displays movies from different categories. We'll use React for the UI and Redux for state management.

## Steps:
1. Set up the Redux store
2. Create action creators
3. Implement the reducer
4. Build React components
5. Integrate everything in the main App component

## What you'll learn:
- Basic Redux state management
- Async actions with Redux Thunk
- React Hooks (useEffect, useSelector, useDispatch)
- Simple API integration


Now, let's go through each step in detail:

Step 1: Set up the Redux Store



```javascript
// src/redux/store.js
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import movieReducer from './movieReducer';

const store = createStore(movieReducer, applyMiddleware(thunk));

export default store;

```

Explanation:
- We create the store using `createStore`, passing in our `movieReducer` and applying the `thunk` middleware for async actions.

Step 2: Create Action Creators



```javascript
// src/redux/movieActions.js
import axios from 'axios';

const API_KEY = 'your_api_key_here';
const API_BASE_URL = 'https://api.themoviedb.org/3';

export const fetchMovies = (category) => async (dispatch) => {
  try {
    dispatch({ type: 'FETCH_MOVIES_START' });

    let endpoint = '/movie/popular';
    if (category === 'top_rated') {
      endpoint = '/movie/top_rated';
    }

    const response = await axios.get(`${API_BASE_URL}${endpoint}`, {
      params: {
        api_key: API_KEY,
        language: 'en-US',
      },
    });

    dispatch({
      type: 'FETCH_MOVIES_SUCCESS',
      payload: { category, movies: response.data.results },
    });
  } catch (error) {
    dispatch({ type: 'FETCH_MOVIES_FAILURE', payload: error.message });
  }
};

```

Explanation:
- `fetchMovies` is an async action creator that fetches movies based on the category.
- It dispatches actions to indicate the start of fetching, successful fetch, or failure.

Step 3: Implement the Reducer



```javascript
// src/redux/movieReducer.js
const initialState = {
  popular: [],
  top_rated: [],
  loading: false,
  error: null,
};

const movieReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_MOVIES_START':
      return { ...state, loading: true, error: null };
    case 'FETCH_MOVIES_SUCCESS':
      return {
        ...state,
        [action.payload.category]: action.payload.movies,
        loading: false,
      };
    case 'FETCH_MOVIES_FAILURE':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default movieReducer;

```

Explanation:
- The initial state includes arrays for different movie categories, a loading flag, and an error field.
- The reducer handles three types of actions: start of fetching, successful fetch, and fetch failure.

Step 4: Build React Components

Now, let's create a simple React component to display our movies:



```javascript
// src/components/MovieList.js
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMovies } from '../redux/movieActions';

const MovieList = ({ category }) => {
  const dispatch = useDispatch();
  const movies = useSelector(state => state[category]);
  const loading = useSelector(state => state.loading);
  const error = useSelector(state => state.error);

  useEffect(() => {
    dispatch(fetchMovies(category));
  }, [category, dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>{category === 'top_rated' ? 'Top Rated' : 'Popular'} Movies</h2>
      <div className="movie-grid">
        {movies.map(movie => (
          <div key={movie.id} className="movie-card">
            <img 
              src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} 
              alt={movie.title} 
            />
            <h3>{movie.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieList;

```

Explanation:
- This component uses `useSelector` to access the Redux state and `useDispatch` to dispatch actions.
- `useEffect` is used to fetch movies when the component mounts or when the category changes.
- It handles loading and error states, displaying appropriate messages.

Step 5: Integrate Everything in the Main App Component

Finally, let's put everything together in our main `App` component:



```javascript
// src/App.js
import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import MovieList from './components/MovieList';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <h1>Movie Application</h1>
        <MovieList category="popular" />
        <MovieList category="top_rated" />
      </div>
    </Provider>
  );
}

export default App;

```

Explanation:
- The `App` component wraps everything with the Redux `Provider`.
- It renders two `MovieList` components, one for popular movies and one for top-rated movies.

Now, let's create some simple exercises for students to experiment with:

Exercise 1: Add a New Movie Category

Task: Add a new "upcoming" category to the application.

Steps:
1. Update the `initialState` in `movieReducer.js` to include an `upcoming` array.
2. Modify the `fetchMovies` action in `movieActions.js` to handle the "upcoming" category.
3. Add a new `MovieList` component with the "upcoming" category in `App.js`.

Exercise 2: Display Additional Movie Information

Task: Modify the `MovieList` component to show more information about each movie.

Steps:
1. Update the `MovieList` component to display the movie's release date and overview.
2. Style the movie cards to accommodate the new information.

Exercise 3: Implement a Simple Loading Indicator

Task: Create a more visually appealing loading indicator.

Steps:
1. Create a new `LoadingSpinner` component with some CSS animations.
2. Replace the "Loading..." text in `MovieList` with the new `LoadingSpinner` component.

These simplified exercises will help students apply what they've learned without overwhelming them with complex concepts. Encourage them to experiment with the code, make small changes, and observe the results. This hands-on approach will deepen their understanding of React and Redux basics.
