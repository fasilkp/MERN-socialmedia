import React, { useState, useContext } from "react";
import "./Post.css";
import AuthContext from "../../context/AuthContext";
import { Dropdown } from "react-bootstrap";
import { FaHeart } from "react-icons/fa";
import { MdSend } from "react-icons/md";
import {
  FiHeart,
  FiMessageCircle,
  FiShare2,
  FiThumbsDown,
  FiThumbsUp,
  FiArrowLeft,
  FiMoreVertical,
} from "react-icons/fi";
import { Link } from "react-router-dom";
import axios from "axios";
import removeItem from "../../actions/removeItem";
import { useEffect } from "react";

function Post(props) {
  const baseProfilImgURL = "http://localhost:8080/images/profile-images/";
  const {
    profileImg,
    description,
    postImage,
    userId,
    viewpost,
    likes,
    comments,
    date,
    showDelete,
    id,
    postSrc
  } = props;
  const { user } = useContext(AuthContext);

  const [liked, setLiked] = useState(likes.indexOf(user._id) >= 0);
  const [totalLikes, setTotalLikes] = useState(likes);
  const [commentsHide, setCommentsHide] = useState(true);
  const [newComment, setNewComment] = useState("");
  const [commentUserIds, setCommentUserIds] = useState([]);
  const [allComments, setAllComments]=useState(comments.sort(function(a,b){
    return new Date(b.date) - new Date(a.date);
  }))

  useEffect(()=>{
    setCommentUserIds([]);
    allComments.forEach((item)=>{
      setCommentUserIds(previousArray => [...previousArray, item.userId])
    })
    
  },[])
  useEffect(()=>{
    
  },[commentUserIds])

  const deletePost = async () => {
    if (window.confirm("Do you really want to Delete this post?")) {
      await axios
        .delete("/posts/delete-post", { params: { id: id, postSrc } })
        .then((res) => {
          if (res.data.err) alert("delete failed");
          else {
            alert("successFully deleted");
            window.location.reload();
          }
        });
    }
  };
  const likePost = async () => {
    if (!liked) {
      await axios.post("/posts/like-post", { postId: id, likedId: user._id });
      setTotalLikes([...totalLikes, user._id]);
      setLiked(true);
    };
  }
  const unLikePost = async () => {
    if (liked) {
      await axios.post("/posts/unlike-post", { postId: id, likedId: user._id });
      setTotalLikes([...new Set(removeItem(totalLikes, user._id))]);
      setLiked(false);
    }
  };
  const addComment = async (e) => {
    e.preventDefault();
    if(newComment!==""){
      await axios.post("/posts/add-comment", { postId: id, userId: user._id, comment:newComment }).then(res=>{
        if(res.err){
          alert("commment failed")
        }
        else{
          setAllComments([ { comment: newComment, userId: user._id, date: new Date() }, ...allComments])
          setNewComment("");
        }
      })
    }
  };
  return (
    <div className="post-details">
      <div className={viewpost ? "post post-large" : "post"}>
        <div className="post-header">
          <div className="post-head">
            <img src={profileImg} alt="profile" />
            <span><Link to={"/user/"+userId} className="links">{userId}</Link> </span>
          </div>
          <div className="post-option">
            <Dropdown className="post-option-dropdown">
              <Dropdown.Toggle
                variant="success"
                id="dropdown-basic"
                className="post-toggle"
              >
                <FiMoreVertical />
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {showDelete && (
                  <Dropdown.Item href="#" onClick={deletePost}>
                    delete
                  </Dropdown.Item>
                )}
                <Dropdown.Item href="#">save</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
        <div className="post-body">
          <img src={postImage} alt="post-body" onDoubleClick={likePost} />
          <div className="center-like-icon-body" style={{ height: "0px" }}>
            {liked && <FaHeart className="center-like-icon"></FaHeart>}
          </div>
        </div>
        <div className="reaction-section">
          <div className="reaction-like">
            {!liked ? (
              <FiHeart className="reaction-icons" onClick={likePost} />
            ) : (
              <FaHeart className="liked-icon" onClick={unLikePost} />
            )}
          </div>
          <div className="comment">
            <FiMessageCircle
              className="reaction-icons"
              onClick={() => setCommentsHide(false)}
            />
          </div>
          <div className="share">
            <FiShare2 className="reaction-icons" />
          </div>
        </div>
        <div className="total-likes">
          <b>{totalLikes?.length}</b> likes
        </div>
        <div className="post-description">
          <b><Link to={"/user/"+userId} className="links">{userId}</Link></b>
          <span>{" " + description}</span>
          <br />
          <span>
            {/* {date.getDate()+"/"+date.getMonth()+"/"+date.getFullYear()+"  ("+date.getHours()+ ":" +date.getMinutes()+")"} */}
            {date.toLocaleString("en-IN", {
              hour12: true,
            })}
          </span>
        </div>
        <div className="show-all-comments">
          {comments?.length === 0 ? (
            <button className="show-comments-btn">No Comments</button>
          ) : (
            <button
              className="show-comments-btn"
              onClick={() => setCommentsHide(!commentsHide)}
            >
              {commentsHide
                ? `show ${comments.length} comments`
                : "Hide Comments"}
            </button>
          )}
        </div>
      </div>
      <div
        className={
          commentsHide ? "post-comments post-comments-hide" : "post-comments"
        }
      >
        <div className="post-comments-header">
          <FiArrowLeft
            onClick={() => setCommentsHide(!commentsHide)}
          ></FiArrowLeft>{" "}
          &nbsp; comments
        </div>
        <div className="add-comment">
          <form onSubmit={addComment}>
          <input type="text" placeholder="enter a comment.."
          value={newComment} onChange={(e)=>setNewComment(e.target.value)} />
          <div className="comment-send" onClick={addComment}>
            <MdSend  />
          </div>
          </form>
        </div>

        <div className="post-comments-list">
          {allComments.map((obj) => {
            return (
              <div className="post-single-comment">
                <div className="post-comment-profile">
                  <img src={baseProfilImgURL + "defaultImage.jpg"} alt="" />
                  <b>{obj.userId}</b>
                  <span>
                    {new Date(obj.date).toLocaleDateString('pt-PT')}
                  </span>
                </div>
                <div className="post-comment-description">
                  <span>{obj.comment}</span>
                </div>
                <div className="comment-like-section">
                  {/* <FiThumbsUp className="like-icons" /> like
                  <FiThumbsDown className="like-icons" /> dislike */}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Post;
