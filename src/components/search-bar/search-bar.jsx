import React, { useState } from "react";
import { connect } from "react-redux";
import "./search-bar.scss";
import { setSearchField } from "../../redux/home/home.actions";

const SearchBar = ({ setSearchField }) => {
  const [text, setText] = useState("");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSearchField(text);
      }}
      className="ui form"
    >
      <div className="field">
        <input
          className="search-bar"
          placeholder="Search"
          onChange={(e) => setText(e.target.value)}
          value={text}
          type="search"
        ></input>
      </div>
    </form>
  );
};

const mapDispatchToProps = (dispatch) => ({
  setSearchField: (text) => dispatch(setSearchField(text)),
});

export default connect(null, mapDispatchToProps)(SearchBar);
