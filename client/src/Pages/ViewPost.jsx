import React from "react";
import NavBar from "../Components/NavBar/NavBar";
import Post from "../Components/Post/Post";
import image1 from "../images/1.jpg";
import CenterWrapper from "../Components/CenterWrapper/CenterWrapper";
import { useLocation, useParams } from "react-router-dom";
function ViewPost() {
  const desc =
    " lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonumy eirmod tempor incididunt ut labore et dolore magna aliqu  ";
    const location = useLocation();
    const {profileImage, postImage, userId, userName}=useParams();
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
      <div style={{height:"100px"}}></div>
      <CenterWrapper>
        <Post
          profileImg={profileImage}
          userId={userId}
          postImage={postImage}
          viewpost={true}
          description={desc} >
        </Post>
      </CenterWrapper>
    </div>
  );
}

export default ViewPost;
