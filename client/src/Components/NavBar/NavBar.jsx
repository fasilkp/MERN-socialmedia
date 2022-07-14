import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAdd, faCirclePlus, faHome, faMessage, faPersonRifle, faSearch, faSearchPlus, faUser, faUserFriends} from '@fortawesome/free-solid-svg-icons'
import './NavBar.css'
import ProfileImage from '../../images/profile_user.jpg'
function NavBar() {
  return (
    <div className="Navbar">
        <div className="container nav-body">
        <div className="nav-header">
            <h3>Sociam</h3>
        </div>
        <div className="nav-status-bar">
            <div><FontAwesomeIcon icon={faHome} className="nav-icons"/></div>
            <div><FontAwesomeIcon icon={faUserFriends} className="nav-icons" /></div>
            <div><FontAwesomeIcon icon={faCirclePlus} className="nav-icons"/></div>
            <div><FontAwesomeIcon icon={faMessage} className="nav-icons" /></div>
            <div><FontAwesomeIcon icon={faSearch} className="nav-icons" /></div>
            
        </div>
        <div className="nav-profile">
            <img src={ProfileImage} alt="image" />
        </div>
        </div>
    </div>
  )
}

export default NavBar