import homeActionTypes from "./home.types";
const INITIAL_STATE = {
  videos: [],
  searchField: "",
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
    default:
      return state;
  }
};

export default homeReducer;
