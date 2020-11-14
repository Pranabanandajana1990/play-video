import React from "react";
import "./header.scss";
import { Link } from "react-router-dom";
import SearchBar from "../search-bar/search-bar";
import { connect } from "react-redux";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import { createStructuredSelector } from "reselect";
import { signOutStart } from "../../redux/user/user.actions";
import Gravatar from "react-gravatar";
function Header({ currentUser, signOutStart }) {
  return (
    <div className="header">
      <SearchBar />
      {currentUser ? (
        <Link to="/" onClick={signOutStart}>
          <div className="option">signout</div>
        </Link>
      ) : (
        <Link to="/signin">
          <div className="option">signin</div>
        </Link>
      )}
      <Link to="/">
        <div className="option">home</div>
      </Link>
      <Link to="/player">
        {" "}
        <div className="option">player</div>{" "}
      </Link>
      <Gravatar
        email={currentUser ? currentUser.email : "abc@xyz.com"}
        size={50}
        rating="pg"
        forcedefault="y"
        default="mp"
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
export default connect(mapStateToProps, mapDispatchToProps)(Header);
