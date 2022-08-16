import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../../context/AuthContext";
import "./FriendList.css";
import removeItem from "../../actions/removeItem";
function FriendList({ friendsList }) {
  const { user } = useContext(AuthContext)
  const userFollowings = user.following;
  const baseProfilImgURL = "http://localhost:8080/images/profile-images/";
  const [friendsListIds, setFriendsListIds] = useState(friendsList)
  const [list, setList] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      setList([])
      await axios.post('/user/get-users', { Ids: friendsListIds }).then(response => {
        setList(response.data)
      })
    }
    fetchData();
  }, [friendsListIds])
  const followUser = async (id) => {
    await axios.post('/user/follow-user', { followerId: user._id, followingId: id }).then(response => {
      if (response.data.err) alert("something went wrong ");
      else {
        alert("followed");
        // window.location.reload();
        console.log(`followerId: ${user._id}, followingId: ${id}`)
        setFriendsListIds([...friendsListIds, user._id])
      }
    })
  }
  const unFollowUser = async (id) => {
    await axios.post('/user/unfollow-user', { followerId: user._id, followingId: id }).then(response => {
      if (response.data.err) alert("something went wrong ");
      else {
        alert("unfollowed");
        // window.location.reload();
        console.log(`followerId: ${user._id}, followingId: ${id}`)
        setFriendsListIds([...new Set(removeItem(friendsListIds, id))]);
      }
    })
  }
  return (
    <div className="friend-list">
      {
        list?.map((item, index) => {
          return <div className="single-frnd" key={index}>
            <div className="fr-img-details">
              <div className="fr-img">
                <img
                  src={baseProfilImgURL + item.image}
                  alt=""
                />
              </div>
              <div className="frnd-details">
                <span>{item.userName}</span>
                <span>{item.name}</span>
              </div>
            </div>
            {
              item._id!==user._id ? 
              
               ( userFollowings.includes(item._id) ?
                  <div className="frnd-btn">
                    <button onClick={()=>unFollowUser(item._id)}>Following</button>
                  </div> :
                  <div className="frnd-btn remove">
                    <button onClick={()=>followUser(item._id)}>Follow</button>
                  </div> )
              : null  
            }
            
          </div>
        })
      }

    </div>
  );
}

export default FriendList;
