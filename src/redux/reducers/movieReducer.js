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

      case "FETCH_MOVIES":
        return{
          ...state,
          movies: action.payload,
        };
  
      default:
        return state;
    }
  };
  
  export default movieReducer;