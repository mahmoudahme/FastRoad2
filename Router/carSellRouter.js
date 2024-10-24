import express from "express" ;
import fs from  "fs";
import multer from "multer";
import {CreateSellCar} from "../Controller/sellCarController.js"
const router = express.Router() ;

// create Folder 
const uploadDir = 'uploads/images';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}
// Upload withe multer 
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // Upload in the folder 
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); //  save image withe the original name  
  }
});
const upload = multer({ storage: storage });


router.post("/" , upload.array('images', 20) , CreateSellCar) ;
// router.get("/" , getAllCar) ;
// router.get("/:carId" , getOneCar) ;
export default router ;