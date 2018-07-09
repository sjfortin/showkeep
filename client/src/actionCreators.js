import { SET_SEARCH_TERM, SET_CURRENT_SHOWS } from './actions';

export function setSearchTerm(searchTerm) {
  return { type: SET_SEARCH_TERM, payload: searchTerm };
}

export function setCurrentShowList(shows) {
  return { type: SET_CURRENT_SHOWS, payload: shows };
}
