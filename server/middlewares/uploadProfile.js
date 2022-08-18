import multer from "multer";

export default function uploadProfile(req, res, next) {
    const storage=multer.diskStorage({
        destination:(req,file,cb)=>{
           cb(null,"./images/profile-images");
        },
        filename:(req,file,cb)=>{
           cb(null,Date.now()+file.originalname+".jpg");
        }
       });
      
    return multer({ storage });
    next();
      
}