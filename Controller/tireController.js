import Tire from "../Model/Tire.js";
import { verifyToken } from "../Utils/verifyToken.js";
import { ApiError } from "../Utils/apiError.js";
import axios from "axios";

export const CreateTire = async (req, res, next) => {
  try {
    verifyToken(req, res, async () => {
      if (req.user) {
        const {
          Spire,
          timeOfHelp,
          date,
          latitude,
          longitude,
          inPutText,
          year,
          model,
          color,
        } = req.body;
        if (Spire) {
          if (inPutText == undefined) {
            const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`;
            const response = await axios.get(url);
            const newTire = new Tire({
              Spire: Spire,
              timeOfHelp: timeOfHelp,
              date: date,
              Location: response.data.display_name,
              year: year,
              model: model,
              color: color,
              UserId: req.user.id,
            });
            await newTire.save();
            res.status(200).json({ message: "Your Tire Request Created" });
          } else {
            const newTire = new Tire({
              Spire: Spire,
              timeOfHelp: timeOfHelp,
              date: date,
              Location: inPutText,
              year: year,
              model: model,
              color: color,
              UserId: req.user.id,
            });
            await newTire.save();
            res.status(200).json({ message: "Your Tire Request Created" });
          }
        } else {
          res.status(201).json({ message: "We Can't Help you Without Spire " });
        }
      } else {
        return next(new ApiError("You are not authenticated!", 401));
      }
    });
  } catch (error) {
    return next(new ApiError("Error in Creation", 400));
  }
};

export const getAllTire = async (req, res, next) => {
  try {
    verifyToken(req, res, async () => {
      if (req.user) {
        const myTire= await Tire.find({ UserId: req.user.id });
        res.status(200).json({ Tire: myTire });
      } else {
        return next(new ApiError("You are not authenticated!", 401));
      }
    });
  } catch (error) {
    return next(new ApiError("Error in Creation", 400));
  }
};
export const getOneTire= async (req, res, next) => {
  try {
    verifyToken(req, res, async () => {
      if (req.user) {
        const TireId = req.params.TireId;
        const myTire = await Tire.findById(TireId);
        res.status(200).json({ Tire: myTire });
      } else {
        return next(new ApiError("You are not authenticated!", 401));
      }
    });
  } catch (error) {
    return next(new ApiError("Error in Creation", 400));
  }
};
