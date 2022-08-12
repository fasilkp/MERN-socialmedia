import React, {useState, useContext} from "react";
import '../registerComponent/RegisterComp.css'
import loginImg from '../../images/login.jpg'
import {Link, useNavigate} from 'react-router-dom'
import Axios from "axios";
import AuthContext from "../../context/AuthContext";
import BeatLoader from "react-spinners/BeatLoader";
function LoginComp() {
  const {updateLogin}=useContext(AuthContext)
  const [load, setLoad]=useState(false)
  const [password, setPassword]=useState("");
  const [email, setEmail]=useState("");
  const navigate=useNavigate()
  const handleChange=(e, setState)=>{
    eval(setState+"(e.target.value)")
  }
  const handleSubmit=async e=>{
    e.preventDefault();
    setLoad(true)
    const user = await Axios.post("/auth/login", {email, password});
    console.log(user.data.message);
    if(user.data.login){
      updateLogin();
      alert("login successfull");
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
          <h2>Welcome to Sociam</h2>
          <span>Login into your Account</span>
        </div>
        <div className="reg-body">
            <input type="email" placeholder="Email" className="reg-input"
             value={email} onChange={e=>handleChange(e, 'setEmail')} />
            <input type="password" placeholder="Password" className="reg-input"
             value={password} onChange={e=>handleChange(e, 'setPassword')} />
            <button onClick={handleSubmit} className="reg-btn" disabled={load || email==="" || password===""}>
              {
              load ? <BeatLoader color="white"/> : "Login"
              }
              </button>
        </div>
        <Link className="links" to="/register"><div className="another-link"> Don't Have an Acoount? Create One!</div></Link>
      </div>
    </div>
  );
}

export default LoginComp;
