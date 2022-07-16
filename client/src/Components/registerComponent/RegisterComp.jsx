import React from "react";
import './RegisterComp.css'
import loginImg from '../../images/login.jpg'
import { Link } from "react-router-dom";
function RegisterComp() {
  return (
    <div className="RegisterComp">
      <div className="reg-illustration">
        <img src={loginImg} alt="" />
      </div>
      <div className="register-box">
        <div className="reg-header">
          <h2>Welcome to Sociam</h2>
          <span>Register Your Account</span>
        </div>
        <div className="reg-body">
            <input type="text" placeholder="Name" className="reg-input" />
            <input type="text" placeholder="Username (note: should be unique)" className="reg-input" />
            <input type="email" placeholder="Email" className="reg-input" />
            <input type="password" placeholder="Password" className="reg-input" />
            <button className="reg-btn">Register</button>
        </div>
        <Link className="links" to="/login"><div className="another-link">Already Have an Acoount? Please Login!</div></Link>
      </div>
    </div>
  );
}

export default RegisterComp;
