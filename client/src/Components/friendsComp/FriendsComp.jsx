import React, { useState } from "react";
import FriendList from "../FriendList/FriendList";
import "./FriendsComp.css";
function FriendsComp({ userName, selectBtn }) {
  const initialBtn = {
    followers: "frnd-btns",
    follwing: "frnd-btns",
  };
  const [selectedBtn, setSelectedBtn] = useState(selectBtn);
  return (
    <div className="friends-comp">
      <div className="frnd-container">
        <section className="frnd-sec-1">
          <div
            className={selectedBtn.followers}
            onClick={() =>
              setSelectedBtn({ ...initialBtn, followers: "frnd-btns selected" })
            }
          >
            Followers
          </div>
          <div
            className={selectedBtn.following}
            onClick={() =>
              setSelectedBtn({ ...initialBtn, following: "frnd-btns selected" })
            }
          >
            Following
          </div>
        </section>
        {selectedBtn.followers === "frnd-btns selected" ? (
          <FriendList userName={userName} followers={true} following={false} />
        ) : (
          <FriendList userName={userName} followers={false} following={true} />
        )}
      </div>
    </div>
  );
}

export default FriendsComp;
