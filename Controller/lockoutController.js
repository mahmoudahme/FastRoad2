import LockOut from "../Model/LockOut.js";
import { verifyToken } from "../Utils/verifyToken.js";
import { ApiError } from "../Utils/apiError.js";
import axios from "axios";

export const CreateLockOut = async (req, res, next) => {
  try {
    verifyToken(req, res, async () => {
      if (req.user) {
        const {KeyInCar,timeOfHelp,date,latitude,longitude,year,model,color} = req.body;
        // رابط API الخاص بـ Nominatim
        const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`;
        const response = await axios.get(url)
        console.log(response)
        const newLockOut = new LockOut({
          KeyInCar: KeyInCar,
          timeOfHelp: timeOfHelp,
          date: date,
          Location: response.data.display_name ,
          year: year,
          model: model,
          color: color,
          UserId: req.user.id
        });
        await newLockOut.save() ;
        res.status(200).json({message : "Your LockOut Request Created"})
      } else {
        return next(new ApiError("You are not authenticated!", 401));
      }
    });
  } catch (error) {
    return next(new ApiError("Error in Creation", 400));
  }
};


export const getAllLockout = async(req , res , next)=>{
  try {
    verifyToken(req, res, async () => {
      if (req.user) {
        const myLockout = await LockOut.find({UserId : req.user.id})
        res.status(200).json({Lockout : myLockout})
      } else {
        return next(new ApiError("You are not authenticated!", 401));
      }
    });
  } catch (error) {
    return next(new ApiError("Error in Creation", 400));
  }
} 
export const getOneLockOut = async(req , res , next)=>{
  try {
    verifyToken(req, res, async () => {
      if (req.user) {
        const LockOutId = req.params.LockOutId ;
        const myLockout = await LockOut.findById(LockOutId)
        res.status(200).json({Lockout : myLockout})
      } else {
        return next(new ApiError("You are not authenticated!", 401));
      }
    });
  } catch (error) {
    return next(new ApiError("Error in Creation", 400));
  }
}