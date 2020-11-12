import React from "react";
import "./header.scss";
import { Link } from "react-router-dom";
import SearchBar from "../search-bar/search-bar";

function Header() {
  return (
    <div className="header">
      <Link to="/">home</Link>
      <SearchBar />
      <Link to="/player">player</Link>
    </div>
  );
}

export default Header;
