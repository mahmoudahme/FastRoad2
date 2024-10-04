import Car from "../Model/Car.js";
import { verifyToken } from "../Utils/verifyToken.js";
import { ApiError } from "../Utils/apiError.js";
import fs from "fs"

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
export const getDataFromJson = async(req , res , next) => {
  try {
    verifyToken(req, res, async () => {
      if (req.user) {
        fs.readFile('Car.json', 'utf8', (err, data) => {
          if (err) {
              console.error('Error reading file:', err);
              return;
          }
          const jsonData = JSON.parse(data);
          // res.status(200).json({});
          const groupedCars = jsonData.VehicleModelYear.reduce((acc, car) => {
            // إذا كانت make غير موجودة في النتيجة، نضيف make جديد مع مصفوفة فارغة للـ models
            if (!acc[car.make]) {
              acc[car.make] = {
                make: car.make,
                models: []
              };
            }
            // إضافة الـ model إلى مصفوفة models الخاصة بالـ make
            acc[car.make].models.push(car.model);
            return acc;
          }, {});
          
          // تحويل الكائن النهائي إلى مصفوفة
          const result = Object.values(groupedCars); 
          res.status(200).json({ Car: result });
      });
      } else {
        return next(new ApiError("You are not authenticated!", 401));
      }
    });
  } catch (error) {
    return next(new ApiError("Error in Creation", 400));
  }
}
