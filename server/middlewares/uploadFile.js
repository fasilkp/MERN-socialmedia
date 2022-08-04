import multer from "multer";

export default function uploadFile(req, res, next) {
    const storage=multer.diskStorage({
        destination:(req,file,cb)=>{
           cb(null,"./images/postImages");
        },
        filename:(req,file,cb)=>{
           cb(null,Date.now()+file.originalname+".jpg");
        }
       });
      
    return multer({ storage });
    next();
      
}