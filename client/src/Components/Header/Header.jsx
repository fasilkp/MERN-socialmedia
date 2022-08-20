import React from "react";
import { BiArrowBack } from "react-icons/bi";
import { Link } from "react-router-dom";
import "./Header.css";
function Header({ headerName, headerPath }) {
  return (
    <div className="Header">
      <Link to={headerPath} className="links">
        <BiArrowBack />
        <label htmlFor="">{headerName}</label>
      </Link>
    </div>
  );
}

export default Header;
