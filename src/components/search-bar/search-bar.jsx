import React, { useState } from "react";
import { connect } from "react-redux";
import "./search-bar.scss";
import { searchFieldStart } from "../../redux/home/home.actions";
import { withRouter } from "react-router-dom";
const SearchBar = ({ searchFieldStart, match, history }) => {
  const [text, setText] = useState("");
  // console.log(history);
  // console.log(match);
  return (
    <div className="search-container">
      <form
        style={
          history.location.pathname === "/signin" ? { display: "none" } : null
        }
        className="group-search"
        onSubmit={(e) => {
          e.preventDefault();
          searchFieldStart(text);
        }}
      >
        <input
          className={`${text.length ? "extend" : ""} form-input-search`}
          onChange={(e) => setText(e.target.value)}
        />
        <label
          className={`${text.length ? "shrink" : ""} form-input-label-search`}
        >
          Search
        </label>
      </form>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  searchFieldStart: (text) => dispatch(searchFieldStart(text)),
});

export default connect(null, mapDispatchToProps)(withRouter(SearchBar));
