import React from 'react'
import NavBar from '../Components/NavBar/NavBar'
import ProfileComp from '../Components/Profile/ProfileComp'
import {useParams} from 'react-router-dom'
function Profile() {
  const {userName}=useParams();
  return (
    <div className='main profile-comp'>
    <NavBar clicked={{
          home:"rgb(152, 200, 192)",
          friends:"rgb(152, 200, 192)",
          chat:"rgb(152, 200, 192)",
          add:"rgb(152, 200, 192)",
          }}></NavBar>
          <ProfileComp userName={userName} />
    </div>
  )
}

export default Profile