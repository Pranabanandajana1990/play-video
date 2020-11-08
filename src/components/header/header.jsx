import React from "react";
import "./header.scss";
import { Link } from "react-router-dom";
function Header() {
  return (
    <div className="header">
      <Link to="/">home</Link>
      <Link to="/player">player</Link>
    </div>
  );
}

export default Header;
