import express from "express" ;
import {CreateLockOut , getAllLockout , getOneLockOut} from "../Controller/lockoutController.js"

const router = express.Router() ;

router.post("/" , CreateLockOut) ;
router.get("/" , getAllLockout) ;
router.get("/:LockOutId" , getOneLockOut) ;
export default router ;