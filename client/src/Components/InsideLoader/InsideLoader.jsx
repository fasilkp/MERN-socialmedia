import React from 'react'
import './InsideLoader.css'
import {BeatLoader, FadeLoader} from "react-spinners";
function InsideLoader({type, color}) {
  return (
    <div className={type==="BeatLoader"? 'InsideLoader hash' : "InsideLoader"}>
        {
            type==="BeatLoader" ?
            <BeatLoader  size={5} margin="5"  color={color}></BeatLoader> :
            <FadeLoader width={3} height={9} radius={1} color={color}></FadeLoader>
        }
    </div>
  )
}

export default InsideLoader