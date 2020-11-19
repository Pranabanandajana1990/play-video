import React from "react";
import "./video-card.scss";
import { connect } from "react-redux";
import { setSelectedVideo } from "../../redux/player/player.actions";
import { withRouter } from "react-router-dom";
import AddButton from "../add_button/add_button";
import DeleteButton from "../delete_button/delete_button";
import {
  selectCurrentUser,
  selectPlayList,
} from "../../redux/user/user.selectors";
import { createStructuredSelector } from "reselect";
const VideoCard = (props) => {
  const {
    match,
    history,
    title,
    thumbnails,
    description,
    videoId,
    currentUser,
    playList,
  } = props;
  // console.log(props);
  return (
    <div className="video-card">
      <div
        onClick={() => {
          props.setSelectedVideo(props);
          console.log(match);
          console.log(history);
          if (match.url.length < 4 || match.url.split("/").pop() !== "player") {
            if (match.url.charAt(match.url.length - 1) === "/") {
              history.push(`${match.url}player`);
            } else {
              history.push(`${match.url}/player`);
            }
          }
        }}
        style={{ backgroundImage: `url(${thumbnails.medium.url})` }}
        className="thumbnail"
      >
        {/* <img
          src={props.thumbnails.medium.url}
          alt=""
          className="thumbnail-image"
        /> */}
      </div>
      <div className="card-footer">
        <div className="title">{title}</div>
        {currentUser ? (
          playList[videoId] ? (
            <DeleteButton
              user={currentUser}
              video={{ title, videoId, description, thumbnails }}
            />
          ) : (
            <AddButton
              user={currentUser}
              video={{ title, videoId, description, thumbnails }}
            />
          )
        ) : null}
      </div>
    </div>
  );
};
const mapDispatchToProps = (dispatch) => ({
  setSelectedVideo: (video) => dispatch(setSelectedVideo(video)),
});
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  playList: selectPlayList,
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(VideoCard));
