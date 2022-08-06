import React from "react";
import NavBar from "../Components/NavBar/NavBar";
import Post from "../Components/Post/Post";
import image1 from "../images/1.jpg";
import CenterWrapper from "../Components/CenterWrapper/CenterWrapper";
import { useLocation, useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
function ViewPost() {
  const {postId}=useParams();
 useEffect(()=>{
  const fetchData =async () => {  
    await axios.get('/posts/view-post', {params: {postId:postId}});
  }
  fetchData()
 },[])
  return (
    <div> 
      <NavBar
        clicked={{
          home: "rgb(152, 200, 192)",
          freinds: "rgb(152, 200, 192)",
          chat: "rgb(152, 200, 192)",
          add: "rgb(152, 200, 192)",
        }}>
      </NavBar>
      <div className="extra-height"></div>
      <CenterWrapper>
        <Post
          profileImg={postId}
          userId={postId}
          postImage={postId}
          viewpost={true}
          description={postId} >
        </Post>
      </CenterWrapper>
      <div className="extra-height"></div>
    </div>
  );
}

export default ViewPost;
