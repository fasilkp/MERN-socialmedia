import React from 'react'
import NavBar from '../Components/NavBar/NavBar'
function AddPost() {
  return (
    <>
    <NavBar clicked={{
          home:"rgb(152, 200, 192)",
          friends:"rgb(152, 200, 192)",
          chat:"rgb(152, 200, 192)",
          add:"rgb(0, 130, 109)",
          }}></NavBar>
    </>
  )
}

export default AddPost