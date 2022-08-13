import React, {useState} from "react";
import './RegisterComp.css'
import loginImg from '../../images/login.jpg'
import { Link, useNavigate } from "react-router-dom";
import BeatLoader from "react-spinners/BeatLoader";
import Axios from 'axios'
function RegisterComp() {
  const [submitLoad,setSubmitLoad]=useState(false)
  const [name, setName]=useState("");
  const [userName, setUserName]=useState("");
  const [password, setPassword]=useState("");
  const [email, setEmail]=useState("");
  const navigate=useNavigate()
  const handleChange=(e, setState)=>{
    eval(setState+"(e.target.value)")
  }
  const handleSubmit=async e=>{
    setSubmitLoad(true)
    e.preventDefault();
    const user = await Axios.post("/auth/register", {name, email, password, userName:userName.toLowerCase()});
    if(user.data.register){
      alert("register successfull");
      navigate('/login')
    }
    else{  
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
          <h2>Welcome to Sociam</h2>
          <span>Register Your Account</span>
        </div>
        <div className="reg-body">
            <input type="text" placeholder="Name" className="reg-input" 
             value={name} onChange={(e)=>handleChange(e,'setName')} />
            <input type="text" placeholder="Username (note: should be unique)" className="reg-input" 
             value={userName.toLowerCase()} onChange={(e)=>handleChange(e,'setUserName')} />
            <input type="email" placeholder="Email" className="reg-input" 
             value={email} onChange={(e)=>handleChange(e,'setEmail')} />
            <input type="password" placeholder="Password" className="reg-input" 
             value={password} onChange={(e)=>handleChange(e,'setPassword')} />
            <button className="reg-btn" onClick={handleSubmit}>
              {
              submitLoad ? <BeatLoader size="15" color="white"/> : "Login"
              }
            </button>
        </div>
        <Link className="links" to="/login"><div className="another-link">Already Have an Acoount? Please Login!</div></Link>
      </div>
    </div>
  );
}

export default RegisterComp;
