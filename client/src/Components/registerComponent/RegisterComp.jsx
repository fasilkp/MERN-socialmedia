import React, { useState } from "react";
import './RegisterComp.css'
import loginImg from '../../images/login.jpg'
import { Link, useNavigate } from "react-router-dom";
import { useNameValidator } from "../../hooks/useNameValidator";
import BeatLoader from "react-spinners/BeatLoader";
import Axios from 'axios'
import Loader from "../Loader/Loader";
function RegisterComp() {
  const [submitLoad, setSubmitLoad] = useState(false)
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [userNameValidMessage, setUserNameValidMessage] = useState(null);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
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
          <input type="text" placeholder="Username (note: should be unique)" className="reg-input"
            value={userName.toLowerCase()} onChange={(e) => {handleChange(e, 'setUserName'); ValidateUserName(e)}} />
          <span className="validator-message">
            {userNameValidMessage?.message}
          </span>
          <input type="email" placeholder="Email" className="reg-input"
            value={email} onChange={(e) => handleChange(e, 'setEmail')} />
          <input type="password" placeholder="Password" className="reg-input"
            value={password} onChange={(e) => {handleChange(e, 'setPassword'); }} />
          <button className="reg-btn" onClick={handleSubmit}>Register</button>
        </div>
        <Link className="links" to="/login"><div className="another-link">Already Have an Acoount? Please Login!</div></Link>
      </div>
      {
        submitLoad && <Loader type="HashLoader"/>
      }
    </div>
  );
}

export default RegisterComp;
