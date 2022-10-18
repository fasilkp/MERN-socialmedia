import React, {useState, useContext} from "react";
import '../registerComponent/RegisterComp.css'
import loginImg from '../../images/login.jpg'
import {Link, useNavigate} from 'react-router-dom'
import Axios from "axios";
import AuthContext from "../../context/AuthContext";
import Loader from "../Loader/Loader";
function DemoLogin() {
  const {updateLogin}=useContext(AuthContext)
  const [load, setLoad]=useState(false)
  const [password, setPassword]=useState("");
  const [userName, setUserName]=useState("");
  const navigate=useNavigate()
  const handleChange=(e, setState)=>{
    eval(setState+"(e.target.value)")
  }
  const loginDemo=async ()=>{
    setLoad(true)
    const user = await Axios.post("/auth/login", {userName:"demo", password:"1234"});
    if(user.data.login){
      updateLogin();
      navigate('/')
      setLoad(false)
    }
    else{  
      alert(user.data.message);
      setLoad(false)
    }
  }
  const handleSubmit=async e=>{
    e.preventDefault();
    setLoad(true)
    const user = await Axios.post("/auth/login", {userName, password});
    console.log(user.data.message);
    if(user.data.login){
      updateLogin();
      navigate('/')
      setLoad(false)
    }
    else{  
      alert(user.data.message);
      setLoad(false)
    }
  }
  return (
    <div className="RegisterComp">
      <div className="reg-illustration">
        <img src={loginImg} alt="" />
      </div>
      <div className="register-box">
        <div className="reg-header">
          <h2>Welcome to Crowdly</h2>
          <span>Login into your Account</span>
        </div>
        <div className="reg-body">
            <input type="text" placeholder="User Name" className="reg-input"
             value={userName} onChange={e=>handleChange(e, 'setUserName')} />
            <input type="password" placeholder="Password" className="reg-input"
             value={password} onChange={e=>handleChange(e, 'setPassword')} />
            <button onClick={handleSubmit} className="reg-btn" disabled={load || userName==="" || password===""}>Login</button>
        </div>
        <Link className="links" to="/register"><div className="another-link"> Don't Have an Acoount? Create One!</div></Link>
        <button className="reg-btn" onClick={loginDemo}>Login Demo</button>

      </div>
      {
        load && <Loader type="HashLoader"/>
      }
    </div>
  );
}

export default DemoLogin;
