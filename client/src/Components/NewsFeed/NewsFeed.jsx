import React from "react";
import "./NewsFeed.css";
import Post from "../Post/Post";
import { FiArrowRight } from "react-icons/fi";
import { useEffect, useState, useContext } from "react";
import axios from "axios"
import AuthContext from "../../context/AuthContext";
import Loader from "../Loader/Loader";
function NewsFeed() {
    const [allPosts, setAllPosts]=useState([])
    const {user}=useContext(AuthContext)
    const [load, setLoad]=useState({initial:true})
    const baseImageURL="https://crowdlybackend.herokuapp.com/images/postImages/"
  useEffect(()=>{
    try{
    const fetchData = async()=>{
        const result = await axios.get('/posts/view-post');
        if(!result.data.success) alert("something went wrong")
        else{
          setAllPosts(result.data.allPosts);
          setLoad({...load, initial:false})

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
                    userId={post.userName}
                    postImage={baseImageURL+post.postSrc}
                    postSrc={post.postSrc}
                    viewpost={false}
                    id={post._id}
                    likes={post.likes}
                    comments={post.comments}
                    date={new Date(post.uploadedAt)}
                    description={post.description}
                    showDelete={user._id===post.userId}>
                    </Post>
          })
        }
      </div>
      {
        load.initial &&
        <Loader type={"HashLoader"}></Loader>
      }
    </div>
  );
}

export default NewsFeed;
