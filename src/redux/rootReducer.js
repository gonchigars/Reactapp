import { combineReducers } from 'redux';
import movieGridReducer from './movieReducer'; 

const rootReducer = combineReducers({
  movieGrid: movieGridReducer,
  // Add other reducers here if needed
});

export default rootReducer;
