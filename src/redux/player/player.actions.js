import { palyerActionTypes } from "./player.type";

export const setSelectedVideo = (video) => ({
  type: palyerActionTypes.SET_SELECTED_VIDEO,
  payload: video,
});
