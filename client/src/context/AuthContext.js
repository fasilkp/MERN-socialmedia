import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

function AuthContextProvider(props) {
  const [user, setUser] = useState({loggedIn:undefined, name:""});
  const [test, setTest]=useState("hello")

  async function getLoggedIn() {
    try{
      const loggedInRes = await axios.post("http://localhost:8080/api/auth/check-logged-in");
      setUser({loggedIn:loggedInRes.data.loggedIn, name:loggedInRes.data.name});
      return loggedInRes.data;
    }catch(err){
      console.log("Error: " + err.message);
      setUser({loggedIn:false, error:err});
    }
  }

  useEffect(() => {
    getLoggedIn();
  }, []);

  return (
    <AuthContext.Provider value={{ user, getLoggedIn }}>
      {props.children}
    </AuthContext.Provider>
  );
}


export default AuthContext;
export { AuthContextProvider }