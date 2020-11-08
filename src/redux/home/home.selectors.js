import { createSelector } from "reselect";

const selectHome = (state) => state.home;

export const selectHomeVideos = createSelector(
  [selectHome],
  (home) => home.videos
);
