import express from "express" ;
import {CreateTire , getAllTire , getOneTire} from "../Controller/tireController.js"

const router = express.Router() ;

router.post("/" , CreateTire) ;
router.get("/" , getAllTire) ;
router.get("/:TireId" , getOneTire) ;
export default router ;