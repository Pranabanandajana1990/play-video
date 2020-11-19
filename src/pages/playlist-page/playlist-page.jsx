import { selectPlayList } from "../../redux/user/user.selectors";
// import { setHomeVideos } from "../../redux/home/home.actions";
// import { setSelectedVideo } from "../../redux/player/player.actions";
import { createStructuredSelector } from "reselect";
// import Footer from "../../components/footer/footer";
import { connect } from "react-redux";
// import React, { useEffect } from "react";
// import { youTubeQuerry } from "../../api";
import VideoCard from "../../components/video-card/video-card";
import "./playlist-page.scss";
// import { getHomeVideos } from "../../api/firebase/utils";
const PlayListPage = ({ playList }) => {
  const videos = Object.values(playList);
  return (
    <div className="home-page">
      {videos
        .filter((val, index) => index < 12)
        .map((video) => (
          <VideoCard key={video.videoId} {...video}></VideoCard>
        ))}
    </div>
  );
};
const mapStateToProps = createStructuredSelector({
  playList: selectPlayList,
});

export default connect(mapStateToProps)(PlayListPage);
