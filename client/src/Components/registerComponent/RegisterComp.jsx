import React from "react";
import './RegisterComp.css'
import loginImg from '../../images/login.jpg'
function RegisterComp() {
  return (
    <div className="RegisterComp">
      <div className="reg-illustration"
      >
        <img src={loginImg} alt="" />
      </div>
      <div className="register-box">
        <div className="reg-header">
          <h2>Welcome to Sociam</h2>
          <span>Register Your Account</span>
        </div>
        <div className="reg-body">
            <input type="text" placeholder="Enter Name" className="reg-input" />
            <input type="text" placeholder="Enter Email" className="reg-input" />
            <input type="text" placeholder="Enter Password" className="reg-input" />
            <button className="reg-btn">Register</button>
        </div>
        <div className="another-link">Already Have an Acoount? Please Login!</div>
      </div>
    </div>
  );
}

export default RegisterComp;
