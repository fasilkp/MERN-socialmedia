import React from 'react'
import NavBar from '../Components/NavBar/NavBar'
import UploadPost from '../Components/UploadPost/UploadPost'
function AddPost() {
  return (
    <div className='main'>
    <NavBar clicked={{
          home:"rgb(152, 200, 192)",
          friends:"rgb(152, 200, 192)",
          chat:"rgb(152, 200, 192)",
          add:"rgb(0, 130, 109)",
          }}></NavBar>
          <UploadPost></UploadPost>
    </div>
  )
}

export default AddPost