import multer from "multer";

export default function uploadPost(){
    const storage=multer.diskStorage({
        destination:(req,file,cb)=>{
           cb(null,"./images/postImages");
        },
        filename:(req,file,cb)=>{
           cb(null,Date.now()+file.originalname);
        }
       });
      
    return multer({ storage });
      
}