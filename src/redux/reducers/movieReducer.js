// src/redux/reducers/movieReducer.js
const initialState = {
  popular: [],
  action: [],
  adventure: [],
  comedy: [],
  searchResults: [],
};

const movieReducer = (state = initialState, action) => {
  console.log("Current state:", state);
  console.log("Action:", action);

  let newState;
  switch (action.type) {
    case "SET_MOVIES":
      newState = {
        ...state,
        [action.payload.category]: action.payload.movies,
      };
      break;
    case "SET_SEARCH_RESULTS":
      newState = {
        ...state,
        searchResults: action.payload,
      };
      break;
    default:
      newState = state;
  }

  console.log("New state:", newState);
  return newState;
};

export default movieReducer;
