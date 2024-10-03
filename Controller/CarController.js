import Car from "../Model/Car.js";
import { verifyToken } from "../Utils/verifyToken.js";
import { ApiError } from "../Utils/apiError.js";

export const CreateCar = async (req, res, next) => {
  try {
    verifyToken(req, res, async () => {
      if (req.user) {
        const {make , model , year} = req.body ;
        const newCar = new Car({
          UserId : req.user.id ,
          model : model ,
          make : make , 
          year : year 
        })
        await newCar.save();
        res.status(200).json({ message: "Your Car Request Created" });
      } else {
        return next(new ApiError("You are not authenticated!", 401));
      }
    });
  } catch (error) {
    return next(new ApiError("Error in Creation", 400));
  }
};

export const getAllCar = async (req, res, next) => {
  try {
    verifyToken(req, res, async () => {
      if (req.user) {
        const myCar = await Car.find({ UserId: req.user.id });
        res.status(200).json({ Car: myCar });
      } else {
        return next(new ApiError("You are not authenticated!", 401));
      }
    });
  } catch (error) {
    return next(new ApiError("Error in Creation", 400));
  }
};

export const getOneCar = async (req, res, next) => {
  try {
    verifyToken(req, res, async () => {
      if (req.user) {
        const carId = req.params.carId
        const myCar = await Car.findById(carId);
        res.status(200).json({ Car: myCar });
      } else {
        return next(new ApiError("You are not authenticated!", 401));
      }
    });
  } catch (error) {
    return next(new ApiError("Error in Creation", 400));
  }
};