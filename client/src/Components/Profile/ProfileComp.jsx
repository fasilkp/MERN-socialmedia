import React, { useContext, useState } from "react";
import "./ProfileComp.css";
import { Link } from "react-router-dom";
import { FiArrowRight } from 'react-icons/fi'
import AuthContext from "../../context/AuthContext";
import { useEffect } from "react";
import axios from "axios";
function ProfileComp({ userName }) {
  const { user } = useContext(AuthContext)
  const [allPosts, setAllPosts] = useState([])
  const [reload, setReload] = useState(true)
  const [profileUser, setProfileUser] = useState({})
  const baseImgUrl = "http://localhost:8080/images/postImages/"
  useEffect(() => {
    async function fetchData() {
      await axios.get('/posts/profile-posts', { params: { userName } }).then((response) => {
        setAllPosts(response.data)
      })
      await axios.post('/user/get-user', { userName }).then((response) => {
        if (response.data.err) alert("something went")
        else {
          setProfileUser(response.data.user);
        }
      })
    }
    fetchData();
  }, [userName, reload])
  

  const followUser = async () => {
    await axios.post('/user/follow-user', { followerId: user._id, followingId: profileUser._id }).then(response => {
      if (response.data.err) alert("something went wrong ");
      else {
        alert("followed");
        setReload(!reload)
      }
    })
  }
  const unFollowUser = async () => {
    await axios.post('/user/unfollow-user', { followerId: user._id, followingId: profileUser._id }).then(response => {
      if (response.data.err) alert("something went wrong ");
      else {
        alert("unfollowed");
        setReload(!reload)
      }
    })
  }

  const basePrfURL = "http://localhost:8080/images/profile-images/"
  return (
    <div className="profile">
      <div className="profile-wrapper">
        <div className="profile-section">
          <div className="profile-image">
            <img src={basePrfURL + user.image} alt="" />
          </div>
          <div className="profile-name">
            <h2>{profileUser?.name}</h2>
          </div>
          <div className="profile-name profile-id">
            <h3>@{profileUser?.userName}</h3>
          </div>
          <div className="profile-details">
            <div className="prof-det-item">
              <h3>{allPosts?.length}</h3>
              <span>posts</span>
            </div>
            <Link to="/friends" className="links" state={{
              list: { followers: profileUser.followers, followings: profileUser.following }, selectedBtn: {
                followers: "frnd-btns selected",
                following: "frnd-btns"
              }
            }}>
              <div className="prof-det-item">
                <h3>{profileUser?.followers?.length}</h3>
                <span>followers</span>
              </div>
            </Link>
            <Link to="/friends" className="links" state={{ list:{followers: profileUser.followers, followings: profileUser.following}, selectedBtn: {
                followers: "frnd-btns",
                following: "frnd-btns selected"
              } }}>
              <div className="prof-det-item">
                <h3>{profileUser?.following?.length}</h3>
                <span>following</span>
              </div>
            </Link>
          </div>
          <div className="profile-description">
            <p>
              {profileUser.bio ? profileUser.bio : "no bio"}
            </p>
          </div>
          <div className="profile-btns">
            {
              user.userName === userName ?
                <Link to="/edit-profile"> <button className="profile-btn-full">Edit Profile</button></Link>
                :
                <>
                  <button className="profile-btn">Message</button>
                  {
                    profileUser?.followers?.indexOf(user._id) === -1 ?
                      <button className="profile-btn" onClick={followUser}>Follow</button>
                      :
                      <button className="profile-btn" onClick={unFollowUser}>UnFollow</button>
                  }
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
              allPosts.map((obj, index) => {
                return <Link to={"/post/" + obj._id} key={index} className="links">
                  <div
                    key={index}
                    className="pf-post"
                    style={{ backgroundImage: `url("${baseImgUrl + obj.postSrc}")` }}
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
