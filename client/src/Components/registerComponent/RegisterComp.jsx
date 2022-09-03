import React, { useState } from "react";
import './RegisterComp.css'
import loginImg from '../../images/login.jpg'
import { Link, useNavigate } from "react-router-dom";
import { useNameValidator } from "../../hooks/useNameValidator";
import BeatLoader from "react-spinners/BeatLoader";
import Axios from 'axios'
import Loader from "../Loader/Loader";
import {replaceSpecialCharecters} from '../../actions/replaceSpecialCharecters'
function RegisterComp() {
  const [submitLoad, setSubmitLoad] = useState(false)
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [userNameValidMessage, setUserNameValidMessage] = useState(null);
  const [password, setPassword] = useState("");
  const [email,  setEmail] = useState("");
  const [showOTPScreen,  setShowOTPScreen] = useState(false);
  const [showUserNameScreen,  setShowUserNameScreen] = useState(false);
  const navigate = useNavigate()
  const handleChange = (e, setState) => {
    eval(setState + "(e.target.value)")
  }
  const ValidateUserName = (e) => {
    const validatorMessage=useNameValidator(e.target.value);
    setUserNameValidMessage(validatorMessage)
  }
  const handleSubmit = async e => {
    e.preventDefault();
    setSubmitLoad(true)
    const user = await Axios.post("/auth/register", { name, email, password, userName: userName.toLowerCase() });
    if (user.data.register) {
      window.location.href = '/edit-profile'
    }
    else {
      alert(user.data.message);
    }
    setSubmitLoad(false)
  }
  return (
    <div className="RegisterComp">
      <div className="reg-illustration">
        <img src={loginImg} alt="" />
      </div>
      <div className="register-box">
        <div className="reg-header">
          <h2>Welcome to Crowdly</h2>
          <span>Register Your Account</span>
        </div>
        <div className="reg-body">
          <input type="text" placeholder="Name" className="reg-input"
            value={name} onChange={(e) => handleChange(e, 'setName')} />
          
          <span className="validator-message">
            {userNameValidMessage?.message}
          </span>
          <input type="email" placeholder="Email" className="reg-input"
            value={email} onChange={(e) => handleChange(e, 'setEmail')} />
          <input type="password" placeholder="Password" className="reg-input"
            value={password} onChange={(e) => {handleChange(e, 'setPassword'); }} />
          <button className="reg-btn" onClick={()=>setShowOTPScreen(true)}
          disabled={email==="" || name==="" || password===""}
          >Register</button>
        </div>
        <Link className="links" to="/login"><div className="another-link">Already Have an Acoount? Please Login!</div></Link>
      </div>
      {
        submitLoad && <Loader type="HashLoader"/>
      }
      {
        showOTPScreen &&
      <div className="otp-sec">
        <div className="otp-container">
          <h2>Enter OTP</h2>
          <p>Enter OTP sent to the mail  <b>fasilkp314@gmail.com</b> </p>
          <input type="text" placeholder="Enter OTP" />
          <div className="otp-btns">
          <button onClick={()=>setShowOTPScreen(false)}>back</button>
          <button onClick={()=>setShowUserNameScreen(true)}>Verify</button>
          </div>
        </div>
      </div>
      }
      {
        showUserNameScreen &&
      <div className="otp-sec">
        <div className="otp-container">
          <h2>Enter Username</h2>
          <p>Enter a unique username</p>
          <input type="text" placeholder="Username " className="reg-input"
            value={replaceSpecialCharecters(userName)} onChange={(e) => {handleChange(e, 'setUserName'); ValidateUserName(e)}} />
          <div className="otp-btns">
          <button onClick={()=>{
            setShowUserNameScreen(false)
            setShowOTPScreen(false)
            }}>back</button>
          <button>Next</button>
          </div>
        </div>
      </div>
      }
    </div>
  );
}

export default RegisterComp;
