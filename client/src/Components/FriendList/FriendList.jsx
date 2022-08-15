import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import "./FriendList.css";
function FriendList({ friendsList }) {
  const [list, setList]=useState([])
  useEffect(()=>{
    const fetchData=async ()=>{
      setList([])
      await axios.post('/user/get-users', {Ids:friendsList}).then(response=>{
          setList(response.data)
      })
    }
    fetchData();
    },[friendsList])
  return (
    <div className="friend-list">
      {
        list?.map((item, index) => {
          return <div className="single-frnd">
            <div className="fr-img-details">
              <div className="fr-img">
                <img
                  src="http://localhost:8080/images/profile-images/defaultImage.jpg"
                  alt=""
                />
              </div>
              <div className="frnd-details">
                <span>{item.userName}</span>
                <span>{item.name}</span>
              </div>
            </div>
            <div className="frnd-btn remove">
              <button>following</button>
            </div>
          </div>
        })
      }

    </div>
  );
}

export default FriendList;
