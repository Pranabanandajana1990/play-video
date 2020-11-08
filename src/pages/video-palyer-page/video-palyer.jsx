import React from "react";
import "./video-player.scss";
import { selectHomeVideos } from "../../redux/home/home.selectors";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import VideoCard from "../../components/video-card/video-card";
import { selectVideo } from "../../redux/player/player.selectors";
const VideoPlayer = ({ videos, selectedVideo }) => {
  const { videoId } = selectedVideo;
  const videoUrl = `https://www.youtube.com/embed/${videoId}`;
  return (
    <div className="video-player">
      <div className="player">
        <iframe
          frameBorder="0"
          src={videoUrl}
          title="Video Player"
          allowFullScreen="True"
        />
      </div>
      <div className="list">
        {videos.map((video) => (
          <VideoCard key={video.videoId} {...video}></VideoCard>
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  videos: selectHomeVideos,
  selectedVideo: selectVideo,
});

export default connect(mapStateToProps)(VideoPlayer);
