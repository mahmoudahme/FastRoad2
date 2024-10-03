import express from "express" ;
import {getDataFromJson} from "../Controller/CarController.js"

const router = express.Router() ;

router.get("/" , getDataFromJson) ;
export default router ;