import React from "react";
import "./header.scss";
import { Link } from "react-router-dom";
import SearchBar from "../search-bar/search-bar";
import { connect } from "react-redux";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import { createStructuredSelector } from "reselect";
import { signOutStart } from "../../redux/user/user.actions";
import { withRouter } from "react-router-dom";
import Gravatar from "react-gravatar";
import { CgHomeAlt } from "react-icons/cg";
import ReactTooltip from "react-tooltip";
function Header({ currentUser, signOutStart, history, match }) {
  // console.log(history);
  // console.log(match);
  return (
    <div className="header">
      <ReactTooltip data-event="hover" />
      <Link to="/" data-tip="Home button">
        <CgHomeAlt
          style={{ height: "2rem", width: "2rem" }}
          className="home-icon"
        />
      </Link>
      <SearchBar data-tip="Search for videos" />
      {currentUser ? (
        <div className="option">
          {" "}
          <Link
            to="/"
            data-tip="Sign out from your account"
            onClick={signOutStart}
          >
            signout
          </Link>
        </div>
      ) : (
        <div className="option">
          {" "}
          <Link
            data-tip="Sign into your account or create a new one"
            to="/signin"
          >
            signin
          </Link>
        </div>
      )}

      {currentUser ? (
        <div className="option">
          <Link data-tip="Go to your playlist" to="/playlist">
            playlist
          </Link>
        </div>
      ) : null}
      <Gravatar
        data-tip="Your profile Gravatar"
        email={currentUser ? currentUser.email : "abc@xyz.com"}
        size={50}
        forcedefault="y"
        default={
          currentUser
            ? currentUser.photoURL
              ? currentUser.photoURL
              : "mp"
            : "mp"
        }
        className="custom-gravatar"
      />
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});
const mapDispatchToProps = (dispatch) => ({
  signOutStart: () => dispatch(signOutStart()),
});
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));
