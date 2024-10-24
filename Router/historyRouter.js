import express from "express" ;
import {getAllHistory , getOneFromHistory} from "../Controller/HistoryController.js"

const router = express.Router() ;


router.get("/" , getAllHistory) ;
router.get("/:id" , getOneFromHistory) ;
export default router ;