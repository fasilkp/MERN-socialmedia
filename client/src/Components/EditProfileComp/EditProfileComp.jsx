import React, {useState,useEffect, useContext} from 'react'
import { Cropper } from 'react-cropper';
import dataURItoBlob from '../../actions/dataURItoBlob'
import { useNavigate } from 'react-router-dom';
import './EditProfileComp.css'
import AuthContext from '../../context/AuthContext';
import axios from 'axios';
import Loader from '../Loader/Loader'
function EditProfileComp() {
  const [image, setImage] = useState(null);
  const {user} = useContext(AuthContext)
  const navigate =useNavigate();
  const [newImage, setNewImage] = useState(null);
  const [cropData, setCropData] = useState("#");
  const [cropper, setCropper] = useState();
  const [name, setName]=useState(user.name)
  const [load, setLoad]=useState({photoUpdate:false, detailsUpdate:false})
  const [bio, setBio]=useState(user?.bio)
  const [blobImage, setBlobImage]=useState(null)
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
  const imageHandle = async (e) => {
    setLoad({...load, photoUpdate:true})
    e.preventDefault();
    let imageURI
    if (typeof cropper !== "undefined") {
      setCropData(cropper.getCroppedCanvas().toDataURL());
          imageURI= cropper.getCroppedCanvas().toDataURL('image/jpg',1)
    }
    const blob= dataURItoBlob(imageURI);
    
    const data= new FormData();
    data.append('image', blob);
    await axios.post('/user/upload-profile-pic', data ).then(async uploadFile=>{
    if(uploadFile.data.err) alert("something went wrong")
    else{
      setNewImage(imageURI)
      setBlobImage(blob)
      setImage(null)
      setLoad({...load, photoUpdate:false})
    }
    })
   }
   const submitHandle=async(e)=>{
    setLoad({...load, detailsUpdate:true})

    e.preventDefault();
      await axios.post('/user/update-profile-details',{
        profileSrc: newImage ? user._id+".jpg" : null,
        bio:bio, 
        name:name,
        id:user._id
      }).then((result)=>{
        if(!result.data.err) {
          setLoad({...load, detailsUpdate:false})
          navigate("/user/"+user.userName)

        }
        else {
          alert("upoad failed")
        }; 
      })
   }
  return (
    <div className='EditProfileComp'>
      <div className="edit-pf-container">
        <div className="pf-img-col">
          <img src={(newImage ? newImage : user.image)} alt=""/>
          <label htmlFor="imageInput">
            change profile picture
          </label>
            <input type="file" id="imageInput" onChange={onChange}/>
        </div>
        <div className="pf-form-col">
          <label htmlFor="">Name</label>
          <input type="text" placeholder="name..." value={name}
          onChange={(e)=>setName(e.target.value)}/>
          <label htmlFor="" >Bio</label>
          <textarea placeholder="About You..." value={bio}
          onChange={(e)=>setBio(e.target.value)} />
          <button onClick={submitHandle}>
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
              <button onClick={()=>setImage(null)}>Cancel</button>
              <button onClick={imageHandle}>Done</button>
            </div>
            </div>
          </div>
        
      }
      {
        (load.photoUpdate || load.detailsUpdate) &&
        <Loader type="HashLoader" />
      }
    </div>
  )
}

export default EditProfileComp