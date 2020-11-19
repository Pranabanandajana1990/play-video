export const deleteVideoFromPlayListState = (state, video) => {
  delete state.playList[video.videoId];

  return { ...state, playList: { ...state.playList }, deleteVideoError: null };
};

export const addVideoToPlayListState = (state, video) => {
  state.playList[video.videoId] = video;
  return {
    ...state,
    playList: { ...state.playList },
    addVideoError: null,
  };
};
