import React from 'react'
import './UploadPost.css'
import {ImUpload2} from 'react-icons/im'
function UploadPost() {
  return (
    <div className="upload-post ">
        <div className="upload-container">
            <div className="upload-logo">
                <ImUpload2 className="upload-icon"></ImUpload2>
                <h6>Upload a Photo</h6>
            </div>
            <div className="upload-btn">
                <input type="file"/>
            </div>
        </div>
    </div>
  )
}

export default UploadPost