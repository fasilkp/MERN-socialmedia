import React, { useState, useContext, useRef } from "react";
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
import { Link } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import AuthContext from "../../context/AuthContext";
import axios from "axios";
import SearchComp from "../SearchComp/SearchComp";
import { FiTrendingUp } from "react-icons/fi";
import Loader from "../Loader/Loader";


function NavBar(props) {
  const {updateLogin, user}=useContext(AuthContext); 
  const { home, chat, friends, add } = props.clicked;
  const [load, setLoad]=useState({logout:false})
  const basePrfURL="https://crowdlybackend.herokuapp.com/images/profile-images/"
  const [status, setStatus] = useState({
    searchBar: "0px",
    statusbar: "500px",
  });
  const handleLogout=async ()=>{
    setLoad({...load, logout:FiTrendingUp})
    await axios.post('/auth/logout');
    updateLogin();
    setLoad({...load, logout:false})

  }
  const [searchInput, setSearchInput]=useState("");
  const [showSearch, setShowSearch]=useState(false);

  
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
            <Link to="/friends"
              className="links"
              state={{
                userName:user.userName,
                selectedBtn: {
                  followers: "frnd-btns selected",
                  following: "frnd-btns",
                },
              }}>
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
            <div className="nav-items mobile-search" style={{ width: `${status.statusbar}` }}>
                {/* <FontAwesomeIcon
                  icon={faMessage}
                  className="nav-icons"
                  style={{ color: `${chat}` }}
                /> */}
                <FontAwesomeIcon
                icon={faSearch}
                className="nav-icons"
                onClick={() => {
                  setShowSearch(!showSearch)
                }}
              />
            </div>
            <div
              className="nav-items search"
              style={{ width: `${status.statusbar}` }}
            >
              <FontAwesomeIcon
                icon={faSearch}
                className="nav-icons"
                onClick={() => {
                  setShowSearch(true)
                  setStatus({ statusbar: "0px", searchBar: "500px" });
                }}
              />
            </div>
            <div
              className="nav-search-bar"
              style={{ width: `${status.searchBar}` }}
            >
              <div className="nav-search-input">
                <input type="text" list="UserList" placeholder="Search for friends ..."
                value={searchInput} onChange={(e)=>setSearchInput(e.target.value)} />
                <datalist id="UserList">
                </datalist>
              </div>
              <div className="search-icons">
                <div className="nav-search-icon">
                  <FontAwesomeIcon icon={faSearch} className="nav-icons" />
                </div>
                <FontAwesomeIcon
                  icon={faXmark}
                  className="x-icon"
                  onClick={() => {
                    setShowSearch(false)
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
              <Link to={"/edit-profile"} state={{profileUser:user}} className="links">
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
      {
        showSearch &&
        <SearchComp input={searchInput} setShowSearch={setShowSearch}/>
      }
      {
        load.logout && <Loader type="HashLoader"/>
      }
    </div>
  );
}

export default NavBar;
