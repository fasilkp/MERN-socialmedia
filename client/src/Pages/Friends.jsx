import React from 'react'
import NavBar from '../Components/NavBar/NavBar'
function Friends() {
  return (
    <>
    <NavBar clicked={{
          home:"rgb(152, 200, 192)",
          friends:"rgb(0, 130, 109)",
          chat:"rgb(152, 200, 192)",
          add:"rgb(152, 200, 192)",
          }}></NavBar>
    </>
  )
}

export default Friends