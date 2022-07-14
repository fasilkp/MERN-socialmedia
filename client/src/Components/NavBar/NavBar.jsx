import React, {useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAdd, faCirclePlus, faClose, faHome, faMessage, faPersonRifle, faSearch, faSearchPlus, faUser, faUserFriends, faXmark} from '@fortawesome/free-solid-svg-icons'
import './NavBar.css'
import ProfileImage from '../../images/profile_user.jpg'
function NavBar() {
    const [status, setStatus]=useState({
        searchBar:"0px",
        statusbar:"500px"
    })
  return (
    <div className="Navbar">
        <div className="container nav-body">
        <div className="nav-header">
            <h3>Sociam</h3>
        </div>
        <div className="nav-status-bar" >
            <div className='nav-items' style={{width:`${status.statusbar}`}}>
                <FontAwesomeIcon icon={faHome} className="nav-icons"/></div>
            <div className='nav-items' style={{width:`${status.statusbar}`}}>
                <FontAwesomeIcon icon={faUserFriends} className="nav-icons" /></div>
            <div className='nav-items' style={{width:`${status.statusbar}`}}>
                <FontAwesomeIcon icon={faCirclePlus} className="nav-icons"/></div>
            <div className='nav-items' style={{width:`${status.statusbar}`}}>
                <FontAwesomeIcon icon={faMessage} className="nav-icons"/></div>
            <div className='nav-items' style={{width:`${status.statusbar}`}}>
                <FontAwesomeIcon icon={faSearch} className="nav-icons"
                onClick={()=>{setStatus({statusbar:"0px", searchBar:"500px"})}}
                />
            </div>
            <div className='nav-search-bar' style={{width: `${status.searchBar}`}}>
                <div className="nav-search-input">
                    <input type="text" placeholder='Search for friends ...' />
                </div>
                <div className="search-icons">
                <div className="nav-search-icon">
                <FontAwesomeIcon icon={faSearch} className="nav-icons" />
                </div>
                <FontAwesomeIcon icon={faXmark} className="x-icon"
                onClick={()=>{setStatus({statusbar:"500px", searchBar:"0px"})}}
                />
                </div>

            </div>
        </div>
        <div className="nav-profile">
            <img src={ProfileImage} alt="image" />
        </div>
        </div>
    </div>
  )
}

export default NavBar