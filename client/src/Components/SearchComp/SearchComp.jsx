import React, { useEffect, useState } from "react";
import "./SearchComp.css";
import axios from "axios";
import { BiArrowBack, BiX } from "react-icons/bi";
import { Link } from "react-router-dom";
function SearchComp({ input, setShowSearch }) {
  const [searchInput, setSearchInput] = useState(input);
  const [usersList, setUsersList] = useState([]);
  useEffect(() => {
    const fetchData = async (e) => {
        if(input!==""){
            const response = await axios.post("/user/get-users-regex", {
              regex:input,
            });
            setUsersList(response.data);
        }
            
    };
    fetchData();
  }, [input]);
  useEffect(() => {
    const fetchData = async (e) => {
        if(searchInput!==""){
            const response = await axios.post("/user/get-users-regex", {
            regex: searchInput,
            });
            setUsersList(response.data);
         }
    };
    fetchData();
  }, [searchInput]);
  const hanldeSearchBox=()=>{
    setShowSearch(false)
  }
  return (
    <div className="search-main">
      <div className="search-list-container">
        <div className="search-input-col">
          <BiArrowBack className="icon back" onClick={()=>setShowSearch(false)} />
          <input
            type="text" 
            value={searchInput}
            placeholder="Search users..."
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <BiX className="icon close" onClick={()=>setShowSearch(false)} />
        </div>
        {usersList.map((obj, index) => {
          return <Link to={"/user/" + obj.userName} key={index} className="links" onClick={hanldeSearchBox}>
            <div className="search-list-item" >
              <img
                src={"http://localhost:8080/images/profile-images/"+obj.image}
                alt=""
              />
              <div className="search-list-details">
                <b>{obj.userName}</b>
                <span>{obj.name}</span>
              </div>
            </div>
          </Link>
        })}
      </div>
    </div>
  );
}

export default SearchComp;
