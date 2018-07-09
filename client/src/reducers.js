import { SET_SEARCH_TERM, SET_CURRENT_SHOWS } from './actions';

const DEFAULT_STATE = {
  searchTerm: '',
  currentShows: {}
};

const setSearchTerm = (state, action) =>
  Object.assign({}, state, { searchTerm: action.payload });

const setCurrentShowList = (state, action) =>
  Object.assign({}, state, { currentShows: action.payload });

const rootReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case SET_SEARCH_TERM:
      return setSearchTerm(state, action);
    case SET_CURRENT_SHOWS:
      return setCurrentShowList(state, action);
    default:
      return state;
  }
};

export default rootReducer;
