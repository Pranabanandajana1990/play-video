import { createSelector } from "reselect";

const selectPlayer = (state) => state.player;

export const selectVideo = createSelector(
  [selectPlayer],
  (player) => player.selectedVideo
);
