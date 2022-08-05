import React from "react";
import "./NewsFeed.css";
import image1 from "../../images/1.jpg";
import image2 from "../../images/2.jpg";
import image4 from "../../images/4.jpg";
import profile from "../../images/profile_user.jpg";
import Post from "../Post/Post";
import { FiArrowRight } from "react-icons/fi";
import { useEffect, useState } from "react";
import axios from "axios"
function NewsFeed() {
    const [allPosts, setAllPosts]=useState([])
    const baseImageURL="http://localhost:8080/images/postImages/"
  useEffect(()=>{
    try{
    const fetchData = async()=>{
        const result = await axios.get('/posts/view-post');
        if(!result.data.success) alert("something went wrong")
        else{
          setAllPosts(result.data.allPosts);
        }

      };
      fetchData();
    }catch(err){
      alert("something went wrong");
      console.log(err);
    }
  },[])
  return (
    <div className="news-feed main">
      <div className="posts">
        <div className="feed-header">
          <h2>Discover <FiArrowRight className="feed-header-icon" /> </h2>
        </div>
        {
          allPosts[0] &&
          allPosts.map((post, index)=>{
            return  <Post
                    key={index}
                    profileImg={"http://localhost:8080/images/profile-images/defaultImage.jpg"}
                    userId={post.userName}
                    postImage={baseImageURL+post.postSrc}
                    viewpost={false}
                    likes={post.likes}
                    comments={post.comments}
                    date={new Date(post.uploadedAt)}
                    description={post.description}>
                    </Post>
          })
        }
      </div>
    </div>
  );
}

export default NewsFeed;
