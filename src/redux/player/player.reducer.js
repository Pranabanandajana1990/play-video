import { palyerActionTypes } from "./player.type";

const INITIAL_STATE = {
  selectedVideo: null,
};

const playerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case palyerActionTypes.SET_SELECTED_VIDEO:
      return {
        ...state,
        selectedVideo: action.payload,
      };

    default:
      return state;
  }
};

export default playerReducer;
