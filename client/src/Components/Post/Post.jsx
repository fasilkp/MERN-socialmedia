import React, { useState } from 'react'
import './Post.css'
import { FiHeart,FiMessageCircle,FiShare2 } from 'react-icons/fi';
import { FaHeart} from 'react-icons/fa';

function Post(props) {
    const {profileImg, description, post, userId}=props
    const [liked, setLiked]=useState(false)
  return (
    <div className="post">
          <div className="post-header">
            <img src={profileImg} alt="profile" />
            <span>{userId}</span>
          </div>
          <div className="post-body">
            <img src={post} alt="post-body" onDoubleClick={()=>setLiked(!liked)} />
          </div>
          <div className="reaction-section">
            <div className="reaction-like" onClick={()=>setLiked(!liked)}>
              {!liked ? <FiHeart className="reaction-icons"/> :
              <FaHeart className="liked-icon"/>}


            </div>
            <div className="comment">
              <FiMessageCircle className="reaction-icons" />
            </div>
            <div className="share">
              <FiShare2 className="reaction-icons" />
            </div>
          </div>
          <div className="total-likes"><b>2,34,135</b> likes</div>
          <div className="post-description">
            <b>fasil.kp</b>
            <span>
              {" "+description}
            </span>
          </div>
          <div className="show-all-comments">
            <button className="show-comments-btn">show all comments</button>
          </div>
        </div>
  )
}

export default Post