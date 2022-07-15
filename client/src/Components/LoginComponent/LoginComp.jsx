import React from "react";
import '../registerComponent/RegisterComp.css'
import loginImg from '../../images/login.jpg'
import {Link} from 'react-router-dom'
function LoginComp() {
  return (
    <div className="RegisterComp">
      <div className="reg-illustration"
      >
        <img src={loginImg} alt="" />
      </div>
      <div className="register-box">
        <div className="reg-header">
          <h2>Welcome to Sociam</h2>
          <span>Login into your Account</span>
        </div>
        <div className="reg-body">
            <input type="text" placeholder="Enter Email" className="reg-input" />
            <input type="text" placeholder="Enter Password" className="reg-input" />
            <button className="reg-btn">Login</button>
        </div>
        <Link className="links" to="/register"><div className="another-link"> Don't Have an Acoount? Create One!</div></Link>
      </div>
    </div>
  );
}

export default LoginComp;
