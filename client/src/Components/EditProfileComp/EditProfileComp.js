import React from 'react'
import './EditProfileComp.css'
function EditProfileComp() {
  return (
    <div className='EditProfileComp'>
      <div className="edit-pf-container">
        <div className="pf-img-col">
          <img src="http://localhost:8080/images/profile-images/defaultImage.jpg" alt=""/>
          <label htmlFor="imageInput">
            change profile picture
          </label>
            <input type="file" id="imageInput" />
        </div>
        <div className="pf-form-col">
          <label htmlFor="">Name</label>
          <input type="text" placeholder="name..." />
          <label htmlFor="">Email</label>
          <input type="text" placeholder="email..." />
          <button>
          Save
          </button>
        </div>

      </div>
    </div>
  )
}

export default EditProfileComp