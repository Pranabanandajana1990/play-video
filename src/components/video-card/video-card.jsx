import React from "react";
import "./video-card.scss";
import { connect } from "react-redux";
import { setSelectedVideo } from "../../redux/player/player.actions";
import { withRouter } from "react-router-dom";
const VideoCard = (props) => {
  const { match, history } = props;

  return (
    <div
      className="video-card"
      onClick={() => {
        props.setSelectedVideo(props);
        // console.log(match);
        if (match.url.length < 4 || match.url.split("/").pop() !== "player") {
          history.push(`${match.url}player`);
        }
      }}
    >
      <div
        style={{ backgroundImage: `url(${props.thumbnails.medium.url})` }}
        className="thumbnail"
      >
        {/* <img
          src={props.thumbnails.medium.url}
          alt=""
          className="thumbnail-image"
        /> */}
      </div>
      <div className="title">{props.title}</div>
    </div>
  );
};
const mapDispatchToProps = (dispatch) => ({
  setSelectedVideo: (video) => dispatch(setSelectedVideo(video)),
});
export default connect(null, mapDispatchToProps)(withRouter(VideoCard));
