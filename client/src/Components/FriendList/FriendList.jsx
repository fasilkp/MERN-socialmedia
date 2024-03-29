import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../../context/AuthContext";
import "./FriendList.css";
import removeItem from "../../actions/removeItem";
import {Link} from 'react-router-dom'
import InsideLoader from "../InsideLoader/InsideLoader";

function FriendList({ userName, followers, following }) {
  const { user } = useContext(AuthContext)
  const [load, setLoad]=useState({initial:true})
  const baseProfilImgURL = "https://crowdlybackend.herokuapp.com/images/profile-images/";
  const [list, setList] = useState([])
  useEffect(() => {
    setLoad({...load, initial:true})
    const fetchData = async () => {
      setList([])
      const profileUser=await axios.post('/user/get-user', {userName:userName});
      if(followers){
        await axios.post('/user/get-users', { Ids: profileUser.data.user.followers }).then(response => {
          setList(response.data)
          setLoad({...load, initial:false})

        })
      }
      if(following){
        await axios.post('/user/get-users', { Ids: profileUser.data.user.following }).then(response => {
          setList(response.data)
          setLoad({...load, initial:false})

        })
      }
    }
    fetchData();

  }, [followers, following])
  // const followUser = async (id) => {
  //   await axios.post('/user/follow-user', { followerId: user._id, followingId: id }).then(response => {
  //     if (response.data.err) alert("something went wrong ");
  //     else {
  //       alert("followed");
  //       // window.location.reload();
  //     }
  //   })
  // }
  // const unFollowUser = async (id) => {
  //   await axios.post('/user/unfollow-user', { followerId: user._id, followingId: id }).then(response => {
  //     if (response.data.err) alert("something went wrong ");
  //     else {
  //       alert("unfollowed");
  //       // window.location.reload();
  //     }
  //   })
  // }
  return (
    <div className="friend-list">
      {
        list?.map((item, index) => {
          return <Link to={"/user/"+item.userName} key={index} className="links friend">
          <div className="single-frnd" >
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
            
          </div>
          </Link>
        })
      }
      {
       load.initial && <InsideLoader type="FadeLoader" color="black"/>
      }

    </div>
  );
}

export default FriendList;
