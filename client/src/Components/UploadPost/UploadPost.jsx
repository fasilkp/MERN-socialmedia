import React, { useState, useEffect } from "react";
import "./UploadPost.css";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { saveAs } from "file-saver";
import { ImUpload2, } from "react-icons/im";
import { BsAspectRatio, BsAspectRatioFill } from 'react-icons/bs'
function UploadPost() {
  const downloadImage = (imageUrl) => {
    saveAs(imageUrl, "image.jpg"); // Put your image url here.
  };
  const [aspectRatio, setAspectRatio] = useState(1);
  useEffect(() => {
    setImage(newImage);
  }, [aspectRatio]);
  const [image, setImage] = useState(null);
  const [newImage, setNewImage] = useState(null);
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
      setNewImage(reader.result);
    };
    reader.readAsDataURL(files[0]);
  };

  const getCropData = () => {
    if (typeof cropper !== "undefined") {
      setCropData(cropper.getCroppedCanvas().toDataURL());
      downloadImage(cropper.getCroppedCanvas().toDataURL());
    }
  };
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
              zoomTo={0.5}
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
              <span className="crop-aspect crop-aspect-1 aspect-ratio-selected">1:1</span>
              <span className="crop-aspect crop-aspect-2">4:5</span>
              <span className="crop-aspect crop-aspect-3">16:9</span>
            </div>
          </div>
          <div className="post-input-row">
            <input type="text" placeholder="enter something" />
            <button onClick={getCropData}>click</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default UploadPost;
