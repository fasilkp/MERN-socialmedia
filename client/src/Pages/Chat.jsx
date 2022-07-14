import React from 'react'
import NavBar from '../Components/NavBar/NavBar'
function Chat() {
  return (
    <>
    <NavBar clicked={{
          home:"rgb(152, 200, 192)",
          friends:"rgb(152, 200, 192)",
          chat:"rgb(0, 130, 109)",
          add:"rgb(152, 200, 192)",
          }}></NavBar>
    </>
  )
}

export default Chat