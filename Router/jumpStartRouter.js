import express from "express" ;
import {CreateJumpStart , getAllJumpStart , getOneJumpStart} from "../Controller/jumpStartController.js"

const router = express.Router() ;

router.post("/" , CreateJumpStart) ;
router.get("/" , getAllJumpStart) ;
router.get("/:JumpStartId" , getOneJumpStart) ;
export default router ;