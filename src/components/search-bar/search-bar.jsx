import React, { useState } from "react";
import { connect } from "react-redux";
import "./search-bar.scss";
import { searchFieldStart } from "../../redux/home/home.actions";

const SearchBar = ({ searchFieldStart }) => {
  const [text, setText] = useState("");
  return (
    <div className="search-container">
      <form
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

export default connect(null, mapDispatchToProps)(SearchBar);
