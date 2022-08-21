import React, {useState,useEffect} from 'react'
import { Cropper } from 'react-cropper';
import './EditProfileComp.css'
function EditProfileComp() {
  const [image, setImage] = useState(null);
  const [cropData, setCropData] = useState("#");
  const [cropper, setCropper] = useState();
  const onChange = (e) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
      
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(files[0]);
  };
  return (
    <div className='EditProfileComp'>
      <div className="edit-pf-container">
        <div className="pf-img-col">
          <img src="http://localhost:8080/images/profile-images/defaultImage.jpg" alt=""/>
          <label htmlFor="imageInput">
            change profile picture
          </label>
            <input type="file" id="imageInput" onChange={onChange}/>
        </div>
        <div className="pf-form-col">
          <label htmlFor="">Name</label>
          <input type="text" placeholder="name..." />
          <label htmlFor="">Email</label>
          <input type="text" placeholder="email..." />
          <label htmlFor="">Bio</label>
          <textarea placeholder="About You..." />
          <button>
          Save
          </button>
        </div>

      </div>
      {
        image && 
          <div className="edit-pf-cropper-container">
            <div className="edit-pf-cropper-box">
            <Cropper
                  className="edit-pf-crop-box"
                  // style={{ height: 400, width: "50%" }}
                  zoomTo={0}
                  aspectRatio={1}
                  initialAspectRatio={1}
                  preview=".img-preview"
                  src={image}
                  viewMode={1}
                  minCropBoxHeight={10}
                  minCropBoxWidth={10}
                  background={false}
                  responsive={true}
                  autoCropArea={1}
                  checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
                  onInitialized={(instance) => {
                    setCropper(instance);
                  }}
                  guides={true}
                />
            <div className="edit-pf-btn">
              <button>Done</button>
            </div>
            </div>
          </div>
        
      }
    </div>
  )
}

export default EditProfileComp