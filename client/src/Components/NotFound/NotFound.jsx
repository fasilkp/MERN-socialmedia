import React from 'react'
import {Link} from 'react-router-dom'
function NotFound() {
    const mainStyle={
        display:"flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        height:"70vh"
    }
    const btnStyle={
        backgroundColor: "var(--mainColor)",
        width:"200px",
        height:"50px",
        marginTop:"30px",
        color:"white",
        border:"none",
        borderRadius:"30px",
        outline:"none"
    }
  return (
    <div style={mainStyle}>
        <h1>Page Not Found</h1>
        <Link to="/" ><button style={btnStyle}>Go to home page</button></Link> 
    </div>
  )
}

export default NotFound