import SellCar from "../Model/SellCar.js";
import { verifyToken } from "../Utils/verifyToken.js";
import { ApiError } from "../Utils/apiError.js";
import History from "../Model/History.js";

import axios from "axios";

export const CreateSellCar = async (req, res, next) => {
  try {
    verifyToken(req , res , async()=>{
      if(req.user){
        const {make , model , year , color ,description , price } = req.body ;
        const carImages = req.files.map((file) => file.filename);
        const car = new SellCar({
          make : make , 
          model :model , 
          year  : year ,
          color : color ,
          description : description ,
          price  : price ,
          image : carImages ,
          UserId : req.user.id
        })
        await car.save();
        const newHistory = new  History({
          UserId : req.user.id ,
          serviceId : car.id ,
          onModel : 'Sellcar'
        }) ;
        await newHistory.save();
        res.status(201).json({message : "Car Added Successfully" , data : car})
      }else{
        return next(new ApiError("You are not authenticated!", 401));
      }
    })
  } catch (error) {
    return next(new ApiError("Error in Creation", 400));
  }
};

export const getAllLockout = async (req, res, next) => {
  try {
    
  } catch (error) {
    return next(new ApiError("Error in Creation", 400));
  }
};
export const getOneLockOut = async (req, res, next) => {
  try {
    
  } catch (error) {
    return next(new ApiError("Error in Creation", 400));
  }
};
