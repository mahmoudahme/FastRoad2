import express from "express" ;
import {CreateCar , getAllCar , getOneCar} from "../Controller/CarController.js"

const router = express.Router() ;

router.post("/" , CreateCar) ;
router.get("/" , getAllCar) ;
router.get("/:carId" , getOneCar) ;
export default router ;