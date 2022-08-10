import React from 'react'
import NavBar from '../Components/NavBar/NavBar'
import FriendsComp from '../Components/friendsComp/FriendsComp'
function Friends() {
  return (
    <div className='main'>
    <NavBar clicked={{
          home:"rgb(152, 200, 192)",
          friends:"rgb(0, 130, 109)",
          chat:"rgb(152, 200, 192)",
          add:"rgb(152, 200, 192)",
          }}></NavBar>
    <FriendsComp/>
    </div>
  )
}

export default Friends