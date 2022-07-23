import React from "react";
import "./ProfileComp.css";
import profileImage from "../../images/profile_user.jpg";
import { Link } from "react-router-dom";
function ProfileComp() {
  return (
    <div className="profile">
      <div className="profile-wrapper">
        <div className="profile-section">
          <div className="profile-image">
            <img src={profileImage} alt="" />
          </div>
          <div className="profile-name">
            <h2>Mark Joe</h2>
          </div>
          <div className="profile-name profile-id">
            <h3>@markjoe</h3>
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
              Consequatur repellat doloremque quos at dignissimos repudiandae
            </p>
          </div>
          <div className="profile-btns">
            <button className="profile-btn">Message</button>
            <button className="profile-btn">Follow</button>
          </div>
        </div>

        <div className="profile-post-section">
          <div className="pf-post-header">
            <h3>posts -&gt;</h3>
          </div>
          <div className="pf-posts-list">
            <Link to="/viewpost/profile_user.jpg/markjoe/MarkJoe/profile_user.jpg"
            state={{ profileImage:profileImage, userId:"markjoe", userName:"Mark Joe", postImage:"/images/profile_user.jpg"  }} 
            className="links">
              <div
              className="pf-post"
              style={{ backgroundImage: `url("/images/profile_user.jpg")` }}
            ></div></Link>
            <div
              className="pf-post"
              style={{ backgroundImage: `url("/images/1.jpg")` }}
            ></div>
            <div
              className="pf-post"
              style={{ backgroundImage: `url("/images/2.jpg")` }}
            ></div>
            <div
              className="pf-post"
              style={{ backgroundImage: `url("/images/3.jpg")` }}
            ></div>
            <div
              className="pf-post"
              style={{ backgroundImage: `url("/images/4.jpg")` }}
            ></div>
            <div
              className="pf-post"
              style={{ backgroundImage: `url("/images/3.jpg")` }}
            ></div>
            <div
              className="pf-post"
              style={{ backgroundImage: `url("/images/profile_user.jpg")` }}
            ></div>
            <div
              className="pf-post"
              style={{ backgroundImage: `url("/images/1.jpg")` }}
            ></div>
            <div
              className="pf-post"
              style={{ backgroundImage: `url("/images/2.jpg")` }}
            ></div>
            <div
              className="pf-post"
              style={{ backgroundImage: `url("/images/4.jpg")` }}
            ></div>
            <div
              className="pf-post"
              style={{ backgroundImage: `url("/images/4.jpg")` }}
            ></div>
            <div
              className="pf-post"
              style={{ backgroundImage: `url("/images/profile_user.jpg")` }}
            ></div>
            <div
              className="pf-post"
              style={{ backgroundImage: `url("/images/1.jpg")` }}
            ></div>
            <div
              className="pf-post"
              style={{ backgroundImage: `url("/images/2.jpg")` }}
            ></div>
            <div
              className="pf-post"
              style={{ backgroundImage: `url("/images/3.jpg")` }}
            ></div>
            <div
              className="pf-post"
              style={{ backgroundImage: `url("/images/4.jpg")` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileComp;
