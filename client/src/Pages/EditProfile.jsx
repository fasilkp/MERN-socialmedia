import React, {useContext} from 'react'
import EditProfileComp from '../Components/EditProfileComp/EditProfileComp'
import Header from '../Components/Header/Header'
import AuthContext from '../context/AuthContext'
function EditProfile() {
  const {user}=useContext(AuthContext)
  return (
    <>
      <Header headerName="Profile" headerPath={"/user/"+user.userName}/>
      <EditProfileComp/>
    </>
  )
}

export default EditProfile