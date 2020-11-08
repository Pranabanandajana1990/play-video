import homeActionTypes from "./home.types";
export const setHomeVideos = (videos) => ({
  type: homeActionTypes.SET_HOME_VIDEOS,
  payload: videos,
});
