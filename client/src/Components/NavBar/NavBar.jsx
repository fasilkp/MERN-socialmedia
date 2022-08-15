import React, { useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCirclePlus,
  faHome,
  faMessage,
  faSearch,
  faUserFriends,
  faXmark,
  faUser,
  faGear,
  faRightFromBracket,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";
import "./NavBar.css";
import ProfileImage from "../../images/profile_user.jpg";
import { Link } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import AuthContext from "../../context/AuthContext";
import axios from "axios";


function NavBar(props) {
  const {updateLogin, user}=useContext(AuthContext); 
  const { home, chat, friends, add } = props.clicked;
  const basePrfURL="http://localhost:8080/images/profile-images/"
  const [status, setStatus] = useState({
    searchBar: "0px",
    statusbar: "500px",
  });
  const handleLogout=async ()=>{
    await axios.post('/auth/logout');
    alert("logged Out Successfully");
    updateLogin();
  }
  return (
    <div className="Navbar">
      <div className="container nav-body">
        <div className="nav-header">
        <Link to="/" className="links"><h3>Crowdly</h3></Link>
        </div>
        <div className="status-bar-back">
          <div className="nav-status-bar">
            <div className="nav-items" style={{ width: `${status.statusbar}` }}>
              <Link to="/">
                <FontAwesomeIcon
                  icon={faHome}
                  className="nav-icons"
                  style={{ color: `${home}` }}
                />
              </Link>
            </div>
            <div className="nav-items" style={{ width: `${status.statusbar}` }}>
            <Link to="/friends" className="links" state={{ list:{followers: user.followers, followings: user.following}, selectedBtn: {
                followers: "frnd-btns",
                following: "frnd-btns selected"
              } }}>
                <FontAwesomeIcon
                  icon={faUserFriends}
                  className="nav-icons"
                  style={{ color: `${friends}` }}
                />
              </Link>
            </div>
            <div className="nav-items" style={{ width: `${status.statusbar}` }}>
              <Link to="/add-post">
                <FontAwesomeIcon
                  icon={faCirclePlus}
                  className="nav-icons"
                  style={{ color: `${add}` }}
                />
              </Link>
            </div>
            <div className="nav-items" style={{ width: `${status.statusbar}` }}>
              <Link to="/chat">
                <FontAwesomeIcon
                  icon={faMessage}
                  className="nav-icons"
                  style={{ color: `${chat}` }}
                />
              </Link>
            </div>
            <div
              className="nav-items search"
              style={{ width: `${status.statusbar}` }}
            >
              <FontAwesomeIcon
                icon={faSearch}
                className="nav-icons"
                onClick={() => {
                  setStatus({ statusbar: "0px", searchBar: "500px" });
                }}
              />
            </div>
            <div
              className="nav-search-bar"
              style={{ width: `${status.searchBar}` }}
            >
              <div className="nav-search-input">
                <input type="text" placeholder="Search for friends ..." />
              </div>
              <div className="search-icons">
                <div className="nav-search-icon">
                  <FontAwesomeIcon icon={faSearch} className="nav-icons" />
                </div>
                <FontAwesomeIcon
                  icon={faXmark}
                  className="x-icon"
                  onClick={() => {
                    setStatus({ statusbar: "500px", searchBar: "0px" });
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="nav-profile">
          <Dropdown className="nav-profile-dropdown">
            <Dropdown.Toggle
              variant="success"
              id="dropdown-basic"
              className="profile-toggle"
            >
              <img src={basePrfURL+user.image} alt="image" />
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Link to={"/user/"+user.userName} className="links">
                <Dropdown.Item href="/profile" className="nav-dropdown-item">
                  <FontAwesomeIcon icon={faUser} /> &nbsp;&nbsp; Profile
                </Dropdown.Item>
              </Link>
              <Link to="/profile" className="links">
                <Dropdown.Item href="/profile" className="nav-dropdown-item">
                  <FontAwesomeIcon icon={faEdit} /> &nbsp;&nbsp; Edit Profile
                </Dropdown.Item>
              </Link>
              <Dropdown.Item>
                <FontAwesomeIcon icon={faGear} /> &nbsp;&nbsp; Settings
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item id="hover-danger" onClick={handleLogout}>
                <FontAwesomeIcon icon={faRightFromBracket} /> &nbsp;&nbsp;
                Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
