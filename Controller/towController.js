import Tow from "../Model/Tow.js";
import { verifyToken } from "../Utils/verifyToken.js";
import { ApiError } from "../Utils/apiError.js";
import axios from "axios";
import History from "../Model/History.js";

export const CreateTow = async (req, res, next) => {
  const apikey = "pk.269e5f03cafbf57f6dd5b92d3a8096eb";
  verifyToken(req, res, async () => {
    try {
      if (req.user) {
        const {
          timeOfHelp,
          typeofTowing,
          gear,
          onTheRoad,
          date,
          latitude,
          longitude,
paymentMethod ,
          inPutText,
          year,
          model,
          color,
        } = req.body;
        if (inPutText == undefined) {
          const url = `https://us1.locationiq.com/v1/reverse.php?key=${apikey}&lat=${latitude}&lon=${longitude}&format=json`;
          const response = await axios.get(url);
          const newTow = new Tow({
            timeOfHelp: timeOfHelp,
            typeofTowing: typeofTowing,
            gear: gear,
            date: date,
            Location: response.data.display_name,
            onTheRoad: onTheRoad,
            paymentMethod : paymentMethod,
            year: year,
            model: model,
            color: color,
            UserId: req.user.id,
          });
          await newTow.save();
          const newHistory = new History({
            UserId: req.user.id,
            serviceId: newTow.id,
            onModel: "Tow",
          });
          await newHistory.save();
          res.status(200).json({ message: "Your Tow Request Created" });
        } else {
          const newTow = new Tow({
            timeOfHelp: timeOfHelp,
            typeofTowing: typeofTowing,
            gear: gear,
            date: date,
            Location: inPutText,
            onTheRoad: onTheRoad,
            paymentMethod : paymentMethod,
            year: year,
            model: model,
            color: color,
            UserId: req.user.id,
          });
          await newTow.save();
          const newHistory = new History({
            UserId: req.user.id,
            serviceId: newTow.id,
            onModel: "Tow",
          });
          await newHistory.save();
          res.status(200).json({ message: "Your Tow Request Created" });
        }
      } else {
        return next(new ApiError("You are not authenticated!", 401));
      }
    } catch (error) {
      return next(new ApiError(`Server Error ${error}`, 400));
    }
  });
};

export const getAllTows = async (req, res, next) => {
  verifyToken(req, res, async () => {
    try {
      if (req.user) {
        const myTow = await Tow.find({ UserId: req.user.id }).populate({
          path: "UserId",
          select: "phone name-_id",
        });
        res.status(200).json({ Tows: myTow });
      } else {
        return next(new ApiError("You are not authenticated!", 401));
      }
    } catch (error) {
      return next(new ApiError(`Server Error ${error}`, 400));
    }
  });
};

export const getOneTow = async (req, res, next) => {
  verifyToken(req, res, async () => {
    try {
      if (req.user) {
        const TowId = req.params.TowId;
        const myTow = await Tow.findById(TowId);
        res.status(200).json({ Tows: myTow });
      } else {
        return next(new ApiError("You are not authenticated!", 401));
      }
    } catch (error) {
      return next(new ApiError(`Server Error ${error}`, 400));
    }
  });
};

/////////////////////////////////////////////////////////////
