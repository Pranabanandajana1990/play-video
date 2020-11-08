import homeActionTypes from "./home.types";
const INITIAL_STATE = {
  videos: [],
};

const homeReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case homeActionTypes.SET_HOME_VIDEOS:
      return {
        ...state,
        videos: action.payload,
      };

    default:
      return state;
  }
};

export default homeReducer;
