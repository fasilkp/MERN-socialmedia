import React, { useContext, useState } from "react";
import "./ProfileComp.css";
import profileImage from "../../images/profile_user.jpg";
import { Link } from "react-router-dom";
import {FiArrowRight} from 'react-icons/fi'
import AuthContext from "../../context/AuthContext";
import { useEffect } from "react";
import axios from "axios";
function ProfileComp({userName}) {
  const {user}= useContext(AuthContext)
  const [allPosts, setAllPosts]= useState([])
  const baseImgUrl="http://localhost:8080/images/postImages/"
  useEffect(()=>{
    async function fetchData(){
      await axios.get('/posts/profile-posts', { params: { userName } }).then((response)=>{
          setAllPosts(response.data)
      })
    }
    fetchData();
  },[])

  const followUser=async ()=>{
    await axios.post('/user/followUser', {followerId:user._id, follwingId:"hello"})
  }
  const unFollowUser=async ()=>{
    await axios.post('/user/unfollowUser', {})
  }



  const basePrfURL="http://localhost:8080/images/profile-images/"
  return (
    <div className="profile">
      <div className="profile-wrapper">
        <div className="profile-section">
          <div className="profile-image">
            <img src={basePrfURL+user.image} alt="" />
          </div>
          <div className="profile-name">
            <h2>{userName}</h2>
          </div>
          <div className="profile-name profile-id">
            <h3>@{userName}</h3>
          </div>
          <div className="profile-details">
            <div className="prof-det-item">
              <h3>43</h3>
              <span>posts</span>
            </div>
            <div className="prof-det-item">
              <h3>43</h3>
              <span>followers</span>
            </div>
            <div className="prof-det-item">
              <h3>43</h3>
              <span>following</span>
            </div>
          </div>
          <div className="profile-description">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Consequatur
            </p>
          </div>
          <div className="profile-btns">
            {
              user.userName===userName ?
              <button className="profile-btn-full">Edit Profile</button>
              :
              <>
              <button className="profile-btn">Message</button>
              <button className="profile-btn">Follow</button>
              </>


            }
            
            
          </div>
        </div>

        <div className="profile-post-section">
          <div className="pf-post-header">
            <h3>posts <FiArrowRight></FiArrowRight> </h3>
          </div>
          <div className="pf-posts-list">
            {/* <Link to="/viewpost/profile_user.jpg/markjoe/MarkJoe/profile_user.jpg"
            state={{ profileImage:profileImage, userId:"markjoe", userName:"Mark Joe", postImage:"/images/profile_user.jpg"  }} 
            className="links">
              <div
              className="pf-post"
              style={{ backgroundImage: `url("/images/profile_user.jpg")` }}
            ></div></Link> */}
            {
              allPosts.map((obj, index)=>{
                return <Link to={"/post/"+obj._id} className="links"> 
                <div
                key={index}
                className="pf-post"
                style={{ backgroundImage: `url("${baseImgUrl+obj.postSrc}")` }}
              ></div></Link>
              })
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileComp;
