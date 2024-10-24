import express from "express" ;
import {CreateTow , getAllTows , getOneTow} from "../Controller/towController.js"

const router = express.Router() ;

router.post("/" , CreateTow) ;
router.get("/" , getAllTows) ;
router.get("/:TowId" , getOneTow) ;
export default router ;