import React from 'react'
import './CenterWrapper.css'
function CenterWrapper(props) {
  return (
    <div className='center-wrapper'>
        {props.children}
    </div>
  )
}

export default CenterWrapper