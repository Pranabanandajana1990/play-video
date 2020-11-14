import { homeActionTypes } from "./home.types";
const INITIAL_STATE = {
  videos: [],
  searchField: "",
  searchFieldError: null,
};

const homeReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case homeActionTypes.SET_HOME_VIDEOS:
      return {
        ...state,
        videos: action.payload,
      };
    case homeActionTypes.SET_SEARCH_FIELD:
      return {
        ...state,
        searchField: action.payload,
      };
    case homeActionTypes.SEARCH_FIELD_SUCCESS:
      return {
        ...state,
        videos: action.payload,
      };
    case homeActionTypes.SEARCH_FIELD_FALIURE:
      return {
        ...state,
        searchFieldError: action.payload,
      };
    default:
      return state;
  }
};

export default homeReducer;
