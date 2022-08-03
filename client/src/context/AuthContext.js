import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

function AuthContextProvider(props) {
  const [user, setUser] = useState({loggedIn:undefined, name:""});
  const [loggedIn, setLoggedIn]=useState(null)

  async function getLoggedIn() {
    try{
      const loggedInRes = await axios.get("/auth/check-logged-in");
      setUser({loggedIn:loggedInRes.data.loggedIn, name:loggedInRes.data.name});
      setLoggedIn(loggedInRes.data.loggedIn);
      return loggedInRes.data;
    }catch(err){
      console.log("Error: " + err.message);
      setUser({loggedIn:false, error:err});
      setLoggedIn(false)
    }
  }

  useEffect(() => {
    getLoggedIn();
  }, []);

  return (
    <AuthContext.Provider value={{ user, getLoggedIn, loggedIn }}>
      {props.children}
    </AuthContext.Provider>
  );
}


export default AuthContext;
export { AuthContextProvider }