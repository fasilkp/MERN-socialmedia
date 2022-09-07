import React, { useState } from "react";
import './RegisterComp.css'
import loginImg from '../../images/login.jpg'
import { Link, useNavigate } from "react-router-dom";
import { useNameValidator } from "../../hooks/useNameValidator";
import BeatLoader from "react-spinners/BeatLoader";
import Axios from 'axios'
import Loader from "../Loader/Loader";
import {replaceSpecialCharecters} from '../../actions/replaceSpecialCharecters'
import { useEffect } from "react";
function RegisterComp() {
  const [submitLoad, setSubmitLoad] = useState(false)
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [userNameValidMessage, setUserNameValidMessage] = useState(null);
  const [password, setPassword] = useState("");
  const [email,  setEmail] = useState("");
  const [showOTPScreen,  setShowOTPScreen] = useState(false);
  const [showUserNameScreen,  setShowUserNameScreen] = useState(false);
  const [otp, setOTP] = useState("");
  const [randomOtp, setRandomOtp] = useState("");
  const navigate = useNavigate()
  const handleChange = (e, setState) => {
    eval(setState + "(e.target.value)")
  }
  const ValidateUserName = (e) => {
    const validatorMessage=useNameValidator(e.target.value);
    setUserNameValidMessage(validatorMessage)
  }
  const handleEmailOtp = async e => {
    e.preventDefault();
    setSubmitLoad(true)
    const randomNum=Math.floor(Math.random()*900000) + 100000;
    setRandomOtp(randomNum);
    const user = await Axios.post("/auth/send-otp", {
      emailTo:email,
      OTP:randomNum
    });
    if (user.data.err) {
      alert(user.data.message)
    }
    else {
      setShowOTPScreen(true)
    }
    setSubmitLoad(false)
  }
  const verifyOTP = (e) => {
    console.log(otp+" , "+randomOtp)
    if(otp==randomOtp){
      setShowUserNameScreen(true);
    }
    else{
      alert("invalid OTP")
    }
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

          <input type="email" placeholder="Email" className="reg-input"
            value={email} onChange={(e) => handleChange(e, 'setEmail')} />
          <input type="password" placeholder="Password" className="reg-input"
            value={password} onChange={(e) => {handleChange(e, 'setPassword'); }} />
          <button className="reg-btn" onClick={handleEmailOtp}
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
          <input type="text" placeholder="Enter OTP" value={otp} onChange={(e)=>setOTP(e.target.value)}/>
          <div className="otp-btns">
          <button onClick={()=>setShowOTPScreen(false)}>back</button>
          <button onClick={verifyOTP} disabled={otp===""}>Verify</button>
          </div>
          <p className="disabled">Didn't get ? Resend OTP</p>

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
          <button disabled={userName===""} onClick={handleSubmit}>Next</button>
          </div>
        </div>
      </div>
      }
    </div>
  );
}

export default RegisterComp;
