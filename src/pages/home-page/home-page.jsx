import { selectHomeVideos } from "../../redux/home/home.selectors";
import { setHomeVideos } from "../../redux/home/home.actions";
import { setSelectedVideo } from "../../redux/player/player.actions";
import { createStructuredSelector } from "reselect";
// import Footer from "../../components/footer/footer";
import { connect } from "react-redux";
import React, { useEffect } from "react";
// import { youTubeQuerry } from "../../api";
import VideoCard from "../../components/video-card/video-card";
import "./home-page.scss";
import { getHomeVideos } from "../../api/firebase/utils";
// import { youTubeQuerry } from "../../api";
const HomePage = ({ setHomeVideos, setSelectedVideo, videos }) => {
  useEffect(() => {
    const getSearch = async (text) => {
      const result = await getHomeVideos(text);
      // const result = await youTubeQuerry(text);
      // await addVideosToHome(result, text);
      setHomeVideos(result);
      setSelectedVideo(result[25]);
    };
    getSearch("news");
  }, [setHomeVideos, setSelectedVideo]);

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
  videos: selectHomeVideos,
});
const mapDispatchToProps = (dispatch) => ({
  setHomeVideos: (videos) => dispatch(setHomeVideos(videos)),
  setSelectedVideo: (video) => dispatch(setSelectedVideo(video)),
});
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
