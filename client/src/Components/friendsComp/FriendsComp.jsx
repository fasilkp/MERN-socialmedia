import React from "react";
import FriendList from "../FriendList/FriendList";
import "./FriendsComp.css";
function FriendsComp() {
  return (
    <div className="friends-comp">
      <div className="frnd-container">
        <section className="frnd-sec-1">
          <div className="frnd-btns">Followers</div>
          <div className="frnd-btns selected">Following</div>
        </section>
        <FriendList />
      </div>
    </div>
  );
}

export default FriendsComp;
