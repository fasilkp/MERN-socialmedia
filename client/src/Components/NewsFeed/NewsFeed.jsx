import React from "react";
import "./NewsFeed.css";
import image1 from "../../images/1.jpg";
import image2 from "../../images/2.jpg";
import image4 from "../../images/4.jpg";
import profile from "../../images/profile_user.jpg";
import Post from "../Post/Post";
function NewsFeed() {
  const desc =
    "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Exercitationem ipsa excepturi, soluta voluptates molestiae nulla suscipit nisi numquam neque dolorum iure quos in praesentium at, nam deleniti quo, aut cum.";

  return (
    <div className="news-feed main">
      <div className="posts">
        <Post
          profileImg={profile}
          userId="fasil_k.p"
          post={image1}
          description={desc}
        ></Post>
        <Post
          profileImg={profile}
          userId="fasil_k.p"
          post={image2}
          description={desc}
        ></Post>
        <Post
          profileImg={profile}
          userId="fasil_k.p"
          post={image4}
          description={desc}
        ></Post>

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
