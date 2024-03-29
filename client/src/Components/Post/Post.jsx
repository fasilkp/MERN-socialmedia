import React, { useState, useContext } from "react";
import "./Post.css";
import AuthContext from "../../context/AuthContext";
import { Dropdown } from "react-bootstrap";
import { FaHeart } from "react-icons/fa";
import { MdSend } from "react-icons/md";
import Skeleton from "@mui/material/Skeleton";
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
import Profile from "../../Pages/Profile";

function Post(props) {
  const baseProfilImgURL =
    "https://crowdlybackend.herokuapp.com/images/profile-images/";
  const {
    description,
    postImage,
    userId,
    userName,
    viewpost,
    likes,
    comments,
    date,
    showDelete,
    id,
    postSrc,
    publicId
  } = props;
  const { user } = useContext(AuthContext);

  const [liked, setLiked] = useState(likes.indexOf(user._id) >= 0);
  const [totalLikes, setTotalLikes] = useState(likes);
  const [commentsHide, setCommentsHide] = useState(true);
  const [newComment, setNewComment] = useState("");
  const [userDetails, setUserDetails] = useState({});
  const [imageLoad, setImageLoad] = useState(false);
  const [profileLoad, setProfileLoad] = useState(false);
  const [allComments, setAllComments] = useState(
    comments.sort(function (a, b) {
      return new Date(b.date) - new Date(a.date);
    })
  );
  useEffect(() => {
    let commentIds = [];
    let userDet = {};
    allComments.forEach((item) => {
      if (commentIds.indexOf(item.userId) < 0) {
        commentIds = [...commentIds, item.userId];
      }
    });
    axios.post("/user/get-users", { Ids: commentIds }).then((response) => {
      response.data.forEach((item) => {
        userDet = { ...userDet, [item._id]: item.userName };
      });
      setUserDetails(userDet);
    });
  }, [allComments]);

  const deletePost = async () => {
    if (window.confirm("Do you really want to Delete this post?")) {
      await axios
        .delete("/posts/delete-post", { params: { id: id, postSrc, publicId } })
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
    }
  };
  const unLikePost = async () => {
    if (liked) {
      await axios.post("/posts/unlike-post", { postId: id, likedId: user._id });
      setTotalLikes([...new Set(removeItem(totalLikes, user._id))]);
      setLiked(false);
    }
  };
  const addComment = async (e) => {
    e.preventDefault();
    if (newComment !== "") {
      await axios
        .post("/posts/add-comment", {
          postId: id,
          userId: user._id,
          comment: newComment,
        })
        .then((res) => {
          if (res.err) {
            alert("commment failed");
          } else {
            setAllComments([
              { comment: newComment, userId: user._id, date: new Date() },
              ...allComments,
            ]);
            setNewComment("");
          }
        });
    }
  };
  return (
    <div className="post-details">
      <div className={viewpost ? "post post-large" : "post"}>
        <div className="post-header">
          <div className="post-head">
            {!profileLoad ? <Skeleton variant="circular" height={30} width={30}> 
            <img
              src={baseProfilImgURL + userId + ".jpg"}
              alt="profile"
              onLoad={() => setProfileLoad(true)}
              onError={(event) => {
                event.target.src = baseProfilImgURL + "defaultImage.jpg";
                event.onerror = null;
              }}/>
              </Skeleton>
             : <img
              onLoad={() => setProfileLoad(true)}
              src={baseProfilImgURL + userId + ".jpg"}
              alt="profile"
              onError={(event) => {
                event.target.src = baseProfilImgURL + "defaultImage.jpg";
                event.onerror = null;
              }}/>}
              
              
            <span>
              <Link to={"/user/" + userName} className="links">
                {userName}
              </Link>
            </span>
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
          {!imageLoad && 
          <Skeleton variant="rectangular" height={300}>
          </Skeleton>
          }
          <img
            src={postSrc}
            alt="post-body"
            onDoubleClick={likePost}
            onLoad={() => setImageLoad(true)}
            onError={(event) => {
              event.target.src =
                "https://bitsofco.de/content/images/2018/12/Screenshot-2018-12-16-at-21.06.29.png";
              event.onerror = null;
            }}
          />
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
          <b>
            <Link to={"/user/" + userId} className="links">
              {userName}
            </Link>
          </b>
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
            <input
              type="text"
              placeholder="enter a comment.."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <div className="comment-send" onClick={addComment}>
              <MdSend />
            </div>
          </form>
        </div>

        <div className="post-comments-list">
          {allComments.map((obj) => {
            return (
              <div className="post-single-comment">
                <div className="post-comment-profile">
                  <img src={baseProfilImgURL + "defaultImage.jpg"} alt="" />
                  <div className="name-section">
                    <Link
                      to={"/user/" + userDetails[obj.userId]}
                      className="links"
                    >
                      <b>{userDetails[obj.userId]}</b>
                    </Link>
                    <span>
                      {new Date(obj.date).toLocaleDateString("pt-PT")}
                    </span>
                  </div>
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
