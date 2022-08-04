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
  const desc =
    "Lorem ipsum dolor sit amet consectetur";
    const [allPosts, setAllPosts]=useState([])
    const baseImageURL="http://localhost:8080/images/postImages/"
  useEffect(()=>{
    try{
    const fetchData = async()=>{
        const result = await axios.get('/posts/view-post');
        if(!result.data.success) alert("something went wrong")
        else{
          setAllPosts(result.data.allPosts);
          console.log(result.data.allPosts);
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
                    profileImg={"profile_user.jpg"}
                    userId={post.userName}
                    postImage={baseImageURL+post.postSrc}
                    viewpost={false}
                    likes={post.likes}
                    comments={post.comments}
                    description={post.description}>
                    </Post>
          })
        }
        {/* <Post
          profileImg={"profile_user.jpg"}
          userId="fasil_k.p"
          postImage={"1.jpg"}
          viewpost={false}
          description={desc}
        ></Post>
        <Post
          profileImg={"profile_user.jpg"}
          userId="fasil_k.p"
          postImage={"2.jpg"}
          viewpost={false}
          description={desc}
        ></Post>
        <Post
          profileImg={"profile_user.jpg"}
          userId="fasil_k.p"
          postImage={"4.jpg"}
          viewpost={false}
          description={desc}
        ></Post> */}

        {/* <div className="post">
          <div className="post-header">
            <img src={profile} alt="profile" />
            <span>fasil.kp</span>
          </div>
          <div className="post-body">
            <img src={image2} alt="post-body" />
          </div>
          <div className="reaction-section">
            <div className="reaction-like">
              <FontAwesomeIcon icon={faHeart} className="" />
            </div>
            <div className="comment">
              <FontAwesomeIcon icon={faMessage} className="" />
            </div>
            <div className="share">
              <FontAwesomeIcon icon={faShare} className="" />
            </div>
          </div>
          <div className="total-likes">234135 likes</div>
          <div className="post-description">
            <b>fasil.kp</b>
            <span>
              {" "}
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt
              velit nobis, facere iusto amet corporis enim neque doloremque?
              Earum, doloribus velit quidem libero expedita impedit nostrum
              porro veniam obcaecati vitae!{" "}
            </span>
          </div>
          <div className="show-all-comments">
            <button className="show-comments-btn">show all comments</button>
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default NewsFeed;
