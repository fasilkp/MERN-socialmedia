import React from 'react'
import NavBar from '../Components/NavBar/NavBar'
import FriendsComp from '../Components/friendsComp/FriendsComp'
import {useLocation} from 'react-router-dom'
function Friends() {
  const location = useLocation();
  return (
    <div className='main'>
    <NavBar clicked={{
          home:"rgb(152, 200, 192)",
          friends:"rgb(0, 130, 109)",
          chat:"rgb(152, 200, 192)",
          add:"rgb(152, 200, 192)",
          }}></NavBar>
    <FriendsComp friendsList={location.state.list} selectBtn={location.state.selectedBtn}/>
    </div>
  )
}

export default Friends