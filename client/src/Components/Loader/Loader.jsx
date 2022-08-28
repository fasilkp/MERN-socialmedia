import React from 'react'
import './Loader.css'
import {HashLoader, FadeLoader} from "react-spinners";
function Loader({type}) {
  return (
    <div className='Loader'>
        {
            type==="HashLoader" ?
            <HashLoader size={50} color="#24d594"></HashLoader> :
            <FadeLoader size={50} color="#24d594"></FadeLoader>
        }
    </div>
  )
}

export default Loader