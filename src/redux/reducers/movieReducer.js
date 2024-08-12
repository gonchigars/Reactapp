// src/redux/reducers/movieReducer.js
const initialState = {
  popular: [],
  action: [],
  adventure: [],
  comedy: [],
  searchResults: [],
};

const movieReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_MOVIES":
      return {
        ...state,
        [action.payload.category]: action.payload.movies,
      };
    case "SET_SEARCH_RESULTS":
      return {
        ...state,
        searchResults: action.payload,
      };
    default:
      return state;
  }
};

export default movieReducer;
