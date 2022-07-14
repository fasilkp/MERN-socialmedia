import React from 'react'
import NavBar from '../Components/NavBar/NavBar'
import NewsFeed from '../Components/NewsFeed/NewsFeed'
function Home() {
  return (
    <>
        <NavBar clicked={{
          home:"rgb(0, 130, 109)",
          freinds:"rgb(152, 200, 192)",
          chat:"rgb(152, 200, 192)",
          add:"rgb(152, 200, 192)",
          }}></NavBar>
        <NewsFeed></NewsFeed>
    </>
  )
}

export default Home