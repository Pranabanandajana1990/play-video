import { homeActionTypes } from "./home.types";
export const setHomeVideos = (videos) => ({
  type: homeActionTypes.SET_HOME_VIDEOS,
  payload: videos,
});

export const setSearchField = (searchField) => ({
  type: homeActionTypes.SET_SEARCH_FIELD,
  payload: searchField,
});

export const searchFieldStart = (searchField) => ({
  type: homeActionTypes.SEARCH_FILED_START,
  payload: searchField,
});

export const searchFieldSuccess = (videos) => ({
  type: homeActionTypes.SEARCH_FIELD_SUCCESS,
  payload: videos,
});
export const searchFieldFaliure = (error) => ({
  type: homeActionTypes.SEARCH_FIELD_FALIURE,
  payload: error,
});
