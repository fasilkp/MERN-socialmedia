import React from "react";
import NavBar from "../Components/NavBar/NavBar";
import Post from "../Components/Post/Post";
import CenterWrapper from "../Components/CenterWrapper/CenterWrapper";
import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import AuthContext from "../context/AuthContext";
import axios from "axios";
function ViewPost() {
  const { postId } = useParams();
  const {user}=useContext(AuthContext);
  const [post, setPost]=useState({})
  const baseImageURL="https://crowdlybackend.herokuapp.com/images/postImages/"
  useEffect(() => {
    const fetchData = async () => {
      await axios.get("/posts/post", { params: { postId: postId } }).then(result=>{
        if(result.err) alert("somthing went wrong");
        else{
          setPost(result.data)
          
        }
      })
    };
    fetchData();
  }, []);
  return (
    <div>
      <NavBar
        clicked={{
          home: "rgb(152, 200, 192)",
          freinds: "rgb(152, 200, 192)",
          chat: "rgb(152, 200, 192)",
          add: "rgb(152, 200, 192)",
        }}
      ></NavBar>
      <div className="extra-height"></div>
      <CenterWrapper>
      {
        post.userId && 
        <Post
                    profileImg={"https://crowdlybackend.herokuapp.com/images/profile-images/defaultImage.jpg"}
                    userId={post.userName}
                    postImage={baseImageURL+post.postSrc}
                    viewpost={false}
                    likes={post.likes}
                    comments={post.comments}
                    date={new Date(post.uploadedAt)}
                    description={post.description}
                    id={post._id}
                    showDelete={user._id===post.userId}
                    postSrc={post.postSrc}
                    >
                    </Post>
                    }
      </CenterWrapper>
      <div className="extra-height"></div>
    </div>
  );
}

export default ViewPost;
