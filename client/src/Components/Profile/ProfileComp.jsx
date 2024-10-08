import React, { useContext, useState } from "react";
import "./ProfileComp.css";
import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import AuthContext from "../../context/AuthContext";
import { useEffect } from "react";
import axios from "axios";
import Loader from "../Loader/Loader";
import InsideLoader from "../InsideLoader/InsideLoader";
import { Skeleton } from "@mui/material";
function ProfileComp({ userName }) {
  const { user } = useContext(AuthContext);
  const [load, setLoad]=useState({initial:true, follow:false})
  const [allPosts, setAllPosts] = useState([]);
  const [reload, setReload] = useState(true);
  const [profileUser, setProfileUser] = useState({});
  const baseImgUrl = "https://crowdlybackend.herokuapp.com/images/postImages/";
  useEffect(() => {
    async function fetchData() {
      await axios.post("/user/get-user", { userName }).then((response) => {
        if (response.data.err) alert("something went");
        else {
          setProfileUser(response.data.user);
        }
      });
      await axios
        .get("/posts/profile-posts", { params: { userName } })
        .then((response) => {
          setAllPosts(response.data);
          setLoad({...load, initial:false})
        });
      
    }
    fetchData();
  }, [userName, reload]);

  const followUser = async () => {
    setLoad({...load, follow:true})
    await axios
      .post("/user/follow-user", {
        followerId: user._id,
        followingId: profileUser._id,
      })
      .then((response) => {
        if (response.data.err) alert("something went wrong ");
        else {
          setReload(!reload);
        }
      });
      setLoad({...load, follow:false})
    
  };
  const unFollowUser = async () => {
    setLoad({...load, follow:true})

    await axios
      .post("/user/unfollow-user", {
        followerId: user._id,
        followingId: profileUser._id,
      })
      .then((response) => {
        if (response.data.err) alert("something went wrong ");
        else {
          setReload(!reload);
        }
      });
    setLoad({...load, follow:false})

  };

  const basePrfURL = "https://crowdlybackend.herokuapp.com/images/profile-images/";
  return (
    <div className="profile">
      <div className="profile-wrapper">
        <div className="profile-section">
          <div className="profile-image">
            <div className="profile-image-div">
            <img 
            onError={(event)=>{
              event.target.src = basePrfURL+"defaultImage.jpg"
              event.onerror = null;
            }}
            src={profileUser?.image} alt="" />
            </div>
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
            <Link
              to="/friends"
              className="links"
              state={{
                userName:profileUser.userName,
                selectedBtn: {
                  followers: "frnd-btns selected",
                  following: "frnd-btns",
                },
              }}
            >
              <div className="prof-det-item">
                <h3>{profileUser?.followers?.length}</h3>
                <span>followers</span>
              </div>
            </Link>
            <Link
              to="/friends"
              className="links"
              state={{
                userName:profileUser.userName,
                selectedBtn: {
                  followers: "frnd-btns",
                  following: "frnd-btns selected",
                },
              }}
            >
              <div className="prof-det-item">
                <h3>{profileUser?.following?.length}</h3>
                <span>following</span>
              </div>
            </Link>
          </div>
          <div className="profile-description">
            <pre>{profileUser.bio ? profileUser.bio : "no bio"}</pre>
          </div>
          <div className="profile-btns">
            {user.userName === userName ? (
              <Link to="/edit-profile">
                {" "}
                <button className="profile-btn-full">Edit Profile</button>
              </Link>
            ) : (
              <>
                <button className="profile-btn">Message</button>
                {profileUser?.followers?.indexOf(user._id) === -1 ? (
                  <button className="profile-btn" onClick={followUser} disabled={load.follow}>
                    {
                      load.follow ? <InsideLoader color="white" type="BeatLoader"/> : "Follow"
                    }
                  </button>
                ) : (
                  <button className="profile-btn" onClick={unFollowUser} disabled={load.follow}>
                    {
                      load.follow ? <InsideLoader color="white" type="BeatLoader"/> : "Unfollow"
                    }
                  </button>
                )}
              </>
            )}
          </div>
        </div>

        <div className="profile-post-section">
          <div className="pf-post-header">
            <h3>
              posts <FiArrowRight></FiArrowRight>{" "}
            </h3>
          </div>
          <div className="pf-posts-list">
            {allPosts[0] ? allPosts.map((obj, index) => {
              return (
                <Link to={"/post/" + obj._id} key={index} className="links">
                  <div
                    key={index}
                    className="pf-post"
                    style={{
                      backgroundImage: `url("${obj.postSrc}")`,
                    }}
                  ></div>
                </Link>
              );
            })
          :
          <div className="no-posts">
            <h3>No posts</h3>
          </div>
          }
          </div>
        </div>
      </div>
      {
        load.initial && <Loader type="HashLoader"/>
      }
    </div>
  );
}

export default ProfileComp;
