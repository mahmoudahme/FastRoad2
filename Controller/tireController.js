import Tire from "../Model/Tire.js";
import { verifyToken } from "../Utils/verifyToken.js";
import { ApiError } from "../Utils/apiError.js";
import History from "../Model/History.js";

import axios from "axios";

export const CreateTire = async (req, res, next) => {
  const apikey = "pk.269e5f03cafbf57f6dd5b92d3a8096eb";
  verifyToken(req, res, async () => {
    try {
      if (req.user) {
        const {
          Spire,
          TireType,
          timeOfHelp,
          date,
          latitude,
          longitude,
          inPutText,
paymentMethod ,
          onTheRoad ,
          year,
          model,
          color,
        } = req.body;
        if (Spire) {
          if (inPutText == undefined) {
            const url = `https://us1.locationiq.com/v1/reverse.php?key=${apikey}&lat=${latitude}&lon=${longitude}&format=json`;
            const response = await axios.get(url);
            const newTire = new Tire({
              Spire: Spire,
              TireType: TireType,
              timeOfHelp: timeOfHelp,
              date: date,
              Location: response.data.display_name,
            paymentMethod : paymentMethod ,
              onTheRoad : onTheRoad ,
              year: year,
              model: model,
              color: color,
              UserId: req.user.id,
            });
            await newTire.save();
            const newHistory = new History({
              UserId: req.user.id,
              serviceId: newTire.id,
              onModel: "Tire",
            });
            await newHistory.save();
            res.status(200).json({ message: "Your Tire Request Created" });
          } else {
            const newTire = new Tire({
              Spire: Spire,
              TireType: TireType,
              timeOfHelp: timeOfHelp,
              date: date,
              Location: inPutText,
              onTheRoad : onTheRoad ,
            paymentMethod : paymentMethod,
              year: year,
              model: model,
              color: color,
              UserId: req.user.id,
            });
            await newTire.save();
            const newHistory = new History({
              UserId: req.user.id,
              serviceId: newTire.id,
              onModel: "Tire",
            });
            await newHistory.save();
            res.status(200).json({ message: "Your Tire Request Created" });
          }
        } else {
          res.status(201).json({ message: "We Can't Help you Without Spire " });
        }
      } else {
        return next(new ApiError("You are not authenticated!", 401));
      }
    } catch (error) {
      return next(new ApiError(`Server Error ${error}`, 400));
    }
  });
};

export const getAllTire = async (req, res, next) => {
  verifyToken(req, res, async () => {
    try {
      if (req.user) {
        const myTire = await Tire.find({ UserId: req.user.id });
        res.status(200).json({ Tire: myTire });
      } else {
        return next(new ApiError("You are not authenticated!", 401));
      }
    } catch (error) {
      return next(new ApiError(`Server Error ${error}`, 400));
    }
  });
};
export const getOneTire = async (req, res, next) => {
  verifyToken(req, res, async () => {
    try {
      if (req.user) {
        const TireId = req.params.TireId;
        const myTire = await Tire.findById(TireId);
        res.status(200).json({ Tire: myTire });
      } else {
        return next(new ApiError("You are not authenticated!", 401));
      }
    } catch (error) {
      return next(new ApiError(`Server Error ${error}`, 400));
    }
  });
};
