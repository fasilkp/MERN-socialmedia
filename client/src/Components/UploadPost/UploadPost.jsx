import React, { useState, useEffect, useContext } from "react";
import "./UploadPost.css";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { ImUpload2, } from "react-icons/im";
import dataURItoBlob from "../../actions/dataURItoBlob";
import axios from "axios";
import AuthContext from "../../context/AuthContext";
import {useNavigate} from 'react-router-dom'
import BeatLoader from "react-spinners/BeatLoader";
import Loader from '../Loader/Loader'

function UploadPost() {
  const {user} = useContext(AuthContext);
  const [submitLoad,setSubmitLoad]=useState(false)
  const [uploadPostBtn, setUploadPostBtn]=useState(false)
  const navigate=useNavigate()
  const [aspectRatio, setAspectRatio] = useState(1);
  const[selectedAspectRatio, setSelectedAspectRatio] = useState({
    ar1:"ar-selected",
    ar2:"",
    ar3:""
  }) // "ar" means aspectRatio
  const arObj={
    ar1:"",
    ar2:"",
    ar3:""
  }
  useEffect(() => {
    setImage(newImage);
  }, [aspectRatio]);
  const [image, setImage] = useState(null);
  const [cropData, setCropData] = useState("#");
  const [newImage, setNewImage] = useState(null);
  const [cropper, setCropper] = useState();
  const [caption, setCaption] = useState("");
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
      setNewImage(reader.result);
    };
    reader.readAsDataURL(files[0]);
  };

  const submitHandler = async () => {
    setSubmitLoad(true)
    let imageURI
    if (typeof cropper !== "undefined") {
      setCropData(cropper.getCroppedCanvas().toDataURL());
          imageURI= cropper.getCroppedCanvas().toDataURL('image/jpg',1)
    }
    console.log(imageURI)
    const blob= dataURItoBlob(imageURI);
    
    const data= new FormData();
    data.append('image', blob)
    await axios.post('/posts/upload-file', data ).then(async uploadFile=>{
    if(!uploadFile.data.success) alert("something went wrong")
    if(uploadFile.data.success){
      await axios.post('/posts/upload-post',{
        postSrc:uploadFile.data.fileName,
        description:caption, 
        userId:user._id,
        userName:user.userName,
        name:user.name
      }).then((result)=>{
        if(result.data.success) {
          navigate("/")
        }
        else alert("upoad failed");
        setSubmitLoad(false)
        
      })
    }
    })
   }
  return (
    <div className="upload-post ">
      {!image ? (
        <div className="upload-container">
          <div className="upload-logo">
            <ImUpload2 className="upload-icon"></ImUpload2>
            <h6>Upload a Photo</h6>
          </div>
          <div className="upload-btn">
            <input type="file" onChange={onChange} />
          </div>
        </div>
      ) : (
        <div className="cropper-container">
          <div className="cropper">
            <Cropper
              className="crop-box"
              // style={{ height: 400, width: "50%" }}
              zoomTo={0}
              aspectRatio={aspectRatio}
              initialAspectRatio={aspectRatio}
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
          </div>
          <div className="cropper-options-row">
            <div className="cropper-options">
              <span className="aspect-ratio-title">Aspect Ratio</span>
              <span className={'crop-aspect crop-aspect-1 '+ selectedAspectRatio.ar1}
              onClick={()=>{
                aspectRatio!=(1) && setImage(null)
                setSelectedAspectRatio({...arObj, ar1:"ar-selected"})
                setAspectRatio(1/1)}}
              >1:1</span>
              <span className={'crop-aspect crop-aspect-2 '+ selectedAspectRatio.ar2}
              onClick={()=>{
                aspectRatio!=(4/5) && setImage(null)
                setSelectedAspectRatio({...arObj, ar2:"ar-selected"})
                setAspectRatio(4/5)}}
              >4:5</span>
              <span className={'crop-aspect crop-aspect-3 '+ selectedAspectRatio.ar3}
              onClick={()=>{
                aspectRatio!=(16/9) && setImage(null)
                setSelectedAspectRatio({...arObj, ar3:"ar-selected"})
                setAspectRatio(16/9)}}
              >16:9</span>
            </div>
            <button onClick={()=>setImage(null)}>Choose another photo</button>
          </div>
          <div className="post-input-row">
            <input type="text" placeholder="Write a Caption..."
             value={caption} onChange={(e)=>setCaption(e.target.value)} />
            <button onClick={()=>{
              setUploadPostBtn(false);
              submitHandler();
            }} disabled={uploadPostBtn}>Post</button>
          </div>
        </div>
        
      )}
      {
          submitLoad && <Loader type="HashLoader"/>
      }
    </div>
  );
}

export default UploadPost;
