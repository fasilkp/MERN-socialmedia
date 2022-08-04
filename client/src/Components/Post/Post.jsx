import React, { useState } from 'react'
import './Post.css'
import { FaHeart} from 'react-icons/fa';
import { MdSend} from 'react-icons/md';
import { FiHeart,FiMessageCircle,FiShare2,FiThumbsDown,FiThumbsUp, FiArrowLeft } from 'react-icons/fi';

function Post(props) {
    const {profileImg, description, postImage, userId, viewpost, likes, comments}=props
    const [liked, setLiked]=useState(false)
    const [commentsHide, setCommentsHide]=useState(true)
  return (
    <div className="post-details">

    <div className={viewpost ? "post post-large" : "post" } >
          <div className="post-header">
            <img src={`/images/${profileImg}`} alt="profile" />
            <span>{userId}</span>
          </div>
          <div className="post-body">
            <img src={postImage} alt="post-body" onDoubleClick={()=>setLiked(!liked)} />
            <div className="center-like-icon-body" style={{height:"0px"}}>
              {liked && <FaHeart className='center-like-icon'></FaHeart>}
              </div>
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
          <div className="total-likes"><b>{likes}</b> likes</div>
          <div className="post-description">
            <b>{userId}</b>
            <span>
              {" "+description}
            </span>
          </div>
          <div className="show-all-comments">
            <button className="show-comments-btn"
            onClick={()=>setCommentsHide(!commentsHide)}>
              {commentsHide ? `show all ${comments.length} comments` : "Hide all Comments"}
              </button>
          </div>
        </div>
        <div className={commentsHide ? "post-comments post-comments-hide" : "post-comments"}>
          <div className="post-comments-header">
            <FiArrowLeft onClick={()=>setCommentsHide(!commentsHide)}></FiArrowLeft> &nbsp; comments
          </div>
          <div className="add-comment">
            <input type="text" placeholder='enter a comment..' />
            <div className="comment-send">
                <MdSend/>
            </div>
          </div>
          <div className="post-comments-list">
            <div className="post-single-comment">
              <div className="post-comment-profile">
                <img src={`/images/${profileImg}`} alt="" />
                <b>fasil_kp</b>
                <span>3 hours ago </span>
              </div>
              <div className="post-comment-description">
                <span>jefnebf berf erk fer b,fgfgh er,gysrfhg,bhdjst vdj</span>
              </div>
              <div className="comment-like-section">
                  <FiThumbsUp className='like-icons'/> like
                  <FiThumbsDown className='like-icons'/> dislike
              </div>
            </div>
            <div className="post-single-comment">
              <div className="post-comment-profile">
                <img src={`/images/${profileImg}`} alt="" />
                <b>fasil_kp</b>
                <span>3 hours ago </span>
              </div>
              <div className="post-comment-description">
                <span>jefnebf berf erk fer b,fgfgh er,gysrfhg,bhdjst vdj</span>
              </div>
              <div className="comment-like-section">
                  <FiThumbsUp className='like-icons'/> like
                  <FiThumbsDown className='like-icons'/> dislike
              </div>
            </div>
            <div className="post-single-comment">
              <div className="post-comment-profile">
                <img src={`/images/${profileImg}`} alt="" />
                <b>fasil_kp</b>
                <span>3 hours ago </span>
              </div>
              <div className="post-comment-description">
                <span>jefnebf berf erk fer b,fgfgh er,gysrfhg,bhdjst vdj</span>
              </div>
              <div className="comment-like-section">
                  <FiThumbsUp className='like-icons'/> like
                  <FiThumbsDown className='like-icons'/> dislike
              </div>
            </div>
            <div className="post-single-comment">
              <div className="post-comment-profile">
                <img src={`/images/${profileImg}`} alt="" />
                <b>fasil_kp</b>
                <span>3 hours ago </span>
              </div>
              <div className="post-comment-description">
                <span>jefnebf berf erk fer b,fgfgh er,gysrfhg,bhdjst vdj</span>
              </div>
              <div className="comment-like-section">
                  <FiThumbsUp className='like-icons'/> like
                  <FiThumbsDown className='like-icons'/> dislike
              </div>
            </div>
            <div className="post-single-comment">
              <div className="post-comment-profile">
                <img src={`/images/${profileImg}`} alt="" />
                <b>fasil_kp</b>
                <span>3 hours ago </span>
              </div>
              <div className="post-comment-description">
                <span>jefnebf berf erk fer b,fgfgh er,gysrfhg,bhdjst vdj</span>
              </div>
              <div className="comment-like-section">
                  <FiThumbsUp className='like-icons'/> like
                  <FiThumbsDown className='like-icons'/> dislike
              </div>
            </div>
            <div className="post-single-comment">
              <div className="post-comment-profile">
                <img src={`/images/${profileImg}`} alt="" />
                <b>fasil_kp</b>
                <span>3 hours ago </span>
              </div>
              <div className="post-comment-description">
                <span>jefnebf berf erk fer b,fgfgh er,gysrfhg,bhdjst vdj</span>
              </div>
              <div className="comment-like-section">
                  <FiThumbsUp className='like-icons'/> like
                  <FiThumbsDown className='like-icons'/> dislike
              </div>
            </div>
            <div className="post-single-comment">
              <div className="post-comment-profile">
                <img src={`/images/${profileImg}`} alt="" />
                <b>fasil_kp</b>
                <span>3 hours ago </span>
              </div>
              <div className="post-comment-description">
                <span>jefnebf berf erk fer b,fgfgh er,gysrfhg,bhdjst vdj</span>
              </div>
              <div className="comment-like-section">
                  <FiThumbsUp className='like-icons'/> like
                  <FiThumbsDown className='like-icons'/> dislike
              </div>
            </div>
            <div className="post-single-comment">
              <div className="post-comment-profile">
                <img src={`/images/${profileImg}`} alt="" />
                <b>fasil_kp</b>
                <span>3 hours ago </span>
              </div>
              <div className="post-comment-description">
                <span>jefnebf berf erk fer b,fgfgh er,gysrfhg,bhdjst vdj</span>
              </div>
              <div className="comment-like-section">
                  <FiThumbsUp className='like-icons'/> like
                  <FiThumbsDown className='like-icons'/> dislike
              </div>
            </div>
            <div className="post-single-comment">
              <div className="post-comment-profile">
                <img src={`/images/${profileImg}`} alt="" />
                <b>fasil_kp</b>
                <span>3 hours ago </span>
              </div>
              <div className="post-comment-description">
                <span>jefnebf berf erk fer b,fgfgh er,gysrfhg,bhdjst vdj</span>
              </div>
              <div className="comment-like-section">
                  <FiThumbsUp className='like-icons'/> like
                  <FiThumbsDown className='like-icons'/> dislike
              </div>
            </div>
            <div className="post-single-comment">
              <div className="post-comment-profile">
                <img src={`/images/${profileImg}`} alt="" />
                <b>fasil_kp</b>
                <span>3 hours ago </span>
              </div>
              <div className="post-comment-description">
                <span>jefnebf berf erk fer b,fgfgh er,gysrfhg,bhdjst vdj</span>
              </div>
              <div className="comment-like-section">
                  <FiThumbsUp className='like-icons'/> like
                  <FiThumbsDown className='like-icons'/> dislike
              </div>
            </div>
          </div>
          
        </div>
    </div>
  )
}

export default Post