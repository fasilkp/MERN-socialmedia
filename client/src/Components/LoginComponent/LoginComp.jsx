import React, {useState, useContext} from "react";
import '../registerComponent/RegisterComp.css'
import loginImg from '../../images/login.jpg'
import {Link, useNavigate} from 'react-router-dom'
import Axios from "axios";
import AuthContext from "../../context/AuthContext";
function LoginComp() {
  const {getLoggedIn}=useContext(AuthContext)
  const [password, setPassword]=useState("");
  const [email, setEmail]=useState("");
  const navigate=useNavigate()
  const handleChange=(e, setState)=>{
    eval(setState+"(e.target.value)")
  }
  const handleSubmit=async e=>{
    e.preventDefault();
    const user = await Axios.post("/auth/login", {email, password});
    console.log(user.data.message);
    if(user.data.login){
      getLoggedIn();
      alert("login successfull");
      navigate('/')
    }
    else{  
      alert(user.data.message);
    }
  }
  return (
    <div className="RegisterComp">
      <div className="reg-illustration">
        <img src={loginImg} alt="" />
      </div>
      <div className="register-box">
        <div className="reg-header">
          <h2>Welcome to Sociam</h2>
          <span>Login into your Account</span>
        </div>
        <div className="reg-body">
            <input type="email" placeholder="Email" className="reg-input"
             value={email} onChange={e=>handleChange(e, 'setEmail')} />
            <input type="password" placeholder="Password" className="reg-input"
             value={password} onChange={e=>handleChange(e, 'setPassword')} />
            <button onClick={handleSubmit} className="reg-btn">Login</button>
        </div>
        <Link className="links" to="/register"><div className="another-link"> Don't Have an Acoount? Create One!</div></Link>
      </div>
    </div>
  );
}

export default LoginComp;
